import React from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FiBriefcase,
  FiCheckCircle,
  FiEdit2,
  FiPlus,
  FiUsers,
} from "react-icons/fi";

/* =============================================================
   EXPERIENCE SECTION

   Springboard professional experience timeline.

   Existing behavior preserved:
   - Current roles sorted first
   - Remaining roles sorted by start date
   - Management type
   - Team size
   - Description
   - Reporting relationship
   - Add / Edit callbacks
   - Empty state
============================================================= */

/* =============================================================
   DATE FORMAT
============================================================= */

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

/* =============================================================
   MANAGEMENT LABEL
============================================================= */

function getManagementLabel(managementType) {
  if (managementType === "PEOPLE_MANAGER") {
    return "People Manager";
  }

  if (managementType === "INDIVIDUAL_CONTRIBUTOR") {
    return "Individual Contributor";
  }

  return null;
}

/* =============================================================
   EXPERIENCE ITEM
============================================================= */

function ExperienceItem({ experience, onEdit, isFirst }) {
  const managementLabel = getManagementLabel(experience.managementType);

  const isCurrent = experience.current || !experience.endDate;

  return (
    <Flex
      align="stretch"
      gap={{
        base: 4,
        md: 5,
      }}
    >
      {/* =====================================================
          TIMELINE
      ====================================================== */}

      <Flex
        direction="column"
        align="center"
        width="24px"
        flexShrink={0}
        position="relative"
      >
        <Box
          w="10px"
          h="10px"
          borderRadius="full"
          bg={isCurrent ? "accent.500" : "taupe.300"}
          border="3px solid"
          borderColor={isCurrent ? "accent.100" : "cream.200"}
          zIndex={1}
          mt="7px"
        />

        {!isFirst && (
          <Box
            position="absolute"
            top="17px"
            bottom="-24px"
            width="1px"
            bg="cream.300"
          />
        )}
      </Flex>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Box flex="1" minW={0} pb={isFirst ? 2 : 7}>
        <Flex
          justify="space-between"
          align="flex-start"
          gap={4}
          direction={{
            base: "column",
            sm: "row",
          }}
        >
          {/* =================================================
              COMPANY + ROLE
          ================================================== */}

          <HStack
            align="flex-start"
            spacing={{
              base: 3,
              md: 4,
            }}
            minW="0"
          >
            {/* Company mark */}

            <Box
              flexShrink={0}
              w={{
                base: "40px",
                md: "44px",
              }}
              h={{
                base: "40px",
                md: "44px",
              }}
              borderRadius="4px"
              bg="cream.100"
              color="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontFamily="heading"
              fontSize="md"
              fontWeight="500"
              border="1px solid"
              borderColor="cream.300"
            >
              {experience.companyName?.[0]?.toUpperCase() || "C"}
            </Box>

            {/* Role details */}

            <Box minW="0">
              <HStack spacing={2} flexWrap="wrap">
                <Text
                  fontFamily="heading"
                  fontWeight="500"
                  fontSize={{
                    base: "md",
                    md: "lg",
                  }}
                  color="brand.500"
                  lineHeight="1.3"
                >
                  {experience.jobTitle}
                </Text>

                {isCurrent && (
                  <HStack spacing={1.5} align="center">
                    <Box w="6px" h="6px" borderRadius="full" bg="success.500" />

                    <Text
                      fontSize="9px"
                      fontWeight="800"
                      color="success.700"
                      letterSpacing="0.1em"
                    >
                      CURRENT
                    </Text>
                  </HStack>
                )}
              </HStack>

              <Text mt={1} fontSize="sm" color="charcoal.700" fontWeight="600">
                {experience.companyName}
              </Text>

              <Text mt={1} fontSize="xs" color="taupe.500">
                {formatMonthYear(experience.startDate)}
                {" — "}
                {isCurrent ? "Present" : formatMonthYear(experience.endDate)}
              </Text>
            </Box>
          </HStack>

          {/* =================================================
              EDIT
          ================================================== */}

          <Button
            flexShrink={0}
            size="sm"
            variant="ghostBrand"
            borderRadius="4px"
            leftIcon={<FiEdit2 />}
            onClick={() => onEdit(experience)}
          >
            Edit
          </Button>
        </Flex>

        {/* =================================================
            ROLE METADATA
        ================================================== */}

        {(managementLabel ||
          (experience.managementType === "PEOPLE_MANAGER" &&
            experience.teamSize != null)) && (
          <HStack mt={4} spacing={3} flexWrap="wrap">
            {managementLabel && (
              <HStack
                spacing={1.5}
                borderLeft="2px solid"
                borderColor={
                  experience.managementType === "PEOPLE_MANAGER"
                    ? "accent.500"
                    : "brand.500"
                }
                pl={2}
              >
                <Text fontSize="10px" fontWeight="700" color="charcoal.700">
                  {managementLabel}
                </Text>
              </HStack>
            )}

            {experience.managementType === "PEOPLE_MANAGER" &&
              experience.teamSize != null && (
                <HStack spacing={1.5} color="taupe.500" fontSize="xs">
                  <Icon as={FiUsers} boxSize="13px" />

                  <Text>
                    {experience.teamSize}{" "}
                    {experience.teamSize === 1 ? "person" : "people"}
                  </Text>
                </HStack>
              )}
          </HStack>
        )}

        {/* =================================================
            DESCRIPTION
        ================================================== */}

        {experience.description && (
          <Text
            mt={4}
            fontSize="sm"
            lineHeight="1.75"
            color="charcoal.700"
            maxW="760px"
          >
            {experience.description}
          </Text>
        )}

        {/* =================================================
            REPORTING RELATIONSHIP
        ================================================== */}

        {experience.reportedToTitle && (
          <HStack mt={4} spacing={2}>
            <Text
              fontSize="10px"
              fontWeight="700"
              color="taupe.400"
              textTransform="uppercase"
              letterSpacing="0.08em"
            >
              Reports to
            </Text>

            <Text fontSize="xs" fontWeight="600" color="taupe.600">
              {experience.reportedToTitle}
            </Text>
          </HStack>
        )}
      </Box>
    </Flex>
  );
}

