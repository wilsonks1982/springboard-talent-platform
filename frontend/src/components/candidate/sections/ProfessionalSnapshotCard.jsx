import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
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
  Select,
  SimpleGrid,
  Tag,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const MIN_SUMMARY_WORDS = 15;
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
        borderRadius="2xl"
        border="1px solid"
        borderColor="gray.100"
        p={{ base: 5, md: 6 }}
        boxShadow="sm"
      >
        <HStack justify="space-between" align="flex-start">
          <Box>
            <Text
              fontSize="xs"
              fontWeight="700"
              letterSpacing="wide"
              color="purple.600"
            >
              PROFESSIONAL SNAPSHOT
            </Text>

            <Text mt={1} fontSize="lg" fontWeight="700" color="gray.800">
              How you position yourself
            </Text>
          </Box>

          <Button
            size="sm"
            variant="ghost"
            colorScheme="purple"
            onClick={openEditor}
          >
            Edit
          </Button>
        </HStack>

        <Text
          mt={5}
          fontSize="sm"
          lineHeight="1.75"
          color="gray.600"
          noOfLines={5}
        >
          {careerSummary?.summary ||
            "Add a concise 150–300 word summary that explains your experience, expertise and career direction."}
        </Text>

        <Divider my={5} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          <Box>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
            >
              Industry
            </Text>

            <Text mt={2} fontSize="sm" fontWeight="600" color="gray.800">
              {selectedIndustry?.name || "Not selected"}
            </Text>
          </Box>

          <Box>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="gray.500"
              textTransform="uppercase"
            >
              Core skills
            </Text>

            <Wrap mt={2} spacing={2}>
              {selectedSkills.length > 0 ? (
                selectedSkills.map((skill) => (
                  <WrapItem key={skill.id}>
                    <Tag size="sm" borderRadius="full" colorScheme="purple">
                      {skill.name}
                    </Tag>
                  </WrapItem>
                ))
              ) : (
                <Text fontSize="sm" color="gray.500">
                  No skills selected
                </Text>
              )}
            </Wrap>
          </Box>
        </SimpleGrid>
      </Box>

      <Drawer isOpen={open} placement="right" onClose={closeEditor} size="md">
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader>Professional snapshot</DrawerHeader>

          <DrawerBody>
            {validationError && (
              <Alert status="error" mb={5} borderRadius="md">
                <AlertIcon />
                {validationError}
              </Alert>
            )}

            <FormControl isRequired>
              <FormLabel>Career summary</FormLabel>

              <Textarea
                value={summary}
                onChange={(event) => {
                  setSummary(event.target.value);
                  setValidationError("");
                }}
                minH="240px"
                resize="vertical"
                placeholder="Summarize your experience, strengths and career direction..."
              />

              <FormHelperText
                color={
                  summaryValid
                    ? "green.600"
                    : summaryWords > MAX_SUMMARY_WORDS
                      ? "red.600"
                      : "gray.500"
                }
              >
                {summaryWords} / {MIN_SUMMARY_WORDS}–{MAX_SUMMARY_WORDS} words
              </FormHelperText>
            </FormControl>

            <FormControl mt={6} isRequired>
              <FormLabel>Industry</FormLabel>

              <Select
                value={industryId}
                onChange={(event) => {
                  setIndustryId(event.target.value);
                  setValidationError("");
                }}
                placeholder="Select your primary industry"
              >
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Core skills</FormLabel>

              <Wrap spacing={2}>
                {skills.map((skill) => {
                  const selected = skillIds.includes(skill.id);

                  return (
                    <WrapItem key={skill.id}>
                      <Tag
                        size="md"
                        cursor="pointer"
                        borderRadius="full"
                        variant={selected ? "solid" : "subtle"}
                        colorScheme={selected ? "purple" : "gray"}
                        onClick={() => toggleSkill(skill.id)}
                      >
                        {skill.name}
                      </Tag>
                    </WrapItem>
                  );
                })}
              </Wrap>
            </FormControl>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor="gray.100">
            <Button
              mr={3}
              variant="ghost"
              onClick={closeEditor}
              isDisabled={saving}
            >
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
