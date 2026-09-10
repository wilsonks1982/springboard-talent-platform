import React from "react";
import { Box, HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";

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
        <HStack spacing={2} w="100%" align="start">
          {steps.map(([key, label], index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isUpcoming = index > currentIndex;

            return (
              <Box key={key} flex={1}>
                <VStack spacing={2.5} w="100%">
                  {/* Step + Connector */}
                  <HStack w="100%" spacing={2} align="center">
                    {/* Step Circle */}
                    <Box
                      w={{ base: 7, md: 8 }}
                      h={{ base: 7, md: 8 }}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      bg={
                        isCompleted
                          ? "purple.600"
                          : isCurrent
                            ? "purple.700"
                            : "purple.50"
                      }
                      color={isCompleted || isCurrent ? "white" : "purple.400"}
                      border="2px solid"
                      borderColor={
                        isCompleted || isCurrent ? "purple.600" : "purple.200"
                      }
                      fontSize="xs"
                      fontWeight="800"
                      boxShadow={
                        isCurrent
                          ? "0 0 0 4px rgba(128, 90, 213, 0.12), 0 5px 14px rgba(128, 90, 213, 0.18)"
                          : isCompleted
                            ? "0 4px 10px rgba(128, 90, 213, 0.16)"
                            : "none"
                      }
                      transition="all 0.3s ease"
                    >
                      {isCompleted ? (
                        <Icon as={CheckCircle2} w={5} h={5} />
                      ) : (
                        <Text lineHeight="1">{index + 1}</Text>
                      )}
                    </Box>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <Box
                        flex={1}
                        h="2px"
                        borderRadius="full"
                        bg={
                          isCompleted
                            ? "purple.500"
                            : isCurrent
                              ? "purple.200"
                              : "gray.200"
                        }
                        position="relative"
                        overflow="hidden"
                        transition="all 0.3s ease"
                      >
                        {isCurrent && (
                          <Box
                            position="absolute"
                            left={0}
                            top={0}
                            bottom={0}
                            w="45%"
                            bgGradient="linear(to-r, purple.600, purple.400)"
                            borderRadius="full"
                          />
                        )}
                      </Box>
                    )}
                  </HStack>

                  {/* Step Label */}
                  <Text
                    fontSize={{ base: "9px", sm: "xs" }}
                    fontWeight={isCurrent || isCompleted ? "700" : "500"}
                    color={
                      isCompleted
                        ? "purple.600"
                        : isCurrent
                          ? "purple.700"
                          : "gray.500"
                    }
                    textAlign="center"
                    whiteSpace="nowrap"
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
      <HStack justify="center" spacing={2}>
        <Box
          px={3}
          py={1}
          borderRadius="full"
          bg="purple.50"
          border="1px solid"
          borderColor="purple.100"
        >
          <Text fontSize="xs" color="purple.700" fontWeight="700">
            Step {currentIndex + 1} of {steps.length}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
