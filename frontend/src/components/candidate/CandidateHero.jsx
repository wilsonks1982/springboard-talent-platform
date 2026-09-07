import React, { useMemo } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Progress,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
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

export default function CandidateHero({
  candidate,
  profileStrength,
  completion = 0,
  basicProfile,
  onEditProfile,
  onEditBasicProfile,
}) {
  const fullName = basicProfile?.fullName || "Your Name";

  const initials = useMemo(() => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [fullName]);

  const currentExperience = useMemo(() => {
    const experiences = candidate?.experiences || [];

    if (!experiences.length) {
      return null;
    }

    return [...experiences].sort((a, b) => {
      const aCurrent = a.current || a.isCurrent;
      const bCurrent = b.current || b.isCurrent;

      if (aCurrent && !bCurrent) return -1;
      if (!aCurrent && bCurrent) return 1;

      return new Date(b.startDate || 0) - new Date(a.startDate || 0);
    })[0];
  }, [candidate?.experiences]);

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

    // Merge overlapping experience periods so concurrent roles
    // are not counted twice.
    const merged = [];

    ranges.forEach((range) => {
      const last = merged[merged.length - 1];

      if (!last || range.start > last.end) {
        merged.push({ ...range });
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
      borderRadius="3xl"
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      boxShadow="0 8px 30px rgba(15, 23, 42, 0.06)"
    >
      {/* Decorative background */}
      <Box
        position="absolute"
        top="-120px"
        right="-100px"
        w="320px"
        h="320px"
        borderRadius="full"
        bgGradient="linear(to-br, purple.100, blue.50)"
        opacity={0.8}
      />

      <Box
        position="absolute"
        bottom="-140px"
        left="-100px"
        w="280px"
        h="280px"
        borderRadius="full"
        bg="purple.50"
        opacity={0.6}
      />

      <Box position="relative" p={{ base: 5, md: 7, xl: 8 }}>
        <Flex
          direction={{ base: "column", xl: "row" }}
          justify="space-between"
          align="flex-start"
          gap={{ base: 7, xl: 10 }}
        >
          {/* ============================================================
              IDENTITY
             ============================================================ */}
          <HStack
            align="flex-start"
            spacing={{ base: 4, md: 5 }}
            flex="1"
            minW="0"
          >
            <Avatar
              size={{ base: "lg", md: "xl" }}
              name={fullName}
              bg="purple.100"
              color="purple.700"
              fontWeight="800"
              initials={initials}
              flexShrink={0}
            />

            <Stack spacing={2} minW="0">
              <HStack spacing={2} flexWrap="wrap">
                <Badge
                  colorScheme="green"
                  borderRadius="full"
                  px={2.5}
                  py={1}
                  fontSize="10px"
                  fontWeight="700"
                  letterSpacing="0.04em"
                >
                  ACTIVE PROFILE
                </Badge>

                <HStack
                  spacing={1}
                  color="gray.400"
                  fontSize="xs"
                  display={{ base: "none", sm: "flex" }}
                >
                  <Icon as={FiShield} boxSize={3.5} />
                  <Text>Professional profile</Text>
                </HStack>
              </HStack>

              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="800"
                color="gray.900"
                letterSpacing="-0.025em"
                lineHeight="1.1"
              >
                {fullName}
              </Text>

              <HStack
                spacing={2}
                flexWrap="wrap"
                color="gray.600"
                fontSize={{ base: "sm", md: "md" }}
              >
                <HStack spacing={1.5}>
                  <Icon as={FiBriefcase} boxSize={4} color="purple.500" />
                  <Text fontWeight="600">{professionalTitle}</Text>
                </HStack>

                {companyName && (
                  <>
                    <Text color="gray.300">•</Text>
                    <Text>{companyName}</Text>
                  </>
                )}
              </HStack>

              {location && (
                <HStack spacing={1.5} color="gray.500" fontSize="sm">
                  <Icon as={FiMapPin} boxSize={4} />
                  <Text>{location}</Text>
                </HStack>
              )}

              <Text
                pt={2}
                maxW="680px"
                color="gray.600"
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="1.75"
              >
                {pitch}
              </Text>

              {/* ==========================================================
    PERSONAL + CAREER DETAILS
   ========================================================== */}
              <Flex
                pt={3}
                gap={{ base: 3, md: 5 }}
                flexWrap="wrap"
                align="center"
              >
                {basicProfile?.phone && (
                  <HStack spacing={1.5} color="gray.500" fontSize="xs">
                    <Icon as={FiPhone} boxSize={3.5} />
                    <Text>{basicProfile.phone}</Text>
                  </HStack>
                )}

                {basicProfile?.email && (
                  <HStack spacing={1.5} color="gray.500" fontSize="xs" minW="0">
                    <Icon as={FiMail} boxSize={3.5} />
                    <Text noOfLines={1}>{basicProfile.email}</Text>
                  </HStack>
                )}

                {basicLocation && !location && (
                  <HStack spacing={1.5} color="gray.500" fontSize="xs">
                    <Icon as={FiMapPin} boxSize={3.5} />
                    <Text>{basicLocation}</Text>
                  </HStack>
                )}

                {yearsOfExperience > 0 && (
                  <HStack spacing={1.5} color="gray.500" fontSize="xs">
                    <Icon as={FiBriefcase} boxSize={3.5} />
                    <Text>
                      <Text as="span" fontWeight="700" color="gray.700">
                        {yearsOfExperience}
                      </Text>{" "}
                      {yearsOfExperience === 1 ? "year" : "years"} experience
                    </Text>
                  </HStack>
                )}

                {basicProfile?.currentlyEmployed != null && (
                  <HStack spacing={1.5}>
                    <Box
                      w="6px"
                      h="6px"
                      borderRadius="full"
                      bg={
                        basicProfile.currentlyEmployed
                          ? "green.400"
                          : "orange.400"
                      }
                    />

                    <Text fontSize="xs" color="gray.500">
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
                    variant="ghost"
                    colorScheme="purple"
                    leftIcon={<FiExternalLink />}
                  >
                    LinkedIn
                  </Button>
                )}

                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="purple"
                  leftIcon={<FiEdit3 />}
                  onClick={onEditBasicProfile}
                >
                  Edit details
                </Button>
              </Flex>
            </Stack>
          </HStack>
        </Flex>

        <Divider mt={7} />
      </Box>
    </Box>
  );
}

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
