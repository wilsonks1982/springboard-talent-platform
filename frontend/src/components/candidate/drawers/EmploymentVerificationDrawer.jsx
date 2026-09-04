import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Checkbox,
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
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  lastIncrementLetterUrl: "",
  variablePayLetterUrl: "",
  relievingLetterUrl: "",
  otherSupportingDocumentUrl: "",

  reportingManagerName: "",
  reportingManagerPhone: "",
  reportingManagerEmail: "",

  hrContactName: "",
  hrContactPhone: "",
  hrContactEmail: "",

  hrContactBdDisclosureAcknowledged: false,
};

const STATUS_CONFIG = {
  NOT_VERIFIED: {
    label: "Not Verified",
    colorScheme: "gray",
  },
  PENDING: {
    label: "Verification Pending",
    colorScheme: "orange",
  },
  VERIFIED: {
    label: "Employment Verified",
    colorScheme: "green",
  },
  DISCREPANCY_FOUND: {
    label: "Discrepancy Found",
    colorScheme: "red",
  },
};

export default function EmploymentVerificationDrawer({
  isOpen,
  onClose,
  verification,
  currentlyEmployed,
  onSave,
  onTriggerVerification,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [triggering, setTriggering] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setForm({
      lastIncrementLetterUrl: verification?.lastIncrementLetterUrl || "",
      variablePayLetterUrl: verification?.variablePayLetterUrl || "",
      relievingLetterUrl: verification?.relievingLetterUrl || "",
      otherSupportingDocumentUrl:
        verification?.otherSupportingDocumentUrl || "",

      reportingManagerName: verification?.reportingManagerName || "",
      reportingManagerPhone: verification?.reportingManagerPhone || "",
      reportingManagerEmail: verification?.reportingManagerEmail || "",

      hrContactName: verification?.hrContactName || "",
      hrContactPhone: verification?.hrContactPhone || "",
      hrContactEmail: verification?.hrContactEmail || "",

      hrContactBdDisclosureAcknowledged: Boolean(
        verification?.hrContactBdDisclosureAcknowledged,
      ),
    });

    setError("");
  }, [isOpen, verification]);

  const contactProvided = useMemo(
    () =>
      Boolean(
        form.reportingManagerName.trim() ||
        form.reportingManagerPhone.trim() ||
        form.reportingManagerEmail.trim() ||
        form.hrContactName.trim() ||
        form.hrContactPhone.trim() ||
        form.hrContactEmail.trim(),
      ),
    [form],
  );

  const status =
    STATUS_CONFIG[verification?.employmentVerificationStatus || "NOT_VERIFIED"];

  const verificationAlreadyTriggered = Boolean(
    verification?.verificationTriggeredAt,
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleDisclosureChange(event) {
    setForm((current) => ({
      ...current,
      hrContactBdDisclosureAcknowledged: event.target.checked,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (contactProvided && !form.hrContactBdDisclosureAcknowledged) {
      setError(
        "Please acknowledge the disclosure before saving contact information.",
      );
      return;
    }

    try {
      setSaving(true);

      await onSave({
        ...form,
        hrContactBdDisclosureAcknowledged: contactProvided
          ? form.hrContactBdDisclosureAcknowledged
          : false,
      });

      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to save employment verification information.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleTriggerVerification() {
    setError("");

    try {
      setTriggering(true);

      await onTriggerVerification();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to trigger employment verification.",
      );
    } finally {
      setTriggering(false);
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Text fontSize="lg" fontWeight="bold">
            Employment Verification
          </Text>

          <Text mt={1} fontSize="sm" fontWeight="normal" color="gray.500">
            Private to Springboard
          </Text>
        </DrawerHeader>

        <DrawerBody overflowY="auto">
          <Stack
            as="form"
            id="employment-verification-form"
            spacing={6}
            onSubmit={handleSubmit}
          >
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Supporting Documents                                             */}
            {/* ---------------------------------------------------------------- */}

            <Box>
              <Text fontWeight="semibold">Supporting Documents</Text>

              <Text mt={1} fontSize="sm" color="gray.500">
                Documents for your current or most recent role. These are kept
                private within Springboard.
              </Text>

              <Stack mt={4} spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Last Increment Letter</FormLabel>

                  <Input
                    name="lastIncrementLetterUrl"
                    value={form.lastIncrementLetterUrl}
                    onChange={handleChange}
                    placeholder="Document reference"
                  />

                  <FormHelperText>
                    Required before your profile can be Published.
                  </FormHelperText>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Variable Pay Letter</FormLabel>

                  <Input
                    name="variablePayLetterUrl"
                    value={form.variablePayLetterUrl}
                    onChange={handleChange}
                    placeholder="Document reference"
                  />

                  <FormHelperText>
                    Required before your profile can be Published.
                  </FormHelperText>
                </FormControl>

                {currentlyEmployed == false && (
                  <FormControl isRequired>
                    <FormLabel>Relieving Letter</FormLabel>

                    <Input
                      name="relievingLetterUrl"
                      value={form.relievingLetterUrl}
                      onChange={handleChange}
                      placeholder="Document reference"
                    />

                    <FormHelperText>
                      Required because you are not currently employed.
                    </FormHelperText>
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel>Other Supporting Document</FormLabel>

                  <Input
                    name="otherSupportingDocumentUrl"
                    value={form.otherSupportingDocumentUrl}
                    onChange={handleChange}
                    placeholder="Document reference"
                  />
                </FormControl>
              </Stack>
            </Box>

            <Divider />

            {/* ---------------------------------------------------------------- */}
            {/* Verification Contacts                                            */}
            {/* ---------------------------------------------------------------- */}

            <Box>
              <Text fontWeight="semibold">Verification Contacts</Text>

              <Text mt={1} fontSize="sm" color="gray.500">
                These contacts may help Springboard verify your employment
                details.
              </Text>

              <Alert status="info" mt={4} borderRadius="md">
                <AlertIcon />
                <Text fontSize="sm">
                  We will never contact these people without your consent.
                </Text>
              </Alert>

              <Text mt={5} mb={3} fontSize="sm" fontWeight="medium">
                Reporting Manager
              </Text>

              <Stack spacing={3}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="reportingManagerName"
                    value={form.reportingManagerName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="reportingManagerPhone"
                    value={form.reportingManagerPhone}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="reportingManagerEmail"
                    type="email"
                    value={form.reportingManagerEmail}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>

              <Text mt={5} mb={3} fontSize="sm" fontWeight="medium">
                HR Contact
              </Text>

              <Stack spacing={3}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="hrContactName"
                    value={form.hrContactName}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone</FormLabel>
                  <Input
                    name="hrContactPhone"
                    value={form.hrContactPhone}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="hrContactEmail"
                    type="email"
                    value={form.hrContactEmail}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>

              {contactProvided && (
                <Checkbox
                  mt={5}
                  isChecked={form.hrContactBdDisclosureAcknowledged}
                  onChange={handleDisclosureChange}
                >
                  <Text fontSize="sm">
                    I understand that this company-level information may also
                    help Springboard identify potential hiring partners in the
                    future.
                  </Text>
                </Checkbox>
              )}
            </Box>

            <Divider />

            {/* ---------------------------------------------------------------- */}
            {/* Verification                                                     */}
            {/* ---------------------------------------------------------------- */}

            <Box>
              <Text fontWeight="semibold">Employment Verification</Text>

              <FlexStatus
                label={status.label}
                colorScheme={status.colorScheme}
              />

              {verificationAlreadyTriggered && (
                <Text mt={2} fontSize="sm" color="gray.500">
                  Verification has already been triggered.
                </Text>
              )}

              {!verificationAlreadyTriggered && (
                <Button
                  mt={4}
                  colorScheme="blue"
                  variant="outline"
                  onClick={handleTriggerVerification}
                  isLoading={triggering}
                >
                  Verify my employment
                </Button>
              )}
            </Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px">
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>

          <Button
            colorScheme="blue"
            type="submit"
            form="employment-verification-form"
            isLoading={saving}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FlexStatus({ label, colorScheme }) {
  return (
    <Box mt={3}>
      <Badge colorScheme={colorScheme}>{label}</Badge>
    </Box>
  );
}