/* =============================================================
   EXPERIENCE SECTION
============================================================= */

export default function ExperienceSection({
  experiences = [],
  onAdd,
  onEdit,
  onDelete,
}) {
  const sortedExperiences = [...experiences].sort((a, b) => {
    const aCurrent = a.current || !a.endDate;

    const bCurrent = b.current || !b.endDate;

    if (aCurrent && !bCurrent) {
      return -1;
    }

    if (!aCurrent && bCurrent) {
      return 1;
    }

    return new Date(b.startDate || 0) - new Date(a.startDate || 0);
  });

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="cream.300"
      borderRadius="6px"
      overflow="hidden"
      boxShadow="0 5px 20px rgba(46, 42, 40, 0.035)"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <Box
        p={{
          base: 5,
          md: 6,
        }}
      >
        <Flex
          justify="space-between"
          align={{
            base: "flex-start",
            sm: "center",
          }}
          gap={4}
        >
          <HStack spacing={3} align="flex-start">
            <Box
              w="38px"
              h="38px"
              borderRadius="4px"
              bg="accent.50"
              border="1px solid"
              borderColor="accent.200"
              color="accent.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={FiBriefcase} boxSize="17px" />
            </Box>

            <Box>
              <Text
                fontFamily="heading"
                fontSize={{
                  base: "lg",
                  md: "xl",
                }}
                fontWeight="500"
                color="brand.500"
              >
                Experience
              </Text>

              <Text mt={1} fontSize="sm" color="taupe.500">
                Your professional journey
              </Text>
            </Box>
          </HStack>

          <Button
            size="sm"
            variant="outlineGold"
            borderRadius="4px"
            leftIcon={<FiPlus />}
            onClick={onAdd}
            flexShrink={0}
          >
            Add Experience
          </Button>
        </Flex>
      </Box>

      <Divider borderColor="cream.300" />

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}

      {sortedExperiences.length === 0 ? (
        <Box
          mx={{
            base: 5,
            md: 6,
          }}
          my={{
            base: 5,
            md: 6,
          }}
          py={{
            base: 9,
            md: 10,
          }}
          px={5}
          textAlign="center"
          border="1px dashed"
          borderColor="cream.400"
          bg="cream.50"
        >
          <Box
            mx="auto"
            w="48px"
            h="48px"
            borderRadius="4px"
            bg="accent.50"
            border="1px solid"
            borderColor="accent.200"
            color="accent.600"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FiBriefcase} boxSize="20px" />
          </Box>

          <Text
            mt={4}
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
          >
            Your professional journey starts here
          </Text>

          <Text
            mt={2}
            fontSize="sm"
            color="taupe.600"
            maxW="460px"
            mx="auto"
            lineHeight="1.7"
          >
            Add your work experience to build a stronger career story and
            showcase your professional growth.
          </Text>

          <Button
            mt={5}
            size="sm"
            variant="solid"
            borderRadius="4px"
            leftIcon={<FiPlus />}
            onClick={onAdd}
          >
            Add your first role
          </Button>
        </Box>
      ) : (
        <Box
          px={{
            base: 5,
            md: 6,
          }}
          py={{
            base: 6,
            md: 7,
          }}
        >
          {/* =================================================
              JOURNEY INDICATOR
          ================================================== */}

          <HStack mb={6} spacing={2} color="taupe.500" fontSize="xs">
            <Icon as={FiCheckCircle} color="success.600" boxSize="14px" />

            <Text>
              {sortedExperiences.length}{" "}
              {sortedExperiences.length === 1 ? "role" : "roles"} in your
              professional journey
            </Text>
          </HStack>

          {/* =================================================
              TIMELINE
          ================================================== */}

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
