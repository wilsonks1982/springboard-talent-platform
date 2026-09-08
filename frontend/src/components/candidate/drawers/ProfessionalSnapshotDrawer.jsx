import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
  Stack,
  Text,
  Textarea,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { FiCheck, FiPlus } from "react-icons/fi";

const MIN_SUMMARY_WORDS = 150;
const MAX_SUMMARY_WORDS = 300;

function wordCount(value) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export default function ProfessionalSnapshotDrawer({
  isOpen,
  onClose,
  careerSummary,
  industries,
  selectedIndustryIds,
  skills,
  selectedSkillIds,
  onSave,
}) {
  const [summary, setSummary] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [skillIds, setSkillIds] = useState([]);

  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSummary(careerSummary?.summary || "");
    setIndustryId(selectedIndustryIds?.[0] || "");
    setSkillIds(selectedSkillIds || []);
    setValidationError("");
  }, [isOpen, careerSummary, selectedIndustryIds, selectedSkillIds]);

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

  function handleClose() {
    if (saving) {
      return;
    }

    setValidationError("");
    onClose();
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

      setValidationError("");
      onClose();
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
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={handleClose}
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
              <FormLabel fontSize="sm" fontWeight="700" color="gray.700" mb={2}>
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
              <FormLabel fontSize="sm" fontWeight="700" color="gray.700" mb={2}>
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
              <FormLabel fontSize="sm" fontWeight="700" color="gray.700" mb={2}>
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
          <Button variant="ghost" onClick={handleClose} isDisabled={saving}>
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
  );
}
