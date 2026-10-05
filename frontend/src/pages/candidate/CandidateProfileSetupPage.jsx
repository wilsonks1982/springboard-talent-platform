import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Progress,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  VStack,
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
    number: "01",
    title: "Basic Profile",
    description: "Your personal and contact information",
    weight: 20,
    icon: FiUser,
  },

  EXPERIENCE: {
    number: "02",
    title: "Employment",
    description: "Your latest employment details only.",
    weight: 25,
    icon: FiBriefcase,
  },

  EDUCATION: {
    number: "03",
    title: "Education",
    description: "Your academic background",
    weight: 30,
    icon: FiBookOpen,
  },

  CAREER_DIRECTION: {
    number: "04",
    title: "Career direction",
    description: "Your career goals and direction",
    weight: 15,
    icon: FiTarget,
  },

  PROFESSIONAL_SNAPSHOT: {
    number: "05",
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
  const [basicProfile, setBasicProfile] = useState(null);

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

  async function loadBasicProfile() {
    try {
      const data = await candidateBasicProfileApi.get();
      setBasicProfile(data || null);
      console.log("Loaded basic profile:", data);
    } catch (err) {
      console.error("Failed to load basic profile", err);
    }
  }

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
    loadBasicProfile();
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
    const savedProfile = await candidateBasicProfileApi.update(data);

    setBasicProfile(savedProfile || data);

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

    if (onComplete) {
      onComplete();
      return;
    }

    navigate("/candidate", { replace: true });
  }

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="cream.100" px={6}>
        <Stack align="center" spacing={5}>
          <Box
            w="48px"
            h="48px"
            border="1px solid"
            borderColor="cream.300"
            bg="white"
            borderRadius="4px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="sm" thickness="2px" color="accent.500" />
          </Box>

          <Stack spacing={1} textAlign="center">
            <Text fontFamily="heading" fontSize="lg" color="brand.500">
              Preparing your profile
            </Text>

            <Text fontSize="sm" color="taupe.500">
              Just a moment while we load your profile setup.
            </Text>
          </Stack>
        </Stack>
      </Flex>
    );
  }

  return (
    <>
      <Box minH="100vh" bg="cream.100" py={{ base: 8, md: 12 }}>
        <Container maxW="1080px">
          <Stack spacing={{ base: 8, md: 10 }}>
            {/* =====================================================
                HEADER
            ====================================================== */}

            <Box maxW="780px">
              <Text
                fontSize="10px"
                fontWeight="800"
                letterSpacing="0.16em"
                color="accent.600"
                mb={3}
              >
                PROFILE SETUP
              </Text>

              <Text
                fontFamily="heading"
                fontSize={{ base: "3xl", md: "4xl" }}
                fontWeight="500"
                lineHeight="1.15"
                color="brand.500"
              >
                Build your professional story.
              </Text>

              <Text
                mt={3}
                fontSize={{ base: "md", md: "lg" }}
                color="taupe.600"
                lineHeight="1.75"
                maxW="720px"
              >
                Complete the essential pieces of your profile. Springboard uses
                this information to understand your experience, direction and
                professional potential.
              </Text>

              <Box mt={5} h="2px" w="52px" bg="accent.500" />
            </Box>

            {/* =====================================================
                PROFILE PROGRESS
            ====================================================== */}

            <Box
              bg="white"
              border="1px solid"
              borderColor="cream.300"
              borderRadius="6px"
              boxShadow="0 6px 24px rgba(46, 42, 40, 0.045)"
            >
              <Box p={{ base: 5, md: 7 }}>
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "flex-start", sm: "center" }}
                  justify="space-between"
                  gap={5}
                >
                  <Stack spacing={1}>
                    <Text
                      fontSize="10px"
                      fontWeight="800"
                      letterSpacing="0.14em"
                      color="accent.600"
                    >
                      PROFILE COMPLETION
                    </Text>

                    <Text
                      fontFamily="heading"
                      fontSize="xl"
                      fontWeight="500"
                      color="brand.500"
                    >
                      {completedCount} of {REQUIRED_KEYS.length} sections
                      complete
                    </Text>

                    <Text fontSize="sm" color="taupe.500">
                      Complete all five sections to unlock your Springboard
                      workspace.
                    </Text>
                  </Stack>

                  <Text
                    fontFamily="heading"
                    fontSize={{ base: "3xl", md: "4xl" }}
                    fontWeight="500"
                    color="brand.500"
                    lineHeight="1"
                  >
                    {requiredProgress}%
                  </Text>
                </Flex>

                <Box mt={6}>
                  <Progress
                    value={requiredProgress}
                    size="xs"
                    borderRadius="0"
                    bg="cream.200"
                    sx={{
                      "& > div": {
                        background:
                          "linear-gradient(90deg, #601230 0%, #C89732 100%)",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* =====================================================
                ERROR
            ====================================================== */}

            {error && (
              <Alert
                status="error"
                borderRadius="5px"
                alignItems="flex-start"
                bg="error.50"
                border="1px solid"
                borderColor="error.200"
                px={4}
                py={3}
              >
                <AlertIcon mt={1} color="error.600" />

                <Stack spacing={1} flex="1">
                  <Text fontWeight="700" color="error.700" fontSize="sm">
                    We couldn't load your profile.
                  </Text>

                  <Text fontSize="sm" color="error.600">
                    {error}
                  </Text>
                </Stack>

                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<FiRefreshCw />}
                  onClick={() => loadProfileStrength()}
                  borderRadius="4px"
                  borderColor="error.300"
                  color="error.700"
                  bg="white"
                  _hover={{
                    bg: "error.50",
                  }}
                >
                  Retry
                </Button>
              </Alert>
            )}

            {/* =====================================================
                REQUIRED SECTIONS
            ====================================================== */}

            <Stack spacing={4}>
              <Flex
                align={{ base: "flex-start", sm: "center" }}
                justify="space-between"
                direction={{ base: "column", sm: "row" }}
                gap={2}
              >
                <Box>
                  <Text
                    fontFamily="heading"
                    fontSize="2xl"
                    fontWeight="500"
                    color="brand.500"
                  >
                    Your professional profile
                  </Text>

                  <Text fontSize="sm" color="taupe.500" mt={1}>
                    These five sections form the foundation of your Springboard
                    profile.
                  </Text>
                </Box>

                <Text
                  fontSize="10px"
                  fontWeight="800"
                  letterSpacing="0.12em"
                  color="taupe.500"
                >
                  REQUIRED
                </Text>
              </Flex>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {requiredSections.map((section) => {
                  const isComplete = section.completed;

                  return (
                    <Box
                      key={section.key}
                      bg={isComplete ? "white" : "white"}
                      border="1px solid"
                      borderColor={isComplete ? "accent.200" : "cream.300"}
                      borderRadius="5px"
                      position="relative"
                      overflow="hidden"
                      transition="all 0.2s ease"
                      _hover={{
                        borderColor: isComplete ? "accent.300" : "brand.300",
                        boxShadow: "0 8px 24px rgba(46, 42, 40, 0.07)",
                        transform: "translateY(-1px)",
                      }}
                    >
                      {/* Gold completion indicator */}

                      {isComplete && (
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          right="0"
                          h="3px"
                          bg="accent.500"
                        />
                      )}

                      <Box p={{ base: 5, md: 6 }}>
                        <Stack spacing={5}>
                          {/* Section heading */}

                          <Flex
                            justify="space-between"
                            align="flex-start"
                            gap={4}
                          >
                            <HStack spacing={4} align="flex-start">
                              <Box
                                w="42px"
                                h="42px"
                                minW="42px"
                                borderRadius="4px"
                                bg={isComplete ? "accent.50" : "cream.100"}
                                border="1px solid"
                                borderColor={
                                  isComplete ? "accent.200" : "cream.300"
                                }
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Icon
                                  as={isComplete ? FiCheck : section.icon}
                                  boxSize="17px"
                                  color={
                                    isComplete ? "accent.600" : "brand.500"
                                  }
                                />
                              </Box>

                              <Box>
                                <HStack spacing={2} align="center">
                                  <Text
                                    fontSize="10px"
                                    fontWeight="800"
                                    letterSpacing="0.12em"
                                    color="taupe.400"
                                  >
                                    {section.number}
                                  </Text>

                                  {isComplete && (
                                    <Text
                                      fontSize="9px"
                                      fontWeight="800"
                                      letterSpacing="0.1em"
                                      color="accent.600"
                                      textTransform="uppercase"
                                    >
                                      Complete
                                    </Text>
                                  )}
                                </HStack>

                                <Text
                                  fontFamily="heading"
                                  fontSize="xl"
                                  fontWeight="500"
                                  color="brand.500"
                                  mt={1}
                                  lineHeight="1.25"
                                >
                                  {section.title}
                                </Text>
                              </Box>
                            </HStack>

                            <Text
                              fontFamily="heading"
                              fontSize="lg"
                              fontWeight="500"
                              color={isComplete ? "accent.600" : "taupe.400"}
                              flexShrink={0}
                            >
                              {section.weight}%
                            </Text>
                          </Flex>

                          {/* Description */}

                          <Text
                            fontSize="sm"
                            color="taupe.600"
                            lineHeight="1.65"
                            minH={{ base: "auto", md: "46px" }}
                          >
                            {section.description}
                          </Text>

                          {/* Divider */}

                          <Box h="1px" bg="cream.200" />

                          {/* Action */}

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
                            gap={3}
                          >
                            <Text
                              fontSize="xs"
                              color={isComplete ? "accent.700" : "taupe.400"}
                            >
                              {isComplete
                                ? "This section is ready."
                                : "This section still needs your attention."}
                            </Text>

                            <Button
                              size="sm"
                              variant={isComplete ? "outlineGold" : "solid"}
                              rightIcon={<FiArrowRight />}
                              onClick={() => handleSectionAction(section.key)}
                              borderRadius="4px"
                              flexShrink={0}
                            >
                              {isComplete ? "Review" : "Complete"}
                            </Button>
                          </Flex>
                        </Stack>
                      </Box>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Stack>

            {/* =====================================================
                COMPLETION
            ====================================================== */}

            <Box
              bg={requiredComplete ? "brand.500" : "white"}
              color={requiredComplete ? "white" : "charcoal.800"}
              border="1px solid"
              borderColor={requiredComplete ? "brand.500" : "cream.300"}
              borderRadius="6px"
              overflow="hidden"
              boxShadow={
                requiredComplete
                  ? "0 12px 30px rgba(96, 18, 48, 0.18)"
                  : "0 6px 24px rgba(46, 42, 40, 0.04)"
              }
            >
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
                p={{ base: 5, md: 7 }}
              >
                <HStack align="flex-start" spacing={4}>
                  <Box
                    w="44px"
                    h="44px"
                    minW="44px"
                    borderRadius="4px"
                    bg={requiredComplete ? "whiteAlpha.150" : "cream.100"}
                    border="1px solid"
                    borderColor={
                      requiredComplete ? "whiteAlpha.300" : "cream.300"
                    }
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon
                      as={requiredComplete ? FiCheck : FiTarget}
                      boxSize="18px"
                      color={requiredComplete ? "accent.300" : "brand.500"}
                    />
                  </Box>

                  <Stack spacing={1}>
                    <Text
                      fontSize="10px"
                      fontWeight="800"
                      letterSpacing="0.14em"
                      color={requiredComplete ? "accent.300" : "accent.600"}
                    >
                      {requiredComplete ? "PROFILE READY" : "NEXT STEP"}
                    </Text>

                    <Text
                      fontFamily="heading"
                      fontSize="xl"
                      fontWeight="500"
                      color={requiredComplete ? "white" : "brand.500"}
                    >
                      {requiredComplete
                        ? "Your professional profile is ready."
                        : "Complete your required profile sections."}
                    </Text>

                    <Text
                      fontSize="sm"
                      color={requiredComplete ? "whiteAlpha.800" : "taupe.600"}
                      lineHeight="1.65"
                      maxW="620px"
                    >
                      {requiredComplete
                        ? "You’ve completed everything required to enter your candidate workspace."
                        : "Finish the remaining sections above to unlock your candidate workspace."}
                    </Text>
                  </Stack>
                </HStack>

                <Button
                  flexShrink={0}
                  size="md"
                  px={6}
                  rightIcon={<FiArrowRight />}
                  onClick={handleContinue}
                  isDisabled={!requiredComplete}
                  borderRadius="4px"
                  bg={requiredComplete ? "accent.500" : "cream.200"}
                  color={requiredComplete ? "white" : "taupe.500"}
                  border="1px solid"
                  borderColor={requiredComplete ? "accent.500" : "cream.300"}
                  _hover={
                    requiredComplete
                      ? {
                          bg: "accent.600",
                          transform: "translateY(-1px)",
                          boxShadow: "0 8px 20px rgba(200, 151, 50, 0.22)",
                        }
                      : {}
                  }
                  _active={
                    requiredComplete
                      ? {
                          transform: "translateY(0)",
                        }
                      : {}
                  }
                  transition="all 0.2s ease"
                >
                  Enter Springboard
                </Button>
              </Flex>
            </Box>

            {/* =====================================================
                REFRESH
            ====================================================== */}

            <Flex justify="center">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={refreshing ? <Spinner size="xs" /> : <FiRefreshCw />}
                onClick={() =>
                  loadProfileStrength({
                    silent: true,
                  })
                }
                isDisabled={refreshing}
                color="taupe.500"
                borderRadius="4px"
                _hover={{
                  bg: "cream.200",
                  color: "brand.500",
                }}
              >
                Refresh profile status
              </Button>
            </Flex>
          </Stack>
        </Container>
      </Box>

      {/* =========================================================
          EXISTING DRAWERS
      ========================================================== */}

      <BasicProfileDrawer
        isOpen={basicProfileDrawerOpen}
        onClose={() => setBasicProfileDrawerOpen(false)}
        profile={basicProfile}
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
