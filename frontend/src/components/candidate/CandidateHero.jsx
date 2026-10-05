import React, { useMemo } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FiBriefcase,
  FiEdit3,
  FiExternalLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiShield,
} from "react-icons/fi";

/* =============================================================
   CANDIDATE HERO

   Springboard candidate identity / professional summary.

   Responsibilities:
   - Candidate identity
   - Current professional position
   - Location
   - Professional pitch
   - Contact details
   - Experience summary
   - Employment status
   - LinkedIn
   - Basic profile edit action

   Existing business logic and callback contracts preserved.
============================================================= */

export default function CandidateHero({
  candidate,
  profileStrength,
  completion = 0,
  basicProfile,
  onEditProfile,
  onEditBasicProfile,
}) {
  const fullName = basicProfile?.fullName || "Your Name";

  /* =========================================================
     INITIALS
  ========================================================== */

  const initials = useMemo(() => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [fullName]);

  /* =========================================================
     CURRENT EXPERIENCE
  ========================================================== */

  const currentExperience = useMemo(() => {
    const experiences = candidate?.experiences || [];

    if (!experiences.length) {
      return null;
    }

    return [...experiences].sort((a, b) => {
      const aCurrent = a.current || a.isCurrent;

      const bCurrent = b.current || b.isCurrent;

      if (aCurrent && !bCurrent) {
        return -1;
      }

      if (!aCurrent && bCurrent) {
        return 1;
      }

      return new Date(b.startDate || 0) - new Date(a.startDate || 0);
    })[0];
  }, [candidate?.experiences]);

  /* =========================================================
     YEARS OF EXPERIENCE

     Overlapping employment periods are merged so concurrent
     roles are not counted twice.
  ========================================================== */

  const yearsOfExperience = useMemo(() => {
    const experiences = candidate?.experiences || [];

    if (!experiences.length) {
      return 0;
    }

    const ranges = experiences
      .map((experience) => {
        const start = new Date(experience.startDate);

        if (Number.isNaN(start.getTime())) {
          return null;
        }

        const end =
          experience.current || experience.isCurrent || !experience.endDate
            ? new Date()
            : new Date(experience.endDate);

        if (Number.isNaN(end.getTime()) || end <= start) {
          return null;
        }

        return {
          start,
          end,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.start - b.start);

    if (!ranges.length) {
      return 0;
    }

    const merged = [];

    ranges.forEach((range) => {
      const last = merged[merged.length - 1];

      if (!last || range.start > last.end) {
        merged.push({
          ...range,
        });

        return;
      }

      if (range.end > last.end) {
        last.end = range.end;
      }
    });

    const totalMonths = merged.reduce((total, range) => {
      const months =
        (range.end.getFullYear() - range.start.getFullYear()) * 12 +
        (range.end.getMonth() - range.start.getMonth());

      return total + Math.max(0, months);
    }, 0);

    return Math.round((totalMonths / 12) * 10) / 10;
  }, [candidate?.experiences]);

  /* =========================================================
     DERIVED DISPLAY DATA
  ========================================================== */

  const professionalTitle =
    currentExperience?.jobTitle ||
    candidate?.functionalArea ||
    candidate?.user?.employmentSituation ||
    "Professional";

  const companyName =
    currentExperience?.companyName || currentExperience?.employerName || "";

  const location =
    candidate?.user?.location ||
    candidate?.location ||
    [basicProfile?.city, basicProfile?.stateCountry].filter(Boolean).join(", ");

  const pitch =
    candidate?.plainLanguagePitch ||
    "Build a stronger professional profile and let Springboard understand where you can create the most value.";

  const strength =
    profileStrength?.percentage ?? profileStrength?.score ?? completion ?? 0;

  const normalizedStrength = Math.min(100, Math.max(0, Number(strength) || 0));

  const basicLocation = [basicProfile?.city, basicProfile?.stateCountry]
    .filter(Boolean)
    .join(", ");

  const linkedinUrl =
    candidate?.linkedinUrl ||
    candidate?.linkedinProfileUrl ||
    candidate?.user?.linkedinUrl ||
    candidate?.user?.linkedinProfileUrl ||
    "";

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="white"
      border="1px solid"
      borderColor="cream.300"
      borderRadius="6px"
      boxShadow="0 6px 22px rgba(46, 42, 40, 0.04)"
    >
      {/* =====================================================
          EDITORIAL ACCENT
      ====================================================== */}

      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="3px"
        bg="brand.500"
      />

      <Box
        position="relative"
        p={{
          base: 5,
          md: 7,
          xl: 8,
        }}
      >
        {/* ===================================================
            TOP IDENTITY
        ==================================================== */}

        <Flex
          direction={{
            base: "column",
            md: "row",
          }}
          align={{
            base: "stretch",
            md: "flex-start",
          }}
          justify="space-between"
          gap={{
            base: 6,
            md: 8,
          }}
        >
          {/* =================================================
              IDENTITY
          ================================================== */}

          <HStack
            align="flex-start"
            spacing={{
              base: 4,
              md: 5,
            }}
            flex="1"
            minW="0"
          >
            {/* Avatar */}

            <Avatar
              size={{
                base: "lg",
                md: "xl",
              }}
              name={fullName}
              bg="brand.500"
              color="white"
              fontWeight="600"
              getInitials={() => initials}
              flexShrink={0}
            />

            <Stack spacing={2} minW="0">
              {/* Status */}

              <HStack spacing={3} flexWrap="wrap">
                <HStack
                  spacing={1.5}
                  color="taupe.500"
                  fontSize="10px"
                  display={{
                    base: "none",
                    sm: "flex",
                  }}
                >
                  <Icon as={FiShield} boxSize="13px" color="accent.600" />

                  <Text>Professional profile</Text>
                </HStack>
              </HStack>

              {/* Name */}

              <Text
                fontFamily="heading"
                fontSize={{
                  base: "2xl",
                  md: "3xl",
                  xl: "4xl",
                }}
                fontWeight="500"
                color="brand.500"
                lineHeight="1.12"
                letterSpacing="-0.015em"
              >
                {fullName}
              </Text>

              {/* Professional title */}

              <HStack
                spacing={2}
                flexWrap="wrap"
                color="charcoal.700"
                fontSize={{
                  base: "sm",
                  md: "md",
                }}
              >
                <HStack spacing={2}>
                  <Icon as={FiBriefcase} boxSize="15px" color="accent.600" />

                  <Text fontWeight="600">{professionalTitle}</Text>
                </HStack>

                {companyName && (
                  <>
                    <Text color="cream.500">/</Text>

                    <Text color="taupe.600">{companyName}</Text>
                  </>
                )}
              </HStack>

              {/* Location */}

              {location && (
                <HStack spacing={1.5} color="taupe.500" fontSize="sm">
                  <Icon as={FiMapPin} boxSize="14px" />

                  <Text>{location}</Text>
                </HStack>
              )}
            </Stack>
          </HStack>
        </Flex>

        {/* ===================================================
            PROFESSIONAL PITCH
        ==================================================== */}

        <Box
          mt={{
            base: 6,
            md: 7,
          }}
          pl={{
            base: 0,
            md: "84px",
          }}
        >
          <Box
            borderLeft="2px solid"
            borderColor="accent.500"
            pl={4}
            maxW="780px"
          >
            <Text
              fontFamily="heading"
              fontSize={{
                base: "md",
                md: "lg",
              }}
              fontStyle="italic"
              color="charcoal.700"
              lineHeight="1.7"
            >
              {pitch}
            </Text>
          </Box>
        </Box>

        {/* ===================================================
            DETAILS
        ==================================================== */}

        <Flex
          mt={6}
          pl={{
            base: 0,
            md: "84px",
          }}
          gap={{
            base: 3,
            md: 5,
          }}
          flexWrap="wrap"
          align="center"
        >
          {basicProfile?.phone && (
            <DetailItem icon={FiPhone} value={basicProfile.phone} />
          )}

          {basicProfile?.email && (
            <DetailItem icon={FiMail} value={basicProfile.email} truncate />
          )}

          {basicLocation && !location && (
            <DetailItem icon={FiMapPin} value={basicLocation} />
          )}

          {yearsOfExperience > 0 && (
            <DetailItem
              icon={FiBriefcase}
              value={
                <>
                  <Text as="span" fontWeight="700" color="charcoal.800">
                    {yearsOfExperience}
                  </Text>{" "}
                  {yearsOfExperience === 1 ? "year" : "years"} experience
                </>
              }
            />
          )}

          {basicProfile?.currentlyEmployed != null && (
            <HStack spacing={2}>
              <Box
                w="6px"
                h="6px"
                borderRadius="full"
                bg={
                  basicProfile.currentlyEmployed ? "success.500" : "accent.500"
                }
              />

              <Text fontSize="xs" color="taupe.600">
                {basicProfile.currentlyEmployed
                  ? "Currently employed"
                  : "Not currently employed"}
              </Text>
            </HStack>
          )}

          {linkedinUrl && (
            <Button
              as="a"
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="xs"
              variant="outlineGold"
              borderRadius="4px"
              leftIcon={<FiExternalLink />}
            >
              LinkedIn
            </Button>
          )}

          <Button
            size="xs"
            variant="ghostBrand"
            borderRadius="4px"
            leftIcon={<FiEdit3 />}
            onClick={onEditBasicProfile}
          >
            Edit details
          </Button>
        </Flex>

        {/* ===================================================
            FOOTER DIVIDER
        ==================================================== */}

        <Divider mt={7} borderColor="cream.300" />

        <Flex
          pt={4}
          justify="space-between"
          align="center"
          gap={4}
          flexWrap="wrap"
        >
          <Text
            fontSize="9px"
            fontWeight="800"
            letterSpacing="0.13em"
            color="taupe.500"
            textTransform="uppercase"
          >
            Springboard professional profile
          </Text>

          <Text fontSize="xs" color="taupe.500">
            Your potential. Your platform.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

/* =============================================================
   PROFILE STRENGTH
============================================================= */

function ProfileStrength({ value }) {
  return (
    <Box
      w={{
        base: "100%",
        md: "190px",
      }}
      flexShrink={0}
      borderLeft={{
        base: "0",
        md: "1px solid",
      }}
      borderTop={{
        base: "1px solid",
        md: "0",
      }}
      borderColor="cream.300"
      pl={{
        base: 0,
        md: 6,
      }}
      pt={{
        base: 4,
        md: 0,
      }}
    >
      <HStack justify="space-between" mb={2}>
        <Text
          fontSize="9px"
          fontWeight="800"
          letterSpacing="0.13em"
          color="taupe.500"
        >
          PROFILE STRENGTH
        </Text>

        <Text
          fontFamily="heading"
          fontSize="md"
          fontWeight="500"
          color="brand.500"
        >
          {value}%
        </Text>
      </HStack>

      <Progress
        value={value}
        size="xs"
        borderRadius="0"
        bg="cream.200"
        sx={{
          "& > div": {
            background: "linear-gradient(90deg, #601230 0%, #C89732 100%)",
          },
        }}
      />

      <Text mt={2} fontSize="10px" color="taupe.500" lineHeight="1.5">
        A complete profile helps employers see your potential.
      </Text>
    </Box>
  );
}

/* =============================================================
   DETAIL ITEM
============================================================= */

function DetailItem({ icon, value, truncate = false }) {
  return (
    <HStack
      spacing={1.5}
      color="taupe.500"
      fontSize="xs"
      minW="0"
      maxW={truncate ? "240px" : undefined}
    >
      <Icon as={icon} boxSize="13px" flexShrink={0} />

      <Text noOfLines={truncate ? 1 : undefined}>{value}</Text>
    </HStack>
  );
}

/* =============================================================
   LEGACY HELPERS

   Retained intentionally so this replacement does not silently
   change the existing component's helper surface.
============================================================= */

function formatLabel(value) {
  if (!value) {
    return "";
  }

  return String(value)
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getExperienceLabel(experience) {
  if (experience?.current || experience?.isCurrent) {
    return "Current role";
  }

  return "Professional experience";
}
