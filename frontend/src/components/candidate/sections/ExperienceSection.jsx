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
  VStack,
} from "@chakra-ui/react";
import {
  FiBriefcase,
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiUsers,
} from "react-icons/fi";

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

function ExperienceItem({ experience, onEdit, isFirst }) {
  const managementLabel = getManagementLabel(experience.managementType);

  const isCurrent = experience.current || !experience.endDate;

  return (
    <Flex align="stretch" gap={{ base: 4, md: 5 }}>
      {/* Timeline */}
      <Flex
        direction="column"
        align="center"
        width="28px"
        flexShrink={0}
        position="relative"
      >
        <Box
          w="12px"
          h="12px"
          borderRadius="full"
          bg={isCurrent ? "purple.500" : "gray.300"}
          border="3px solid"
          borderColor={isCurrent ? "purple.100" : "gray.100"}
          zIndex={1}
          mt="6px"
        />

        <Box
          position="absolute"
          top="18px"
          bottom="-24px"
          width="1px"
          bg="gray.200"
        />
      </Flex>

      {/* Content */}
      <Box flex="1" minW={0} pb={isFirst ? 6 : 1}>
        <Flex
          justify="space-between"
          align="flex-start"
          gap={4}
          direction={{ base: "column", sm: "row" }}
        >
          <HStack align="flex-start" spacing={4} minW={0}>
            {/* Company avatar */}
            <Box
              flexShrink={0}
              w={{ base: "42px", md: "46px" }}
              h={{ base: "42px", md: "46px" }}
              borderRadius="xl"
              bg="purple.50"
              color="purple.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontWeight="800"
              fontSize="md"
              border="1px solid"
              borderColor="purple.100"
            >
              {experience.companyName?.[0]?.toUpperCase() || "C"}
            </Box>

            <Box minW={0}>
              <HStack spacing={2} flexWrap="wrap">
                <Text
                  fontWeight="800"
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.800"
                  lineHeight="1.3"
                >
                  {experience.jobTitle}
                </Text>

                {isCurrent && (
                  <Badge
                    colorScheme="green"
                    borderRadius="full"
                    px={2}
                    py={0.5}
                    fontSize="9px"
                    fontWeight="700"
                  >
                    CURRENT
                  </Badge>
                )}
              </HStack>

              <Text mt={1} fontSize="sm" color="gray.600" fontWeight="600">
                {experience.companyName}
              </Text>

              <Text mt={1} fontSize="xs" color="gray.500">
                {formatMonthYear(experience.startDate)}
                {" — "}
                {isCurrent ? "Present" : formatMonthYear(experience.endDate)}
              </Text>
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

        {/* Role metadata */}
        {(managementLabel ||
          (experience.managementType === "PEOPLE_MANAGER" &&
            experience.teamSize != null)) && (
          <HStack mt={4} spacing={2} flexWrap="wrap">
            {managementLabel && (
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
            )}

            {experience.managementType === "PEOPLE_MANAGER" &&
              experience.teamSize != null && (
                <HStack spacing={1} color="gray.500" fontSize="xs" px={1}>
                  <Icon as={FiUsers} boxSize={3.5} />
                  <Text>
                    {experience.teamSize}{" "}
                    {experience.teamSize === 1 ? "person" : "people"}
                  </Text>
                </HStack>
              )}
          </HStack>
        )}

        {/* Description */}
        {experience.description && (
          <Text
            mt={4}
            fontSize="sm"
            lineHeight="1.7"
            color="gray.600"
            maxW="760px"
          >
            {experience.description}
          </Text>
        )}

        {/* Reporting relationship */}
        {experience.reportedToTitle && (
          <HStack mt={4} spacing={2}>
            <Text fontSize="xs" color="gray.400">
              Reports to
            </Text>

            <Text fontSize="xs" fontWeight="700" color="gray.600">
              {experience.reportedToTitle}
            </Text>
          </HStack>
        )}
      </Box>
    </Flex>
  );
}

export default function ExperienceSection({
  experiences = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aCurrent = a.current || !a.endDate;
    const bCurrent = b.current || !b.endDate;

    if (aCurrent && !bCurrent) return -1;
    if (!aCurrent && bCurrent) return 1;

    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="0 4px 20px rgba(15, 23, 42, 0.04)"
    >
      {/* Header */}
      <Box p={{ base: 5, md: 6 }}>
        <Flex
          justify="space-between"
          align={{ base: "flex-start", sm: "center" }}
          gap={4}
        >
          <HStack spacing={3} align="flex-start">
            <Box
              w="40px"
              h="40px"
              borderRadius="xl"
              bg="purple.50"
              color="purple.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={FiBriefcase} boxSize={5} />
            </Box>

            <Box>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="800"
                color="gray.900"
              >
                Experience
              </Text>

              <Text mt={1} fontSize="sm" color="gray.500">
                Your professional journey
              </Text>
            </Box>
          </HStack>

          <Button
            size="sm"
            colorScheme="purple"
            variant="outline"
            leftIcon={<FiPlus />}
            onClick={onAdd}
            flexShrink={0}
          >
            Add Experience
          </Button>
        </Flex>
      </Box>

      <Divider />

      {/* Empty state */}
      {sortedExperiences.length === 0 ? (
        <Box
          mx={{ base: 5, md: 6 }}
          my={{ base: 5, md: 6 }}
          py={10}
          px={5}
          textAlign="center"
          border="1px dashed"
          borderColor="gray.200"
          borderRadius="xl"
          bg="gray.50"
        >
          <Box
            mx="auto"
            w="52px"
            h="52px"
            borderRadius="2xl"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiBriefcase} boxSize={6} color="gray.400" />
          </Box>

          <Text mt={4} fontWeight="700" color="gray.700">
            Your professional journey starts here
          </Text>

          <Text
            mt={1}
            fontSize="sm"
            color="gray.500"
            maxW="420px"
            mx="auto"
            lineHeight="1.6"
          >
            Add your work experience to build a stronger career story and
            showcase your professional growth.
          </Text>

          <Button
            mt={5}
            size="sm"
            colorScheme="purple"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first role
          </Button>
        </Box>
      ) : (
        <Box px={{ base: 5, md: 6 }} py={{ base: 6, md: 7 }}>
          {/* Career journey indicator */}
          <HStack mb={6} spacing={2} color="gray.500" fontSize="xs">
            <Icon as={FiCheckCircle} color="green.500" />
            <Text>
              {sortedExperiences.length}{" "}
              {sortedExperiences.length === 1 ? "role" : "roles"} in your
              professional journey
            </Text>
          </HStack>

          <Stack spacing={0}>
            {sortedExperiences.map((experience, index) => (
              <ExperienceItem
                key={experience.id}
                experience={experience}
                onEdit={onEdit}
                isFirst={index === sortedExperiences.length - 1}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
