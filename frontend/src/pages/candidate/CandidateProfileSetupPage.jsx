import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCheck,
  FiLink2,
  FiRefreshCw,
  FiTarget,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { profileStrengthApi } from "../../api/candidateProfileStrengthApi";
import { candidateExperienceApi } from "../../api/candidateExperienceApi";
import { candidateEducationApi } from "../../api/candidateEducationApi";
import { candidateCareerPreferencesApi } from "../../api/candidateCareerPreferencesApi";
import { candidateBasicProfileApi } from "../../api/candidateBasicProfileApi";
import { candidateCareerSummaryApi } from "../../api/candidateCareerSummaryApi";
import { candidateIndustryApi } from "../../api/candidateIndustryApi";
import { candidateSkillApi } from "../../api/candidateSkillApi";

import ExperienceDrawer from "../../components/candidate/drawers/ExperienceDrawer";
import EducationDrawer from "../../components/candidate/drawers/EducationDrawer";
import CareerPreferencesDrawer from "../../components/candidate/drawers/CareerPreferencesDrawer";
import BasicProfileDrawer from "../../components/candidate/drawers/BasicProfileDrawer";
import ProfessionalSnapshotDrawer from "../../components/candidate/drawers/ProfessionalSnapshotDrawer";

const REQUIRED_KEYS = [
  "BASIC_INFORMATION",
  "EXPERIENCE",
  "EDUCATION",
  "CAREER_DIRECTION",
  "PROFESSIONAL_SNAPSHOT",
];

const SECTION_META = {
  BASIC_INFORMATION: {
    title: "Basic Profile",
    description: "Your personal and contact information",
    weight: 20,
    icon: FiUser,
  },

  EXPERIENCE: {
    title: "Experience",
    description: "Your professional experience",
    weight: 25,
    icon: FiBriefcase,
  },

  EDUCATION: {
    title: "Education",
    description: "Your academic background",
    weight: 30,
    icon: FiBookOpen,
  },

  CAREER_DIRECTION: {
    title: "Career direction",
    description: "Your career goals and direction",
    weight: 15,
    icon: FiTarget,
  },

  PROFESSIONAL_SNAPSHOT: {
    title: "Professional snapshot",
    description: "How recruiters understand your professional profile",
    weight: 10,
    icon: FiLink2,
  },
};

