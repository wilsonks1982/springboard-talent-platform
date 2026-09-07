import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Select,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  FiBriefcase,
  FiCheck,
  FiEdit3,
  FiPlus,
  FiStar,
  FiTarget,
} from "react-icons/fi";

const MIN_SUMMARY_WORDS = 150;
const MAX_SUMMARY_WORDS = 300;

function wordCount(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export default function ProfessionalSnapshotCard({
  careerSummary,
  industries,
  selectedIndustryIds,
  skills,
  selectedSkillIds,
  onSave,
}) {
  const [open, setOpen] = useState(false);

  const [summary, setSummary] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [skillIds, setSkillIds] = useState([]);

  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setSummary(careerSummary?.summary || "");
  }, [careerSummary]);

  useEffect(() => {
    setIndustryId(selectedIndustryIds?.[0] || "");
  }, [selectedIndustryIds]);

  useEffect(() => {
    setSkillIds(selectedSkillIds || []);
  }, [selectedSkillIds]);

  const selectedIndustry = useMemo(
    () => industries.find((industry) => industry.id === industryId),
    [industries, industryId],
  );

  const selectedSkills = useMemo(
    () => skills.filter((skill) => skillIds.includes(skill.id)),
    [skills, skillIds],
  );

  const summaryWords = wordCount(summary);

  const summaryValid =
    summaryWords >= MIN_SUMMARY_WORDS && summaryWords <= MAX_SUMMARY_WORDS;

  const hasSnapshot =
    Boolean(careerSummary?.summary) ||
    Boolean(selectedIndustryIds?.length) ||
    Boolean(selectedSkillIds?.length);

  function toggleSkill(id) {
    setSkillIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

    setValidationError("");
  }

  function openEditor() {
    setSummary(careerSummary?.summary || "");
    setIndustryId(selectedIndustryIds?.[0] || "");
    setSkillIds(selectedSkillIds || []);
    setValidationError("");
    setOpen(true);
  }

  function closeEditor() {
    if (!saving) {
      setOpen(false);
      setValidationError("");
    }
  }

  async function handleSave() {
    setValidationError("");

    if (!industryId) {
      setValidationError("Please select your primary industry.");
      return;
    }

    if (summaryWords < MIN_SUMMARY_WORDS) {
      setValidationError(
        `Career summary must contain at least ${MIN_SUMMARY_WORDS} words. Current count: ${summaryWords}.`,
      );
      return;
    }

    if (summaryWords > MAX_SUMMARY_WORDS) {
      setValidationError(
        `Career summary cannot exceed ${MAX_SUMMARY_WORDS} words. Current count: ${summaryWords}.`,
      );
      return;
    }

    setSaving(true);

    try {
      await onSave({
        summary,
        industryIds: [industryId],
        skillIds,
      });

      setOpen(false);
      setValidationError("");
    } catch (error) {
      setValidationError(
        error?.response?.data?.message ||
          "Unable to save the professional snapshot. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <Box
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="2xl"
        boxShadow="0 4px 20px rgba(15, 23, 42, 0.04)"
        overflow="hidden"
      >
        {/* Header */}
        <FlexHeader onEdit={openEditor} hasSnapshot={hasSnapshot} />

        <Divider />

        {!hasSnapshot ? (
          <EmptySnapshotState onEdit={openEditor} />
        ) : (
          <Box p={{ base: 5, md: 7 }}>
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacing={{ base: 6, lg: 8 }}
            >
              {/* Career Summary */}
              <Box gridColumn={{ base: "auto", lg: "span 2" }}>
                <HStack spacing={2} mb={3}>
                  <Icon as={FiStar} color="purple.500" boxSize={4} />
                  <Text
                    fontSize="xs"
                    fontWeight="800"
                    color="gray.500"
                    letterSpacing="0.08em"
                  >
                    CAREER SUMMARY
                  </Text>
                </HStack>

                <Text
                  color="gray.700"
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="1.8"
                  noOfLines={{ base: 6, md: 5 }}
                >
                  {careerSummary?.summary ||
                    "Add a concise professional summary that explains your experience, strengths and career direction."}
                </Text>

                {careerSummary?.summary && (
                  <Text mt={3} fontSize="xs" color="gray.400">
                    {wordCount(careerSummary.summary)} words
                  </Text>
                )}
              </Box>

              {/* Professional Focus */}
              <Stack spacing={5}>
                <SnapshotItem
                  icon={FiTarget}
                  label="PRIMARY INDUSTRY"
                  value={selectedIndustry?.name}
                  fallback="Not selected"
                />

                <Box>
                  <HStack spacing={2} mb={3}>
                    <Icon as={FiBriefcase} color="purple.500" boxSize={4} />
                    <Text
                      fontSize="xs"
                      fontWeight="800"
                      color="gray.500"
                      letterSpacing="0.08em"
                    >
                      CORE SKILLS
                    </Text>
                  </HStack>

                  {selectedSkills.length > 0 ? (
                    <Wrap spacing={2}>
                      {selectedSkills.map((skill) => (
                        <WrapItem key={skill.id}>
                          <Tag
                            size="sm"
                            borderRadius="full"
                            colorScheme="purple"
                            px={3}
                            py={1.5}
                            fontWeight="600"
                          >
                            {skill.name}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  ) : (
                    <Text fontSize="sm" color="gray.400">
                      No skills selected yet.
                    </Text>
                  )}
                </Box>
              </Stack>
            </SimpleGrid>
          </Box>
        )}
      </Box>

      {/* Editor Drawer */}
      <Drawer
        isOpen={open}
        placement="right"
        onClose={closeEditor}
        size={{ base: "full", md: "lg" }}
      >
        <DrawerOverlay bg="blackAlpha.400" />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottom="1px solid" borderColor="gray.100" pr={12}>
            <Text fontSize="xl" fontWeight="800" color="gray.900">
              Professional snapshot
            </Text>

            <Text mt={1} fontSize="sm" fontWeight="400" color="gray.500">
              Shape how recruiters understand your professional profile.
            </Text>
          </DrawerHeader>

          <DrawerBody py={6}>
            <Stack spacing={7}>
              {validationError && (
                <Box
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.100"
                  borderRadius="xl"
                  p={4}
                >
                  <Text fontSize="sm" color="red.700" fontWeight="600">
                    {validationError}
                  </Text>
                </Box>
              )}

              {/* Career Summary */}
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.700"
                  mb={2}
                >
                  Career summary
                </FormLabel>

                <Textarea
                  value={summary}
                  onChange={(event) => {
                    setSummary(event.target.value);
                    setValidationError("");
                  }}
                  placeholder="Describe your professional experience, strongest capabilities, domain expertise and the kind of value you bring..."
                  minH="220px"
                  resize="vertical"
                  borderRadius="xl"
                  borderColor="gray.200"
                  focusBorderColor="purple.400"
                  fontSize="sm"
                  lineHeight="1.7"
                />

                <HStack justify="space-between" mt={2}>
                  <FormHelperText m={0} fontSize="xs" color="gray.400">
                    Keep it focused, specific and recruiter-friendly.
                  </FormHelperText>

                  <Text
                    fontSize="xs"
                    fontWeight="700"
                    color={
                      summaryValid
                        ? "green.500"
                        : summaryWords > MAX_SUMMARY_WORDS
                          ? "red.500"
                          : "gray.400"
                    }
                  >
                    {summaryWords} / {MIN_SUMMARY_WORDS}–{MAX_SUMMARY_WORDS}
                  </Text>
                </HStack>
              </FormControl>

              {/* Industry */}
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.700"
                  mb={2}
                >
                  Primary industry
                </FormLabel>

                <Select
                  value={industryId}
                  onChange={(event) => {
                    setIndustryId(event.target.value);
                    setValidationError("");
                  }}
                  placeholder="Select your primary industry"
                  borderRadius="xl"
                  borderColor="gray.200"
                  focusBorderColor="purple.400"
                  size="lg"
                >
                  {industries.map((industry) => (
                    <option key={industry.id} value={industry.id}>
                      {industry.name}
                    </option>
                  ))}
                </Select>

                <FormHelperText fontSize="xs" color="gray.400">
                  Choose the industry that best represents your professional
                  direction.
                </FormHelperText>
              </FormControl>

              {/* Skills */}
              <FormControl>
                <FormLabel
                  fontSize="sm"
                  fontWeight="700"
                  color="gray.700"
                  mb={2}
                >
                  Core skills
                </FormLabel>

                <Text mb={3} fontSize="xs" color="gray.400">
                  Select the skills that best represent your strongest
                  capabilities.
                </Text>

                <Wrap spacing={2}>
                  {skills.map((skill) => {
                    const selected = skillIds.includes(skill.id);

                    return (
                      <WrapItem key={skill.id}>
                        <Button
                          size="sm"
                          borderRadius="full"
                          variant={selected ? "solid" : "outline"}
                          colorScheme={selected ? "purple" : "gray"}
                          leftIcon={selected ? <FiCheck /> : <FiPlus />}
                          onClick={() => toggleSkill(skill.id)}
                        >
                          {skill.name}
                        </Button>
                      </WrapItem>
                    );
                  })}
                </Wrap>

                {skillIds.length > 0 && (
                  <Text mt={3} fontSize="xs" color="gray.500">
                    {skillIds.length} skill
                    {skillIds.length === 1 ? "" : "s"} selected
                  </Text>
                )}
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor="gray.100" gap={3}>
            <Button variant="ghost" onClick={closeEditor} isDisabled={saving}>
              Cancel
            </Button>

            <Button
              colorScheme="purple"
              onClick={handleSave}
              isLoading={saving}
              isDisabled={saving}
            >
              Save snapshot
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function FlexHeader({ onEdit, hasSnapshot }) {
  return (
    <Box p={{ base: 5, md: 6 }}>
      <HStack
        justify="space-between"
        align={{ base: "flex-start", sm: "center" }}
        spacing={4}
      >
        <HStack align="flex-start" spacing={3}>
          <Box
            mt={1}
            w="40px"
            h="40px"
            borderRadius="xl"
            bg="purple.50"
            color="purple.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Icon as={FiStar} boxSize={5} />
          </Box>

          <Box>
            <HStack spacing={2} flexWrap="wrap">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="800"
                color="gray.900"
              >
                Professional Snapshot
              </Text>

              {hasSnapshot && (
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  px={2}
                  fontSize="9px"
                >
                  COMPLETE
                </Badge>
              )}
            </HStack>

            <Text mt={1} fontSize="sm" color="gray.500">
              The professional story behind your profile.
            </Text>
          </Box>
        </HStack>

        <Button
          size="sm"
          variant="outline"
          colorScheme="purple"
          leftIcon={<FiEdit3 />}
          onClick={onEdit}
          flexShrink={0}
        >
          Edit
        </Button>
      </HStack>
    </Box>
  );
}

function SnapshotItem({ icon, label, value, fallback }) {
  return (
    <Box>
      <HStack spacing={2} mb={3}>
        <Icon as={icon} color="purple.500" boxSize={4} />
        <Text
          fontSize="xs"
          fontWeight="800"
          color="gray.500"
          letterSpacing="0.08em"
        >
          {label}
        </Text>
      </HStack>

      <Text
        fontSize="md"
        fontWeight="700"
        color={value ? "gray.800" : "gray.400"}
      >
        {value || fallback}
      </Text>
    </Box>
  );
}

function EmptySnapshotState({ onEdit }) {
  return (
    <Box px={{ base: 5, md: 7 }} py={{ base: 8, md: 10 }}>
      <Stack
        align="center"
        textAlign="center"
        spacing={4}
        maxW="560px"
        mx="auto"
      >
        <Box
          w="52px"
          h="52px"
          borderRadius="2xl"
          bg="purple.50"
          color="purple.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FiTarget} boxSize={6} />
        </Box>

        <Box>
          <Text fontSize="md" fontWeight="800" color="gray.800">
            Tell recruiters what you do best
          </Text>

          <Text mt={2} fontSize="sm" color="gray.500" lineHeight="1.7">
            Add your career summary, primary industry and core skills to make
            your professional direction immediately clear.
          </Text>
        </Box>

        <Button
          size="sm"
          colorScheme="purple"
          leftIcon={<FiPlus />}
          onClick={onEdit}
        >
          Build professional snapshot
        </Button>
      </Stack>
    </Box>
  );
}
