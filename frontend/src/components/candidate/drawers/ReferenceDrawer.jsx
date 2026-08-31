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
  VStack,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  name: "",
  relationship: "",
  contact: "",
};

export default function ReferenceDrawer({
  isOpen,
  onClose,
  onSave,
  reference,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(reference);

  useEffect(() => {
    if (!isOpen) return;

    if (reference) {
      setForm({
        name: reference.name || "",
        relationship: reference.relationship || "",
        contact: reference.contact || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError("");
    setSaving(false);
  }, [isOpen, reference]);

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
      setError("Reference name is required.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        name: form.name.trim(),
        relationship: form.relationship.trim() || null,
        contact: form.contact.trim() || null,
      });

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save reference.");
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
          {isEditing ? "Edit reference" : "Add reference"}
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
                <FormLabel>Reference name</FormLabel>

                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Kumar"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Relationship</FormLabel>

                <Input
                  name="relationship"
                  value={form.relationship}
                  onChange={handleChange}
                  placeholder="e.g. Former Manager"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Contact</FormLabel>

                <Input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Email or phone number"
                />

                <Text fontSize="xs" color="gray.500" mt={2}>
                  This information is kept private on your dashboard and is only
                  shown when editing.
                </Text>
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
              {isEditing ? "Save changes" : "Add reference"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
