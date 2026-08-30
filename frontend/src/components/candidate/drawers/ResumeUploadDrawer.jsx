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

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeUploadDrawer({ isOpen, onClose, onSave }) {
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFile(null);
      setError("");
      setSaving(false);
    }
  }, [isOpen]);

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setFile(null);

      setError("Only PDF resumes are supported.");

      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);

      setError("Resume file must not exceed 5 MB.");

      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!file) {
      setError("Please select a PDF resume.");

      return;
    }

    try {
      setSaving(true);

      await onSave(file);

      onClose();
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to upload resume.");
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

        <DrawerHeader borderBottom="1px solid" borderColor="gray.100">
          Upload resume
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
            <VStack align="stretch" spacing={6}>
              <Box>
                <Text fontSize="sm" color="gray.600" lineHeight="1.7">
                  Upload your latest resume. Your existing resume will be
                  replaced if one already exists.
                </Text>
              </Box>

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
                <FormLabel>Resume</FormLabel>

                <Input
                  type="file"
                  accept="application/pdf,.pdf"
                  p={1.5}
                  onChange={handleFileChange}
                />

                <Text fontSize="xs" color="gray.400" mt={2}>
                  PDF only · Maximum 5 MB
                </Text>
              </FormControl>

              {file && (
                <Box bg="purple.50" borderRadius="xl" p={4}>
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                    color="purple.700"
                    noOfLines={1}
                  >
                    {file.name}
                  </Text>

                  <Text fontSize="xs" color="purple.500" mt={1}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </Box>
              )}
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
              loadingText="Uploading"
            >
              Upload resume
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
