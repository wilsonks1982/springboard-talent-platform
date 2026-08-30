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
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  educationLevel: "",
  degree: "",
  institution: "",
  fieldOfStudy: "",
  yearOfPassing: "",
};

export default function EducationDrawer({
  isOpen,
  onClose,
  onSave,
  education,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const isEdit = Boolean(education);

  useEffect(() => {
    if (education) {
      setForm({
        educationLevel: education.educationLevel || "",

        degree: education.degree || "",

        institution: education.institution || "",

        fieldOfStudy: education.fieldOfStudy || "",

        yearOfPassing: education.yearOfPassing
          ? String(education.yearOfPassing)
          : "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError("");
  }, [education, isOpen]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.educationLevel) {
      setError("Education level is required.");
      return;
    }

    if (!form.degree.trim()) {
      setError("Degree is required.");
      return;
    }

    if (!form.institution.trim()) {
      setError("Institution is required.");
      return;
    }

    const payload = {
      educationLevel: form.educationLevel,

      degree: form.degree.trim(),

      institution: form.institution.trim(),

      fieldOfStudy: form.fieldOfStudy.trim() || null,

      yearOfPassing: form.yearOfPassing ? Number(form.yearOfPassing) : null,
    };

    try {
      setSaving(true);

      await onSave(payload, education?.id);

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save education.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={{
        base: "full",
        md: "md",
      }}
    >
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader
          borderBottom="1px solid"
          borderColor="gray.100"
          fontSize="lg"
          fontWeight="700"
        >
          {isEdit ? "Edit education" : "Add education"}
        </DrawerHeader>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <DrawerBody>
            <VStack spacing={5} align="stretch">
              {error && (
                <Box
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.100"
                  borderRadius="lg"
                  px={4}
                  py={3}
                >
                  <Text fontSize="sm" color="red.600">
                    {error}
                  </Text>
                </Box>
              )}

              <FormControl isRequired>
                <FormLabel>Education level</FormLabel>

                <Select
                  placeholder="Select education level"
                  value={form.educationLevel}
                  onChange={(e) =>
                    updateField("educationLevel", e.target.value)
                  }
                >
                  <option value="HIGH_SCHOOL">High School</option>

                  <option value="DIPLOMA">Diploma</option>

                  <option value="BACHELOR">Bachelor's</option>

                  <option value="MASTER">Master's</option>

                  <option value="DOCTORATE">Doctorate</option>

                  <option value="OTHER">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Degree</FormLabel>

                <Input
                  value={form.degree}
                  onChange={(e) => updateField("degree", e.target.value)}
                  placeholder="e.g. B.Tech"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Institution</FormLabel>

                <Input
                  value={form.institution}
                  onChange={(e) => updateField("institution", e.target.value)}
                  placeholder="e.g. ABC University"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Field of study</FormLabel>

                <Input
                  value={form.fieldOfStudy}
                  onChange={(e) => updateField("fieldOfStudy", e.target.value)}
                  placeholder="e.g. Computer Science"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Year of passing</FormLabel>

                <Input
                  type="number"
                  min="1900"
                  max="2100"
                  value={form.yearOfPassing}
                  onChange={(e) => updateField("yearOfPassing", e.target.value)}
                  placeholder="e.g. 2017"
                />
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter borderTop="1px solid" borderColor="gray.100" gap={3}>
            <Button variant="ghost" onClick={onClose} isDisabled={saving}>
              Cancel
            </Button>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={saving}
              loadingText="Saving"
            >
              {isEdit ? "Save changes" : "Save education"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