function CandidateProfileSetupPage({ onComplete }) {
  const navigate = useNavigate();
  const [profileStrength, setProfileStrength] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [basicProfileDrawerOpen, setBasicProfileDrawerOpen] = useState(false);

  const [experienceDrawerOpen, setExperienceDrawerOpen] = useState(false);

  const [educationDrawerOpen, setEducationDrawerOpen] = useState(false);

  const [careerPreferencesDrawerOpen, setCareerPreferencesDrawerOpen] =
    useState(false);

  const [professionalSnapshotDrawerOpen, setProfessionalSnapshotDrawerOpen] =
    useState(false);

  const [careerSummary, setCareerSummary] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustryIds, setSelectedIndustryIds] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);

  async function loadProfessionalSnapshot() {
    try {
      const [
        savedSummary,
        availableIndustries,
        selectedIndustries,
        availableSkills,
        selectedSkills,
      ] = await Promise.all([
        candidateCareerSummaryApi.get(),
        candidateIndustryApi.getAvailable(),
        candidateIndustryApi.getSelected(),
        candidateSkillApi.getAvailable(),
        candidateSkillApi.getSelected(),
      ]);

      setCareerSummary(savedSummary || null);
      setIndustries(availableIndustries || []);

      setSelectedIndustryIds(
        (selectedIndustries || []).map((item) => item.industryTagId),
      );

      setSkills(availableSkills || []);

      setSelectedSkillIds(
        (selectedSkills || []).map((item) => item.skillTagId),
      );
    } catch (err) {
      console.error("Failed to load professional snapshot", err);
    }
  }

  async function loadProfileStrength({ silent = false } = {}) {
    try {
      if (silent) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data = await profileStrengthApi.get();

      setProfileStrength(data);
    } catch (err) {
      console.error("Failed to load profile setup", err);

      setError(
        err.response?.data?.message ||
          "Unable to load your profile setup. Please try again.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProfileStrength();
    loadProfessionalSnapshot();
  }, []);

  const requiredSections = useMemo(() => {
    const backendSections = profileStrength?.sections || [];

    return REQUIRED_KEYS.map((key) => {
      const backendSection = backendSections.find(
        (section) => section.key === key,
      );

      return {
        key,
        ...SECTION_META[key],
        completed: Boolean(backendSection?.completed),
      };
    });
  }, [profileStrength]);

  const completedCount = requiredSections.filter(
    (section) => section.completed,
  ).length;

  const requiredProgress = Number(profileStrength?.score ?? 0);

  const requiredComplete = completedCount === REQUIRED_KEYS.length;

  function handleSectionAction(sectionKey) {
    switch (sectionKey) {
      case "BASIC_INFORMATION":
        setBasicProfileDrawerOpen(true);
        break;

      case "EXPERIENCE":
        setExperienceDrawerOpen(true);
        break;

      case "EDUCATION":
        setEducationDrawerOpen(true);
        break;

      case "CAREER_DIRECTION":
        setCareerPreferencesDrawerOpen(true);
        break;

      case "PROFESSIONAL_SNAPSHOT":
        setProfessionalSnapshotDrawerOpen(true);
        break;

      default:
        break;
    }
  }

  async function handleProfessionalSnapshotSave({
    summary,
    industryIds,
    skillIds,
  }) {
    const [savedSummary, savedIndustries, savedSkills] = await Promise.all([
      candidateCareerSummaryApi.update({
        summary,
      }),

      candidateIndustryApi.update(industryIds),

      candidateSkillApi.update(skillIds),
    ]);

    setCareerSummary(savedSummary);

    setSelectedIndustryIds(
      (savedIndustries || []).map((item) => item.industryTagId),
    );

    setSelectedSkillIds((savedSkills || []).map((item) => item.skillTagId));

    await loadProfileStrength();

    setProfessionalSnapshotDrawerOpen(false);
  }

  async function handleBasicProfileSave(data) {
    await candidateBasicProfileApi.update(data);

    await loadProfileStrength({ silent: true });

    setBasicProfileDrawerOpen(false);
  }

  async function handleExperienceSave(data) {
    await candidateExperienceApi.create(data);

    await loadProfileStrength({ silent: true });

    setExperienceDrawerOpen(false);
  }

  async function handleEducationSave(data) {
    await candidateEducationApi.create(data);

    await loadProfileStrength({ silent: true });

    setEducationDrawerOpen(false);
  }

  async function handleCareerPreferencesSave(data) {
    await candidateCareerPreferencesApi.update(data);

    await loadProfileStrength({ silent: true });

    setCareerPreferencesDrawerOpen(false);
  }

  function handleContinue() {
    if (!requiredComplete) {
      return;
    }

    navigate("/candidate", { replace: true });
  }

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={6}>
        <Stack align="center" spacing={4}>
          <Spinner size="lg" />

          <Text color="gray.600">Preparing your profile setup…</Text>
        </Stack>
      </Flex>
    );
  }

  return (
    <>
      <Box minH="100vh" bg="gray.50" py={{ base: 8, md: 12 }}>
        <Container maxW="1100px">
          <Stack spacing={{ base: 8, md: 10 }}>
            {/* Header */}

            <Stack spacing={4} maxW="760px">
              <Badge
                alignSelf="flex-start"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.04em"
                textTransform="uppercase"
              >
                Profile setup
              </Badge>

              <Stack spacing={2}>
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="800"
                  lineHeight="1.1"
                  color="gray.900"
                  letterSpacing="-0.02em"
                >
                  Let’s build your professional profile.
                </Text>

                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.600"
                  lineHeight="1.7"
                >
                  Before you enter your candidate workspace, complete these five
                  essential sections.
                </Text>
              </Stack>
            </Stack>

            {/* Progress */}

            <Card
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="sm"
              bg="white"
            >
              <CardBody p={{ base: 5, md: 7 }}>
                <Stack spacing={5}>
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "flex-start", sm: "center" }}
                    justify="space-between"
                    gap={4}
                  >
                    <Stack spacing={1}>
                      <Text fontSize="sm" fontWeight="700" color="gray.900">
                        Required profile progress
                      </Text>

                      <Text fontSize="sm" color="gray.500">
                        {completedCount} of {REQUIRED_KEYS.length} required
                        sections complete
                      </Text>
                    </Stack>

                    <Text fontSize="2xl" fontWeight="800" color="gray.900">
                      {requiredProgress}%
                    </Text>
                  </Flex>

                  <Progress
                    value={requiredProgress}
                    size="sm"
                    borderRadius="full"
                    bg="gray.100"
                  />

                  <Text fontSize="sm" color="gray.500">
                    Complete all five sections to unlock your Springboard
                    workspace.
                  </Text>
                </Stack>
              </CardBody>
            </Card>

            {/* Error */}

            {error && (
              <Alert status="error" borderRadius="xl" alignItems="flex-start">
                <AlertIcon mt={1} />

                <Stack spacing={1} flex="1">
                  <Text fontWeight="700">We couldn’t load your profile.</Text>

                  <Text fontSize="sm">{error}</Text>
                </Stack>

                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<FiRefreshCw />}
                  onClick={() => loadProfileStrength()}
                >
                  Retry
                </Button>
              </Alert>
            )}

            {/* Required sections */}

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              {requiredSections.map((section) => {
                const isComplete = section.completed;

                return (
                  <Card
                    key={section.key}
                    borderRadius="2xl"
                    border="1px solid"
                    borderColor={isComplete ? "green.200" : "gray.200"}
                    bg="white"
                    boxShadow="sm"
                    transition="all 0.2s ease"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "md",
                    }}
                  >
                    <CardBody p={{ base: 5, md: 6 }}>
                      <Stack spacing={5}>
                        <Flex justify="space-between" align="flex-start">
                          <Flex
                            align="center"
                            justify="center"
                            w="48px"
                            h="48px"
                            borderRadius="xl"
                            bg={isComplete ? "green.50" : "gray.50"}
                          >
                            <Icon
                              as={isComplete ? FiCheck : section.icon}
                              boxSize={5}
                              color={isComplete ? "green.600" : "gray.700"}
                            />
                          </Flex>

                          <Badge
                            colorScheme={isComplete ? "green" : "gray"}
                            borderRadius="full"
                            px={3}
                            py={1}
                          >
                            {section.weight}%
                          </Badge>
                        </Flex>

                        <Stack spacing={1}>
                          <Flex align="center" gap={2}>
                            <Text
                              fontSize="lg"
                              fontWeight="750"
                              color="gray.900"
                            >
                              {section.title}
                            </Text>

                            {isComplete && (
                              <Badge
                                colorScheme="green"
                                variant="subtle"
                                borderRadius="full"
                                fontSize="xs"
                              >
                                Complete
                              </Badge>
                            )}
                          </Flex>

                          <Text fontSize="sm" color="gray.500" lineHeight="1.6">
                            {section.description}
                          </Text>
                        </Stack>

                        <Flex
                          align={{
                            base: "flex-start",
                            sm: "center",
                          }}
                          justify="space-between"
                          direction={{
                            base: "column",
                            sm: "row",
                          }}
                          gap={4}
                        >
                          <Text fontSize="xs" color="gray.400">
                            {isComplete
                              ? "This section is ready."
                              : "This section still needs your attention."}
                          </Text>

                          <Button
                            size="sm"
                            variant={isComplete ? "outline" : "solid"}
                            rightIcon={<FiArrowRight />}
                            onClick={() => handleSectionAction(section.key)}
                          >
                            {isComplete ? "Review" : "Complete"}
                          </Button>
                        </Flex>
                      </Stack>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>

            {/* Completion */}

            <Card
              borderRadius="2xl"
              border="1px solid"
              borderColor={requiredComplete ? "green.200" : "gray.200"}
              bg={requiredComplete ? "green.50" : "white"}
              boxShadow="sm"
            >
              <CardBody p={{ base: 5, md: 7 }}>
                <Flex
                  direction={{
                    base: "column",
                    md: "row",
                  }}
                  align={{
                    base: "flex-start",
                    md: "center",
                  }}
                  justify="space-between"
                  gap={6}
                >
                  <HStack align="flex-start" spacing={4}>
                    <Flex
                      align="center"
                      justify="center"
                      flexShrink={0}
                      w="44px"
                      h="44px"
                      borderRadius="full"
                      bg={requiredComplete ? "green.100" : "gray.100"}
                    >
                      <Icon
                        as={requiredComplete ? FiCheck : FiTarget}
                        boxSize={5}
                        color={requiredComplete ? "green.600" : "gray.600"}
                      />
                    </Flex>

                    <Stack spacing={1}>
                      <Text fontSize="md" fontWeight="750" color="gray.900">
                        {requiredComplete
                          ? "Your profile is ready."
                          : "Complete your required profile sections."}
                      </Text>

                      <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                        {requiredComplete
                          ? "You’ve completed everything required to enter your candidate workspace."
                          : "Finish the remaining sections above to unlock your candidate workspace."}
                      </Text>
                    </Stack>
                  </HStack>

                  <Button
                    flexShrink={0}
                    colorScheme={requiredComplete ? "green" : "gray"}
                    rightIcon={<FiArrowRight />}
                    onClick={handleContinue}
                    isDisabled={!requiredComplete}
                    size="md"
                    px={6}
                  >
                    Enter Springboard
                  </Button>
                </Flex>
              </CardBody>
            </Card>

            {/* Refresh */}

            <Flex justify="center">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={refreshing ? <Spinner size="xs" /> : <FiRefreshCw />}
                onClick={() => loadProfileStrength({ silent: true })}
                isDisabled={refreshing}
                color="gray.500"
              >
                Refresh profile status
              </Button>
            </Flex>
          </Stack>
        </Container>
      </Box>

      {/* Existing drawers */}

      <BasicProfileDrawer
        isOpen={basicProfileDrawerOpen}
        onClose={() => setBasicProfileDrawerOpen(false)}
        onSave={handleBasicProfileSave}
      />

      <ExperienceDrawer
        isOpen={experienceDrawerOpen}
        onClose={() => setExperienceDrawerOpen(false)}
        onSave={handleExperienceSave}
      />

      <EducationDrawer
        isOpen={educationDrawerOpen}
        onClose={() => setEducationDrawerOpen(false)}
        onSave={handleEducationSave}
      />

      <CareerPreferencesDrawer
        isOpen={careerPreferencesDrawerOpen}
        onClose={() => setCareerPreferencesDrawerOpen(false)}
        onSave={handleCareerPreferencesSave}
      />

      <ProfessionalSnapshotDrawer
        isOpen={professionalSnapshotDrawerOpen}
        onClose={() => setProfessionalSnapshotDrawerOpen(false)}
        careerSummary={careerSummary}
        industries={industries}
        selectedIndustryIds={selectedIndustryIds}
        skills={skills}
        selectedSkillIds={selectedSkillIds}
        onSave={handleProfessionalSnapshotSave}
      />
    </>
  );
}

export default CandidateProfileSetupPage;
