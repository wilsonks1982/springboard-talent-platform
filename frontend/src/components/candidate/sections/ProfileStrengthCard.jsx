import React, { useMemo } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiArrowRight, FiCheck, FiCircle, FiTarget } from "react-icons/fi";

const LEVEL_STYLES = {
  EXCELLENT: {
    label: "Excellent",
    colorScheme: "green",
  },
  STRONG: {
    label: "Strong",
    colorScheme: "purple",
  },
  GOOD: {
    label: "Good",
    colorScheme: "blue",
  },
  GETTING_STARTED: {
    label: "Getting started",
    colorScheme: "orange",
  },
};

function getLevelStyle(level) {
  return (
    LEVEL_STYLES[level] || {
      label: level || "In progress",
      colorScheme: "gray",
    }
  );
}

function getSectionDescription(key) {
  switch (key) {
    case "BASIC_INFORMATION":
      return "Contact and personal details";

    case "EXPERIENCE":
      return "Your professional experience";

    case "EDUCATION":
      return "Your academic background";

    case "CAREER_DIRECTION":
      return "Your career goals and direction";

    case "PROFESSIONAL_PRESENCE":
      return "Your LinkedIn presence";

    default:
      return "";
  }
}

export default function ProfileStrengthCard({
  profileStrength,
  onSectionAction,
}) {
  const score = Number(profileStrength?.score || 0);
  const sections = Array.isArray(profileStrength?.sections)
    ? profileStrength.sections
    : [];

  const levelStyle = getLevelStyle(profileStrength?.level);

  const incompleteSections = useMemo(
    () => sections.filter((section) => !section.completed),
    [sections],
  );

  const completedCount = sections.length - incompleteSections.length;

  if (!profileStrength) {
    return null;
  }

  return (
    <Card
      borderRadius="2xl"
      border="1px solid"
      borderColor="gray.200"
      bg="white"
      boxShadow="0 8px 30px rgba(15, 23, 42, 0.05)"
      overflow="hidden"
    >
      <CardBody p={{ base: 5, md: 6 }}>
        <Stack spacing={5}>
          {/* Header */}
          <Flex
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            direction={{ base: "column", md: "row" }}
            gap={4}
          >
            <HStack spacing={3} align="flex-start">
              <Flex
                w="42px"
                h="42px"
                flexShrink={0}
                borderRadius="12px"
                bg="purple.50"
                color="purple.600"
                align="center"
                justify="center"
              >
                <Icon as={FiTarget} boxSize={5} />
              </Flex>

              <Box>
                <Text
                  fontSize="xs"
                  fontWeight="800"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                  color="gray.500"
                >
                  Profile strength
                </Text>

                <Text
                  mt={1}
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="800"
                  color="gray.800"
                >
                  {profileStrength.message}
                </Text>
              </Box>
            </HStack>

            <HStack spacing={3}>
              <Badge
                colorScheme={levelStyle.colorScheme}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                fontWeight="700"
                textTransform="capitalize"
              >
                {levelStyle.label}
              </Badge>

              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                lineHeight="1"
                fontWeight="800"
                color="gray.800"
              >
                {score}%
              </Text>
            </HStack>
          </Flex>

          {/* Progress */}
          <Box>
            <Flex justify="space-between" align="center" mb={2}>
              <Text fontSize="sm" color="gray.500">
                Recruiter readiness
              </Text>

              <Text fontSize="sm" fontWeight="700" color="gray.700">
                {completedCount} of {sections.length} sections complete
              </Text>
            </Flex>

            <Progress
              value={score}
              size="sm"
              borderRadius="full"
              colorScheme={levelStyle.colorScheme}
              bg="gray.100"
            />
          </Box>

          <Divider />

          {/* Section checklist */}
          <Stack spacing={1}>
            {sections.map((section) => {
              const completed = Boolean(section.completed);
              const description = getSectionDescription(section.key);

              return (
                <Flex
                  key={section.key}
                  align="center"
                  justify="space-between"
                  gap={4}
                  px={3}
                  py={3}
                  borderRadius="xl"
                  transition="background 0.15s ease"
                  _hover={{
                    bg: completed ? "gray.50" : "purple.50",
                  }}
                >
                  <HStack spacing={3} minW={0}>
                    <Flex
                      w="30px"
                      h="30px"
                      flexShrink={0}
                      borderRadius="full"
                      align="center"
                      justify="center"
                      bg={completed ? "green.50" : "gray.100"}
                      color={completed ? "green.500" : "gray.400"}
                    >
                      <Icon
                        as={completed ? FiCheck : FiCircle}
                        boxSize={completed ? 4 : 3.5}
                      />
                    </Flex>

                    <Box minW={0}>
                      <Text
                        fontSize="sm"
                        fontWeight="700"
                        color={completed ? "gray.700" : "gray.800"}
                      >
                        {section.label}
                      </Text>

                      {description && (
                        <Text
                          mt={0.5}
                          fontSize="xs"
                          color="gray.500"
                          noOfLines={1}
                        >
                          {description}
                        </Text>
                      )}
                    </Box>
                  </HStack>

                  <HStack spacing={3} flexShrink={0}>
                    <Text
                      fontSize="xs"
                      fontWeight="700"
                      color={completed ? "green.600" : "gray.500"}
                    >
                      {section.weight}%
                    </Text>

                    {!completed && onSectionAction && (
                      <Button
                        size="xs"
                        variant="ghost"
                        colorScheme="purple"
                        rightIcon={<FiArrowRight />}
                        onClick={() => onSectionAction(section.key)}
                      >
                        Complete
                      </Button>
                    )}
                  </HStack>
                </Flex>
              );
            })}
          </Stack>

          {/* Footer */}
          {incompleteSections.length > 0 ? (
            <Flex
              mt={1}
              px={4}
              py={3}
              borderRadius="xl"
              bg="purple.50"
              align={{ base: "flex-start", sm: "center" }}
              justify="space-between"
              direction={{ base: "column", sm: "row" }}
              gap={3}
            >
              <Box>
                <Text fontSize="sm" fontWeight="700" color="purple.900">
                  {incompleteSections.length}{" "}
                  {incompleteSections.length === 1 ? "section" : "sections"}{" "}
                  remaining
                </Text>

                <Text fontSize="xs" color="purple.700">
                  Complete them to strengthen your recruiter profile.
                </Text>
              </Box>

              <Button
                size="sm"
                colorScheme="purple"
                variant="solid"
                rightIcon={<FiArrowRight />}
                onClick={() => onSectionAction?.(incompleteSections[0].key)}
              >
                Continue
              </Button>
            </Flex>
          ) : (
            <Flex
              px={4}
              py={3}
              borderRadius="xl"
              bg="green.50"
              align="center"
              gap={3}
            >
              <Flex
                w="28px"
                h="28px"
                borderRadius="full"
                bg="green.100"
                color="green.600"
                align="center"
                justify="center"
              >
                <Icon as={FiCheck} boxSize={4} />
              </Flex>

              <Box>
                <Text fontSize="sm" fontWeight="700" color="green.800">
                  Your profile is complete
                </Text>

                <Text fontSize="xs" color="green.700">
                  You've covered all recruiter-readiness sections.
                </Text>
              </Box>
            </Flex>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
