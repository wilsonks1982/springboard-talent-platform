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
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

const EMPTY_FORM = {
  currentCtc: "",
  expectedCtc: "",
  compensationVisibility: "HIDDEN",
};

const VISIBILITY_OPTIONS = [
  {
    value: "HIDDEN",
    label: "Hidden",
    description:
      "Keep your compensation private. Recruiters won't see your compensation.",
  },
  {
    value: "RANGE",
    label: "Range",
    description:
      "Recruiters can see your compensation range, but not the exact amount.",
  },
  {
    value: "EXACT",
    label: "Exact",
    description:
      "Recruiters can see your exact current and expected compensation.",
  },
];

function CandidateCompensationDrawer({
  isOpen,
  onClose,
  compensation,
  onSave,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      currentCtc:
        compensation?.currentCtc != null ? String(compensation.currentCtc) : "",
      expectedCtc:
        compensation?.expectedCtc != null
          ? String(compensation.expectedCtc)
          : "",
      compensationVisibility: compensation?.compensationVisibility || "HIDDEN",
    });

    setError("");
  }, [isOpen, compensation]);

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

    try {
      setIsSaving(true);

      await onSave({
        currentCtc:
          form.currentCtc.trim() === "" ? null : Number(form.currentCtc),

        expectedCtc:
          form.expectedCtc.trim() === "" ? null : Number(form.expectedCtc),

        compensationVisibility: form.compensationVisibility,
      });

      onClose();
    } catch (err) {
      setError(
        err?.response?.data?.message || "Unable to save compensation details.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerContent display="flex" flexDirection="column" overflow="hidden">
        <DrawerCloseButton />

        <DrawerHeader>
          Compensation
          <Text fontSize="sm" fontWeight="normal" color="gray.500" mt={1}>
            Your compensation is private by default.
          </Text>
        </DrawerHeader>

        <Box
          as="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          flex="1"
          minHeight="0"
        >
          <DrawerBody flex="1" minHeight="0" overflowY="auto">
            <Stack spacing={6}>
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <FormControl>
                <FormLabel>Current CTC</FormLabel>

                <Input
                  name="currentCtc"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.currentCtc}
                  onChange={handleChange}
                  placeholder="e.g. 3750000"
                />

                <Text fontSize="xs" color="gray.500" mt={1}>
                  Enter your annual CTC in ₹. Your range is calculated
                  automatically.
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Expected CTC</FormLabel>

                <Input
                  name="expectedCtc"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.expectedCtc}
                  onChange={handleChange}
                  placeholder="e.g. 4500000"
                />

                <Text fontSize="xs" color="gray.500" mt={1}>
                  Enter your expected annual CTC in ₹. Your range is calculated
                  automatically.
                </Text>
              </FormControl>

              <FormControl>
                <FormLabel>Who can see your compensation?</FormLabel>

                <RadioGroup
                  value={form.compensationVisibility}
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      compensationVisibility: value,
                    }))
                  }
                >
                  <Stack spacing={4}>
                    {VISIBILITY_OPTIONS.map((option) => (
                      <Box
                        key={option.value}
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                      >
                        <Radio value={option.value}>
                          <Text fontWeight="600">{option.label}</Text>
                        </Radio>

                        <Text fontSize="sm" color="gray.500" ml={6} mt={1}>
                          {option.description}
                        </Text>
                      </Box>
                    ))}
                  </Stack>
                </RadioGroup>
              </FormControl>

              <Alert status="info" borderRadius="md">
                <AlertIcon />
                <Text fontSize="sm">
                  You can change this visibility setting at any time. Your exact
                  CTC is never shown unless you explicitly choose Exact.
                </Text>
              </Alert>
            </Stack>
          </DrawerBody>

          <DrawerFooter flexShrink={0} borderTopWidth="1px" gap={3}>
            <Button variant="ghost" onClick={onClose} isDisabled={isSaving}>
              Cancel
            </Button>

            <Button type="submit" colorScheme="blue" isLoading={isSaving}>
              Save
            </Button>
          </DrawerFooter>
        </Box>
      </DrawerContent>
    </Drawer>
  );
}

export default CandidateCompensationDrawer;
