import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

const steps = [
  ["WELCOME", "Welcome"],
  ["ONBOARDING", "Get Started"],
  ["NDA", "NDA"],
  ["PRIVACY", "Privacy"],
  ["VERIFICATION", "Verification"],
  ["CONFIRMATION", "Done"],
];

export default function Progress({ current }) {
  const index = steps.findIndex(([key]) => key === current);

  return (
    <HStack spacing={2} width="100%">
      {steps.map(([key, label], i) => (
        <VStack key={key} flex={1} spacing={1}>
          <Box
            h="5px"
            w="100%"
            borderRadius="full"
            bg={i <= index ? "blue.600" : "gray.200"}
          />
          <Text fontSize="xs" color={i <= index ? "blue.700" : "gray.500"}>
            {label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}
