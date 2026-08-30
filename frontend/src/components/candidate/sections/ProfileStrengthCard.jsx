import React, { useMemo } from "react";

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Progress,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { FiArrowRight, FiCheck, FiCircle } from "react-icons/fi";

function getSectionAction(key) {
  const actions = {
    BASIC_INFORMATION: "Update information",
    EXPERIENCE: "Add experience",
    EDUCATION: "Add education",
    RESUME: "Add resume",
    CAREER_DIRECTION: "Complete career direction",
    PROFESSIONAL_PRESENCE: "Add LinkedIn",
  };

  return actions[key] || "Complete";
}

export default function ProfileStrengthCard({
  profileStrength,
  onSectionAction,
}) {
  const incompleteSection = useMemo(
    () => profileStrength?.sections?.find((section) => !section.completed),
    [profileStrength],
  );

  if (!profileStrength) {
    return null;
  }

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.100"
      borderRadius="2xl"
      p={{
        base: 5,
        md: 7,
      }}
    >
      <Flex
        direction={{
          base: "column",
          lg: "row",
        }}
        gap={8}
        align={{
          base: "stretch",
          lg: "center",
        }}
      >
        {/* Score */}

        <Box
          minW={{
            base: "full",
            lg: "180px",
          }}
          textAlign="center"
        >
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="0.08em"
            color="gray.400"
            textTransform="uppercase"
            mb={3}
          >
            Profile Strength
          </Text>

          <Text
            fontSize={{
              base: "5xl",
              md: "6xl",
            }}
            lineHeight="1"
            fontWeight="800"
            color="purple.600"
          >
            {profileStrength.score}%
          </Text>

          <Badge mt={3} colorScheme="purple" borderRadius="full" px={3} py={1}>
            {profileStrength.level.replaceAll("_", " ")}
          </Badge>
        </Box>

        {/* Details */}

        <Box flex="1">
          <Text fontSize="lg" fontWeight="700" color="gray.800">
            {profileStrength.message}
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Complete your profile to make it easier for recruiters to understand
            your experience.
          </Text>

          <Progress
            value={profileStrength.score}
            size="sm"
            borderRadius="full"
            mt={5}
            bg="gray.100"
            colorScheme="purple"
          />

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
            spacing={3}
            mt={5}
          >
            {profileStrength.sections.map((section) => (
              <HStack
                key={section.key}
                spacing={3}
                cursor={section.completed ? "default" : "pointer"}
                onClick={() => {
                  if (!section.completed && onSectionAction) {
                    onSectionAction(section.key);
                  }
                }}
              >
                <Box
                  w="22px"
                  h="22px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={section.completed ? "green.50" : "gray.50"}
                  color={section.completed ? "green.500" : "gray.400"}
                >
                  {section.completed ? (
                    <FiCheck size={12} />
                  ) : (
                    <FiCircle size={10} />
                  )}
                </Box>

                <Text
                  fontSize="sm"
                  color={section.completed ? "gray.600" : "gray.700"}
                  fontWeight={section.completed ? "400" : "600"}
                >
                  {section.label}
                </Text>

                {!section.completed && (
                  <Text fontSize="xs" color="purple.500" ml="auto">
                    {getSectionAction(section.key)}
                  </Text>
                )}
              </HStack>
            ))}
          </SimpleGrid>

          {incompleteSection && (
            <Button
              mt={6}
              size="sm"
              variant="ghost"
              colorScheme="purple"
              rightIcon={<FiArrowRight />}
              onClick={() => {
                if (onSectionAction) {
                  onSectionAction(incompleteSection.key);
                }
              }}
            >
              Continue building your profile
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
