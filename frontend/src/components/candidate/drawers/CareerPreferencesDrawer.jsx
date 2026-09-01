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
  HStack,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  desiredTitle: "",
  desiredIndustries: [],
  desiredLocations: [],
  openToRemote: "",
  noticePeriod: "",
  workAuthorization: "",
  languages: [],
};

const WORK_MODES = [
  { value: "REMOTE", label: "Remote" },
  { value: "HYBRID", label: "Hybrid" },
  { value: "ONSITE", label: "Onsite" },
  { value: "FLEXIBLE", label: "Flexible" },
];

const WORK_AUTHORIZATIONS = [
  { value: "CITIZEN", label: "Citizen" },
  { value: "PERMANENT_RESIDENT", label: "Permanent resident" },
  { value: "WORK_VISA", label: "Work visa" },
  { value: "NEEDS_SPONSORSHIP", label: "Needs sponsorship" },
  { value: "OTHER", label: "Other" },
];

function TagInput({ label, values, onChange, placeholder }) {
  const [input, setInput] = useState("");

  function addValue() {
    const value = input.trim();

    if (!value) return;

    if (values.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setInput("");
      return;
    }

    onChange([...values, value]);
    setInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addValue();
    }

    if (event.key === "Backspace" && !input && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  function removeValue(value) {
    onChange(values.filter((item) => item !== value));
  }

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>

      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="lg"
        px={3}
        py={2}
        _focusWithin={{
          borderColor: "purple.400",
          boxShadow: "0 0 0 1px var(--chakra-colors-purple-400)",
        }}
      >
        <HStack spacing={2} flexWrap="wrap" mb={values.length ? 2 : 0}>
          {values.map((value) => (
            <Tag key={value} size="md" borderRadius="full" colorScheme="purple">
              <TagLabel>{value}</TagLabel>

              <TagCloseButton onClick={() => removeValue(value)} />
            </Tag>
          ))}
        </HStack>

        <Input
          variant="unstyled"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addValue}
          placeholder={placeholder}
        />
      </Box>

      <Text fontSize="xs" color="gray.500" mt={2}>
        Press Enter to add
      </Text>
    </FormControl>
  );
}

export default function CareerPreferencesDrawer({
  isOpen,
  onClose,
  preferences,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      desiredTitle: preferences?.desiredTitle || "",
      desiredIndustries: [...(preferences?.desiredIndustries || [])],
      desiredLocations: [...(preferences?.desiredLocations || [])],
      openToRemote: preferences?.openToRemote || "",
      noticePeriod: preferences?.noticePeriod ?? "",
      workAuthorization: preferences?.workAuthorization || "",
      languages: [...(preferences?.languages || [])],
    });

    setError("");
    setSaving(false);
  }, [isOpen, preferences]);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.desiredTitle.trim()) {
      setError("Desired title is required.");
      return;
    }

    if (!form.desiredLocations.length) {
      setError("Add at least one desired location.");
      return;
    }

    if (!form.openToRemote) {
      setError("Select your preferred work arrangement.");
      return;
    }

    if (form.noticePeriod === "" || Number(form.noticePeriod) < 0) {
      setError("Enter a valid notice period.");
      return;
    }

    if (!form.workAuthorization) {
      setError("Select your work authorization.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        desiredTitle: form.desiredTitle.trim(),

        desiredIndustries: form.desiredIndustries,

        desiredLocations: form.desiredLocations,

        openToRemote: form.openToRemote,

        noticePeriod: Number(form.noticePeriod),

        workAuthorization: form.workAuthorization,

        languages: form.languages,
      });

      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save career preferences.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
    >
      <DrawerOverlay />

      <DrawerContent display="flex" flexDirection="column" overflow="hidden">
        <DrawerCloseButton />
        <DrawerHeader borderBottom="1px solid" borderColor="gray.100">
          Career Preferences
          <Text fontSize="sm" fontWeight="400" color="gray.500" mt={1}>
            Tell us what you're looking for next.
          </Text>
        </DrawerHeader>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <DrawerBody flex="1" minHeight={0} overflowY="auto">
            <VStack align="stretch" spacing={6}>
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
                <FormLabel>Desired title</FormLabel>

                <Input
                  value={form.desiredTitle}
                  onChange={(event) =>
                    updateField("desiredTitle", event.target.value)
                  }
                  placeholder="e.g. Senior Java Engineer"
                />
              </FormControl>

              <TagInput
                label="Desired industries"
                values={form.desiredIndustries}
                onChange={(values) => updateField("desiredIndustries", values)}
                placeholder="e.g. FinTech"
              />

              <TagInput
                label="Desired locations"
                values={form.desiredLocations}
                onChange={(values) => updateField("desiredLocations", values)}
                placeholder="e.g. Bengaluru"
              />

              <FormControl isRequired>
                <FormLabel>Work arrangement</FormLabel>

                <Select
                  value={form.openToRemote}
                  onChange={(event) =>
                    updateField("openToRemote", event.target.value)
                  }
                  placeholder="Select arrangement"
                >
                  {WORK_MODES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Notice period</FormLabel>

                <Input
                  type="number"
                  min={0}
                  value={form.noticePeriod}
                  onChange={(event) =>
                    updateField("noticePeriod", event.target.value)
                  }
                  placeholder="30"
                />

                <Text fontSize="xs" color="gray.500" mt={2}>
                  Number of days until you can start.
                </Text>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Work authorization</FormLabel>

                <Select
                  value={form.workAuthorization}
                  onChange={(event) =>
                    updateField("workAuthorization", event.target.value)
                  }
                  placeholder="Select authorization"
                >
                  {WORK_AUTHORIZATIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <TagInput
                label="Languages"
                values={form.languages}
                onChange={(values) => updateField("languages", values)}
                placeholder="e.g. English"
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter
            borderTop="1px solid"
            borderColor="gray.100"
            gap={3}
            flexShrink={0}
            bg="white"
          >
            <Button variant="ghost" onClick={onClose} isDisabled={saving}>
              Cancel
            </Button>

            <Button
              type="submit"
              colorScheme="purple"
              isLoading={saving}
              loadingText="Saving"
            >
              Save preferences
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
