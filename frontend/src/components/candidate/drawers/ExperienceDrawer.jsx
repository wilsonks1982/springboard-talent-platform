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
  Switch,
  Textarea,
  VStack,
  Text,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  companyName: "",
  jobTitle: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export default function ExperienceDrawer({
  isOpen,
  onClose,
  onSave,
  experience,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const isEdit = Boolean(experience);

  useEffect(() => {
    if (experience) {
      setForm({
        companyName: experience.companyName || "",

        jobTitle: experience.jobTitle || "",

        startDate: experience.startDate || "",

        endDate: experience.endDate || "",

        current: experience.current || false,

        description: experience.description || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError("");
  }, [experience, isOpen]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleCurrentChange(event) {
    const checked = event.target.checked;

    setForm((current) => ({
      ...current,
      current: checked,
      endDate: checked ? "" : current.endDate,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.companyName.trim()) {
      setError("Company name is required.");
      return;
    }

    if (!form.jobTitle.trim()) {
      setError("Job title is required.");
      return;
    }

    if (
      form.startDate &&
      form.endDate &&
      !form.current &&
      form.endDate < form.startDate
    ) {
      setError("End date cannot be before start date.");
      return;
    }

    const payload = {
      companyName: form.companyName.trim(),

      jobTitle: form.jobTitle.trim(),

      startDate: form.startDate || null,

      endDate: form.current ? null : form.endDate || null,

      current: form.current,

      description: form.description.trim() || null,
    };

    try {
      setSaving(true);

      await onSave(payload, experience?.id);

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save experience.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={{ base: "full", md: "md" }}
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
          {isEdit ? "Edit experience" : "Add experience"}
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
                <FormLabel>Company</FormLabel>

                <Input
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  placeholder="e.g. ABC Technologies"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Job title</FormLabel>

                <Input
                  value={form.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Start date</FormLabel>

                <Input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => updateField("startDate", e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>End date</FormLabel>

                <Input
                  type="date"
                  value={form.endDate}
                  isDisabled={form.current}
                  onChange={(e) => updateField("endDate", e.target.value)}
                />
              </FormControl>

              <FormControl>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  py={2}
                >
                  <Box>
                    <FormLabel mb={0} fontSize="sm" fontWeight="600">
                      I currently work here
                    </FormLabel>

                    <Text fontSize="xs" color="gray.500" mt={1}>
                      We'll keep the end date empty.
                    </Text>
                  </Box>

                  <Switch
                    isChecked={form.current}
                    onChange={handleCurrentChange}
                    colorScheme="purple"
                  />
                </Box>
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>

                <Textarea
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Briefly describe your role, responsibilities and impact..."
                  rows={5}
                  resize="vertical"
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
              {isEdit ? "Save changes" : "Save experience"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
