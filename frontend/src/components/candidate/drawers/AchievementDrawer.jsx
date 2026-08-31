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
  title: "",
  description: "",
};

export default function AchievementDrawer({
  isOpen,
  onClose,
  onSave,
  achievement,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = Boolean(achievement);

  useEffect(() => {
    if (!isOpen) return;

    if (achievement) {
      setForm({
        title: achievement.title || "",
        description: achievement.description || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }

    setError("");
    setSaving(false);
  }, [isOpen, achievement]);

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

    if (!form.title.trim()) {
      setError("Achievement title is required.");
      return;
    }

    try {
      setSaving(true);

      await onSave({
        title: form.title.trim(),
        description: form.description.trim() || null,
      });

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to save achievement.");
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
          {isEditing ? "Edit achievement" : "Add achievement"}
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
                <FormLabel>Achievement title</FormLabel>

                <Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Employee of the Year"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>

                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the achievement and its impact"
                  rows={6}
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
              {isEditing ? "Save changes" : "Add achievement"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
