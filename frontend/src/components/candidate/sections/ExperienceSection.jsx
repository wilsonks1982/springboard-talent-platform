import React from "react";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiBriefcase, FiEdit2, FiPlus, FiUsers } from "react-icons/fi";

function formatMonthYear(value) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function getManagementLabel(managementType) {
  if (managementType === "PEOPLE_MANAGER") {
    return "People Manager";
  }

  if (managementType === "INDIVIDUAL_CONTRIBUTOR") {
    return "Individual Contributor";
  }

  return null;
}

function ExperienceItem({ experience, onEdit }) {
  const managementLabel = getManagementLabel(experience.managementType);

  const isCurrent = experience.current || !experience.endDate;

  return (
    <Box>
      <Flex justify="space-between" align="flex-start" gap={4}>
        <HStack align="flex-start" spacing={4} minW={0}>
          {/* Company avatar */}
          <Box
            flexShrink={0}
            w="44px"
            h="44px"
            borderRadius="xl"
            bg="purple.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontWeight="800"
            fontSize="md"
            color="purple.600"
          >
            {experience.companyName?.[0]?.toUpperCase() || "C"}
          </Box>

          <Box minW={0}>
            <Text
              fontWeight="700"
              fontSize={{ base: "sm", md: "md" }}
              color="gray.800"
            >
              {experience.jobTitle}
            </Text>

            <Text mt={1} fontSize="sm" color="gray.600" fontWeight="500">
              {experience.companyName}
            </Text>

            <Text mt={1} fontSize="xs" color="gray.500">
              {formatMonthYear(experience.startDate)}
              {" — "}
              {isCurrent ? "Present" : formatMonthYear(experience.endDate)}
            </Text>

            {managementLabel && (
              <HStack mt={3} spacing={2}>
                <Badge
                  colorScheme={
                    experience.managementType === "PEOPLE_MANAGER"
                      ? "blue"
                      : "purple"
                  }
                  variant="subtle"
                  borderRadius="full"
                  px={2.5}
                  py={1}
                  fontSize="xs"
                >
                  {managementLabel}
                </Badge>

                {experience.managementType === "PEOPLE_MANAGER" &&
                  experience.teamSize != null && (
                    <HStack spacing={1} color="gray.500" fontSize="xs">
                      <Icon as={FiUsers} />
                      <Text>
                        {experience.teamSize}{" "}
                        {experience.teamSize === 1 ? "person" : "people"}
                      </Text>
                    </HStack>
                  )}
              </HStack>
            )}

            {experience.description && (
              <Text
                mt={3}
                fontSize="sm"
                lineHeight="1.6"
                color="gray.600"
                maxW="720px"
              >
                {experience.description}
              </Text>
            )}

            {experience.reportedToTitle && (
              <Text mt={3} fontSize="xs" color="gray.500">
                Reports to{" "}
                <Text as="span" fontWeight="600" color="gray.600">
                  {experience.reportedToTitle}
                </Text>
              </Text>
            )}
          </Box>
        </HStack>

        <Button
          flexShrink={0}
          size="sm"
          variant="ghost"
          colorScheme="purple"
          leftIcon={<FiEdit2 />}
          onClick={() => onEdit(experience)}
        >
          Edit
        </Button>
      </Flex>
    </Box>
  );
}

export default function ExperienceSection({
  experiences = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderColor="gray.100"
      borderRadius="2xl"
      p={{ base: 5, md: 6 }}
      boxShadow="sm"
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={5}>
        <HStack spacing={3}>
          <Box
            w="38px"
            h="38px"
            borderRadius="lg"
            bg="purple.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiBriefcase} color="purple.600" />
          </Box>

          <Box>
            <Text fontWeight="700" color="gray.800">
              Experience
            </Text>

            <Text fontSize="xs" color="gray.500">
              Your professional journey
            </Text>
          </Box>
        </HStack>

        <Button
          size="sm"
          colorScheme="purple"
          variant="ghost"
          leftIcon={<FiPlus />}
          onClick={onAdd}
        >
          Add Experience
        </Button>
      </Flex>

      {/* Empty state */}
      {experiences.length === 0 ? (
        <Box
          py={10}
          textAlign="center"
          borderWidth="1px"
          borderStyle="dashed"
          borderColor="gray.200"
          borderRadius="xl"
        >
          <Icon as={FiBriefcase} boxSize={8} color="gray.300" mb={3} />

          <Text fontWeight="600" color="gray.700">
            Your professional journey starts here.
          </Text>

          <Text mt={1} fontSize="sm" color="gray.500">
            Add your work experience to build your career story.
          </Text>

          <Button mt={4} size="sm" colorScheme="purple" onClick={onAdd}>
            Add your first role
          </Button>
        </Box>
      ) : (
        <Stack spacing={5}>
          {experiences.map((experience, index) => (
            <React.Fragment key={experience.id}>
              {index > 0 && <Divider />}

              <ExperienceItem experience={experience} onEdit={onEdit} />
            </React.Fragment>
          ))}
        </Stack>
      )}
    </Box>
  );
}
