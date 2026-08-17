import React from "react";
import { Box, HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  ["WELCOME", "Welcome"],
  ["ONBOARDING", "Account"],
  ["NDA", "NDA"],
  ["PRIVACY", "Privacy"],
  ["VERIFICATION", "Verify"],
  ["CONFIRMATION", "Done"],
];

export default function Progress({ current }) {
  const currentIndex = steps.findIndex(([key]) => key === current);

  return (
    <Box w="100%">
      {/* Progress Bar */}
      <Box mb={6}>
        <HStack spacing={3} w="100%">
          {steps.map(([key, label], index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isUpcoming = index > currentIndex;

            return (
              <Box key={key} flex={1}>
                <VStack spacing={2} w="100%">
                  {/* Step Circle */}
                  <HStack w="100%" spacing={2}>
                    <Box
                      w={8}
                      h={8}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg={
                        isCompleted
                          ? "green.500"
                          : isCurrent
                            ? "blue.600"
                            : "gray.200"
                      }
                      color="white"
                      fontSize="sm"
                      fontWeight="600"
                      flexShrink={0}
                    >
                      {isCompleted ? (
                        <Icon as={CheckCircle2} w={5} h={5} />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </Box>
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <Box
                        flex={1}
                        h="2px"
                        bg={isCompleted || isCurrent ? "blue.600" : "gray.200"}
                        transition="all 0.3s ease"
                      />
                    )}
                  </HStack>

                  {/* Step Label */}
                  <Text
                    fontSize="xs"
                    fontWeight={isCurrent ? "600" : "500"}
                    color={
                      isCompleted
                        ? "green.600"
                        : isCurrent
                          ? "blue.600"
                          : "gray.500"
                    }
                    transition="all 0.3s ease"
                  >
                    {label}
                  </Text>
                </VStack>
              </Box>
            );
          })}
        </HStack>
      </Box>

      {/* Step Counter */}
      <Text fontSize="xs" color="gray.500" textAlign="center">
        Step {currentIndex + 1} of {steps.length}
      </Text>
    </Box>
  );
}
