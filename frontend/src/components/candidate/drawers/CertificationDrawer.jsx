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
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  name: "",
  issuingOrganization: "",
  issueDate: "",
  expiryDate: "",
  description: "",
};

export default function CertificationDrawer({
  isOpen,
  onClose,
  onSave,
  certification,
}) {
  const [form, setForm] = useState(EMPTY_FORM);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const isEditing = Boolean(certification);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (certification) {
      setForm({
        name: certification.name || "",
        issuingOrganization: certification.issuingOrganization || "",
        issueDate: certification.issueDate || "",
        expiryDate: certification.expiryDate || "",
        description: certification.description || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError("");
    setSaving(false);
  }, [isOpen, certification]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Certification name is required.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        name: form.name.trim(),
        issuingOrganization: form.issuingOrganization.trim() || null,
        issueDate: form.issueDate || null,
        expiryDate: form.expiryDate || null,
        description: form.description.trim() || null,
      });

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save certification.");
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

        <DrawerHeader borderBottom="1px solid" borderColor="gray.100">
          {isEditing ? "Edit certification" : "Add certification"}
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
            <VStack align="stretch" spacing={5}>
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
                <FormLabel>Certification name</FormLabel>

                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. AWS Certified Solutions Architect"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Issuing organization</FormLabel>

                <Input
                  name="issuingOrganization"
                  value={form.issuingOrganization}
                  onChange={handleChange}
                  placeholder="e.g. Amazon Web Services"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Issue date</FormLabel>

                <Input
                  type="date"
                  name="issueDate"
                  value={form.issueDate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Expiry date</FormLabel>

                <Input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>

                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Briefly describe this certification"
                  rows={4}
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
              {isEditing ? "Save changes" : "Add certification"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
