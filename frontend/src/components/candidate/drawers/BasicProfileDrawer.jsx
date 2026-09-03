import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
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
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  stateCountry: "",
  linkedinUrl: "",
  currentlyEmployed: null,
  nonEmploymentReason: "",
  jobSearchStatus: "",
};

const NON_EMPLOYMENT_REASONS = [
  { value: "LAID_OFF", label: "Laid Off" },
  {
    value: "COMPANY_RESTRUCTURING",
    label: "Company Restructuring",
  },
  { value: "CAREER_BREAK", label: "Career Break" },
  { value: "SABBATICAL", label: "Sabbatical" },
  { value: "PERSONAL_REASONS", label: "Personal Reasons" },
  { value: "OTHER", label: "Other" },
];

const JOB_SEARCH_STATUSES = [
  {
    value: "ACTIVELY_LOOKING",
    label: "Actively Looking",
  },
  {
    value: "OPEN_TO_OPPORTUNITIES",
    label: "Open to Opportunities",
  },
  {
    value: "SERVING_NOTICE",
    label: "Serving Notice",
  },
];

function BasicProfileDrawer({ isOpen, onClose, profile, onSave }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      fullName: profile?.fullName || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      city: profile?.city || "",
      stateCountry: profile?.stateCountry || "",
      linkedinUrl: profile?.linkedinUrl || "",
      currentlyEmployed: profile?.currentlyEmployed ?? null,
      nonEmploymentReason: profile?.nonEmploymentReason || "",
      jobSearchStatus: profile?.jobSearchStatus || "",
    });

    setError("");
  }, [isOpen, profile]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleEmploymentChange(value) {
    const currentlyEmployed = value === "true";

    setForm((current) => ({
      ...current,
      currentlyEmployed,
      ...(currentlyEmployed
        ? {
            nonEmploymentReason: "",
          }
        : {
            jobSearchStatus: "",
          }),
    }));
  }

  function validate() {
    if (!form.fullName.trim()) {
      return "Full name is required.";
    }

    if (!form.phone.trim()) {
      return "Phone is required.";
    }

    if (!form.city.trim()) {
      return "City is required.";
    }

    if (!form.stateCountry.trim()) {
      return "State / country is required.";
    }

    if (form.currentlyEmployed === null) {
      return "Please indicate whether you are currently employed.";
    }

    if (form.currentlyEmployed === true && !form.jobSearchStatus) {
      return "Please select your current job search status.";
    }

    if (form.currentlyEmployed === false && !form.nonEmploymentReason) {
      return "Please select the reason that best describes your situation.";
    }

    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSaving(true);

    try {
      await onSave({
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        stateCountry: form.stateCountry.trim(),
        linkedinUrl: form.linkedinUrl.trim() || null,
        currentlyEmployed: form.currentlyEmployed,
        nonEmploymentReason:
          form.currentlyEmployed === false ? form.nonEmploymentReason : null,
        jobSearchStatus:
          form.currentlyEmployed === true ? form.jobSearchStatus : null,
      });

      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Unable to save your basic profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={{ base: "full", md: "md", lg: "lg" }}
    >
      <DrawerOverlay />

      <DrawerContent display="flex" flexDirection="column" overflow="hidden">
        <DrawerCloseButton />

        <DrawerHeader borderBottomWidth="1px" pr={12}>
          <Text fontSize="xl" fontWeight="700">
            Basic Profile
          </Text>

          <Text mt={1} fontSize="sm" fontWeight="400" color="gray.500">
            Keep your private profile information up to date.
          </Text>
        </DrawerHeader>

        <Box
          as="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          flex="1"
          minHeight={0}
        >
          <DrawerBody flex="1" minHeight={0} overflowY="auto">
            <Stack spacing={6}>
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Box>
                <Text fontSize="sm" fontWeight="600" color="gray.700" mb={4}>
                  Personal details
                </Text>

                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Full name</FormLabel>

                    <Input
                      value={form.fullName}
                      onChange={(event) =>
                        updateField("fullName", event.target.value)
                      }
                      placeholder="Your full name"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Email</FormLabel>

                    <Input
                      value={form.email}
                      isReadOnly
                      bg="gray.50"
                      cursor="not-allowed"
                    />

                    <FormHelperText>
                      Your login email cannot be changed here.
                    </FormHelperText>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>

                    <Input
                      value={form.phone}
                      onChange={(event) =>
                        updateField("phone", event.target.value)
                      }
                      placeholder="Your phone number"
                    />
                  </FormControl>

                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel>City</FormLabel>

                      <Input
                        value={form.city}
                        onChange={(event) =>
                          updateField("city", event.target.value)
                        }
                        placeholder="e.g. Bengaluru"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>State / Country</FormLabel>

                      <Input
                        value={form.stateCountry}
                        onChange={(event) =>
                          updateField("stateCountry", event.target.value)
                        }
                        placeholder="e.g. Karnataka, India"
                      />
                    </FormControl>
                  </SimpleGrid>

                  <FormControl>
                    <FormLabel>LinkedIn profile</FormLabel>

                    <Input
                      type="url"
                      value={form.linkedinUrl}
                      onChange={(event) =>
                        updateField("linkedinUrl", event.target.value)
                      }
                      placeholder="https://www.linkedin.com/in/..."
                    />
                  </FormControl>
                </Stack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="600" color="gray.700" mb={4}>
                  Employment situation
                </Text>

                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Are you currently employed?</FormLabel>

                    <RadioGroup
                      value={
                        form.currentlyEmployed === null
                          ? ""
                          : String(form.currentlyEmployed)
                      }
                      onChange={handleEmploymentChange}
                    >
                      <Stack
                        direction={{
                          base: "column",
                          sm: "row",
                        }}
                        spacing={6}
                      >
                        <Radio value="true">Yes</Radio>

                        <Radio value="false">No</Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>

                  {form.currentlyEmployed === true && (
                    <FormControl isRequired>
                      <FormLabel>
                        What's your current job search status?
                      </FormLabel>

                      <Select
                        placeholder="Select status"
                        value={form.jobSearchStatus}
                        onChange={(event) =>
                          updateField("jobSearchStatus", event.target.value)
                        }
                      >
                        {JOB_SEARCH_STATUSES.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {form.currentlyEmployed === false && (
                    <FormControl isRequired>
                      <FormLabel>What best describes your situation?</FormLabel>

                      <Select
                        placeholder="Select reason"
                        value={form.nonEmploymentReason}
                        onChange={(event) =>
                          updateField("nonEmploymentReason", event.target.value)
                        }
                      >
                        {NON_EMPLOYMENT_REASONS.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Stack>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px" flexShrink={0} gap={3}>
            <Button variant="ghost" onClick={onClose} isDisabled={isSaving}>
              Cancel
            </Button>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isSaving}
              loadingText="Saving"
            >
              Save changes
            </Button>
          </DrawerFooter>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}

export default BasicProfileDrawer;
