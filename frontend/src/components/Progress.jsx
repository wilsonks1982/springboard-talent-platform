import React from "react";
import { Box, HStack, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";

const steps = [
  ["WELCOME", "Welcome"],
  ["ONBOARDING", "Account"],
  ["NDA", "NDA"],
  ["PRIVACY", "Privacy"],
  ["CONFIRMATION", "Done"],
];

export default function Progress({ current }) {
  const currentIndex = steps.findIndex(([key]) => key === current);

  return (
    <Box w="100%">
      {/* =====================================================
          PROGRESS STEPS
      ===================================================== */}
      <Box mb={5}>
        <HStack spacing={{ base: 1, sm: 2 }} w="100%" align="start">
          {steps.map(([key, label], index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <Box key={key} flex={1}>
                <VStack spacing={2} w="100%">
                  {/* =================================================
                      STEP MARKER + CONNECTOR
                  ================================================= */}
                  <HStack w="100%" spacing={{ base: 1, sm: 2 }} align="center">
                    {/* Step marker */}
                    <Box
                      w={{ base: 7, md: 8 }}
                      h={{ base: 7, md: 8 }}
                      minW={{ base: 7, md: 8 }}
                      minH={{ base: 7, md: 8 }}
                      borderRadius="4px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                      bg={isCompleted || isCurrent ? "brand.500" : "cream.200"}
                      color="white"
                      border="1px solid"
                      borderColor={
                        isCompleted || isCurrent ? "brand.500" : "cream.400"
                      }
                      fontSize="xs"
                      fontWeight="700"
                      boxShadow={
                        isCurrent
                          ? "0 0 0 3px rgba(200, 151, 50, 0.18)"
                          : "none"
                      }
                      transition="all 0.2s ease"
                    >
                      {isCompleted ? (
                        <Icon
                          as={CheckCircle2}
                          w={4}
                          h={4}
                          color="accent.300"
                        />
                      ) : (
                        <Text
                          lineHeight="1"
                          color={isCurrent ? "white" : "taupe.700"}
                          fontWeight="700"
                        >
                          {index + 1}
                        </Text>
                      )}
                    </Box>

                    {/* Connector */}
                    {index < steps.length - 1 && (
                      <Box
                        flex={1}
                        h="1px"
                        bg={isCompleted ? "accent.500" : "cream.300"}
                        position="relative"
                        overflow="hidden"
                      >
                        {isCurrent && (
                          <Box
                            position="absolute"
                            left={0}
                            top={0}
                            bottom={0}
                            w="45%"
                            bg="accent.500"
                          />
                        )}
                      </Box>
                    )}
                  </HStack>

                  {/* =================================================
                      STEP LABEL
                  ================================================= */}
                  <Text
                    fontSize={{
                      base: "9px",
                      sm: "10px",
                    }}
                    fontWeight={isCurrent || isCompleted ? "700" : "500"}
                    color={isCompleted || isCurrent ? "brand.500" : "taupe.500"}
                    textAlign="center"
                    whiteSpace="nowrap"
                    transition="all 0.2s ease"
                  >
                    {label}
                  </Text>
                </VStack>
              </Box>
            );
          })}
        </HStack>
      </Box>

      {/* =====================================================
          STEP COUNTER
      ===================================================== */}
      <HStack justify="center">
        <Box
          px={3}
          py={1}
          borderRadius="2px"
          bg="accent.50"
          border="1px solid"
          borderColor="accent.200"
        >
          <Text
            fontSize="10px"
            color="accent.700"
            fontWeight="700"
            letterSpacing="0.08em"
          >
            STEP {currentIndex + 1} OF {steps.length}
          </Text>
        </Box>
      </HStack>
    </Box>
  );
}
