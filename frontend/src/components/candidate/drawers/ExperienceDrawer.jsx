import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  companyName: "",
  jobTitle: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  reportedToTitle: "",
  managementType: "",
  teamSize: "",
  reasonForLeaving: "",
};

export default function ExperienceDrawer({
  isOpen,
  onClose,
  experience,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEditing = Boolean(experience);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      companyName: experience?.companyName || "",
      jobTitle: experience?.jobTitle || "",
      startDate: experience?.startDate
        ? experience.startDate.substring(0, 7)
        : "",
      endDate: experience?.endDate ? experience.endDate.substring(0, 7) : "",
      current: experience?.current ?? !experience?.endDate,
      description: experience?.description || "",
      reportedToTitle: experience?.reportedToTitle || "",
      managementType: experience?.managementType || "",
      teamSize: experience?.teamSize != null ? String(experience.teamSize) : "",
      reasonForLeaving: experience?.reasonForLeaving || "",
    });

    setErrors({});
    setServerError("");
  }, [isOpen, experience]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function handleCurrentChange(event) {
    const checked = event.target.checked;

    setForm((current) => ({
      ...current,
      current: checked,
      endDate: checked ? "" : current.endDate,
    }));

    setErrors((current) => ({
      ...current,
      endDate: "",
    }));
  }

  function handleManagementTypeChange(event) {
    const value = event.target.value;

    setForm((current) => ({
      ...current,
      managementType: value,
      teamSize: value === "PEOPLE_MANAGER" ? current.teamSize : "",
    }));

    setErrors((current) => ({
      ...current,
      managementType: "",
      teamSize: "",
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.companyName.trim()) {
      nextErrors.companyName = "Company is required.";
    }

    if (!form.jobTitle.trim()) {
      nextErrors.jobTitle = "Job title is required.";
    }

    if (!form.startDate) {
      nextErrors.startDate = "Start date is required.";
    }

    if (!form.current && !form.endDate) {
      nextErrors.endDate = "End date is required for a completed role.";
    }

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      nextErrors.endDate = "End date must be on or after the start date.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Please describe what you did in this role.";
    } else if (form.description.trim().length < 20) {
      nextErrors.description =
        "Role description must be at least 20 characters.";
    }

    if (!form.managementType) {
      nextErrors.managementType = "Management type is required.";
    }

    if (form.managementType === "PEOPLE_MANAGER") {
      if (!form.teamSize) {
        nextErrors.teamSize = "Team size is required for People Manager roles.";
      } else if (Number(form.teamSize) < 1) {
        nextErrors.teamSize = "Team size must be at least 1.";
      }
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    const payload = {
      companyName: form.companyName.trim(),
      jobTitle: form.jobTitle.trim(),

      // Backend persists LocalDate while UI captures month/year.
      startDate: `${form.startDate}-01`,

      endDate: form.current ? null : `${form.endDate}-01`,

      description: form.description.trim(),

      reportedToTitle: form.reportedToTitle.trim() || null,

      managementType: form.managementType,

      teamSize:
        form.managementType === "PEOPLE_MANAGER" ? Number(form.teamSize) : null,

      reasonForLeaving: form.reasonForLeaving.trim() || null,
    };

    try {
      setSaving(true);

      await onSave(payload, experience?.id);

      onClose();
    } catch (error) {
      setServerError(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save employment history.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Text fontSize="lg" fontWeight="bold">
            {isEditing ? "Edit Employment" : "Add Employment"}
          </Text>

          <Text mt={1} fontSize="sm" fontWeight="normal" color="gray.500">
            Tell us about your role and responsibilities.
          </Text>
        </DrawerHeader>

        <DrawerBody overflowY="auto">
          <Stack
            as="form"
            id="employment-history-form"
            spacing={5}
            onSubmit={handleSubmit}
          >
            {serverError && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {serverError}
              </Alert>
            )}

            {/* Company */}
            <FormControl isInvalid={Boolean(errors.companyName)}>
              <FormLabel>Company</FormLabel>

              <Input
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="e.g. ABC Technologies"
                autoComplete="organization"
              />

              <FormErrorMessage>{errors.companyName}</FormErrorMessage>
            </FormControl>

            {/* Job title */}
            <FormControl isInvalid={Boolean(errors.jobTitle)}>
              <FormLabel>Job Title</FormLabel>

              <Input
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Senior Java Developer"
              />

              <FormErrorMessage>{errors.jobTitle}</FormErrorMessage>
            </FormControl>

            {/* Dates */}
            <Box>
              <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                <FormControl flex="1" isInvalid={Boolean(errors.startDate)}>
                  <FormLabel>Start Date</FormLabel>

                  <Input
                    name="startDate"
                    type="month"
                    value={form.startDate}
                    onChange={handleChange}
                  />

                  <FormErrorMessage>{errors.startDate}</FormErrorMessage>
                </FormControl>

                <FormControl flex="1" isInvalid={Boolean(errors.endDate)}>
                  <FormLabel>End Date</FormLabel>

                  <Input
                    name="endDate"
                    type="month"
                    value={form.endDate}
                    onChange={handleChange}
                    disabled={form.current}
                  />

                  <FormErrorMessage>{errors.endDate}</FormErrorMessage>
                </FormControl>
              </Stack>

              <Checkbox
                mt={3}
                isChecked={form.current}
                onChange={handleCurrentChange}
              >
                I currently work here
              </Checkbox>
            </Box>

            {/* Role description */}
            <FormControl isInvalid={Boolean(errors.description)}>
              <FormLabel>Role Description</FormLabel>

              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder={
                  "Describe what you did in this role. " +
                  "Focus on responsibilities, scope and contribution."
                }
                rows={5}
                resize="vertical"
              />

              <FormHelperText>
                Keep this to 2–4 sentences in plain language.
              </FormHelperText>

              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            {/* Reporting title */}
            <FormControl>
              <FormLabel>
                Reported To
                <Text as="span" ml={1} color="gray.400" fontWeight="normal">
                  (optional)
                </Text>
              </FormLabel>

              <Input
                name="reportedToTitle"
                value={form.reportedToTitle}
                onChange={handleChange}
                placeholder="e.g. VP Engineering"
              />

              <FormHelperText>Title only — no manager name.</FormHelperText>
            </FormControl>

            {/* Management type */}
            <FormControl isInvalid={Boolean(errors.managementType)}>
              <FormLabel>Management Type</FormLabel>

              <Select
                name="managementType"
                value={form.managementType}
                onChange={handleManagementTypeChange}
                placeholder="Select management type"
              >
                <option value="INDIVIDUAL_CONTRIBUTOR">
                  Individual Contributor
                </option>

                <option value="PEOPLE_MANAGER">People Manager</option>
              </Select>

              <FormErrorMessage>{errors.managementType}</FormErrorMessage>
            </FormControl>

            {/* Team size */}
            {form.managementType === "PEOPLE_MANAGER" && (
              <FormControl isInvalid={Boolean(errors.teamSize)}>
                <FormLabel>Team Size</FormLabel>

                <Input
                  name="teamSize"
                  type="number"
                  min={1}
                  step={1}
                  value={form.teamSize}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                />

                <FormHelperText>
                  Number of people you directly managed.
                </FormHelperText>

                <FormErrorMessage>{errors.teamSize}</FormErrorMessage>
              </FormControl>
            )}

            {/* Reason for leaving */}
            {!form.current && (
              <FormControl>
                <FormLabel>
                  Reason for Leaving
                  <Text as="span" ml={1} color="gray.400" fontWeight="normal">
                    (optional)
                  </Text>
                </FormLabel>

                <Textarea
                  name="reasonForLeaving"
                  value={form.reasonForLeaving}
                  onChange={handleChange}
                  placeholder="Optional context for Springboard coaching."
                  rows={3}
                  resize="vertical"
                />

                <FormHelperText>
                  This is private and used only for coaching context.
                </FormHelperText>
              </FormControl>
            )}
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={saving}>
            Cancel
          </Button>

          <Button
            colorScheme="purple"
            type="submit"
            form="employment-history-form"
            isLoading={saving}
            loadingText="Saving"
          >
            {isEditing ? "Save Changes" : "Add Employment"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
