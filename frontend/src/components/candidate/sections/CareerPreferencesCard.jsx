import React from "react";
import { Box, Button, Flex, Text, Stack } from "@chakra-ui/react";

/* =============================================================
   CAREER PREFERENCES CARD

   Presentation-only component.

   Parent owns:
   - Career preferences API
   - Drawer state
   - Save operation

   Props:
   - candidate
   - onEdit
============================================================= */

export default function CareerPreferencesCard({ candidate, onEdit }) {
  const preferences = candidate?.careerPreferences;

  const industries = preferences?.desiredIndustries || [];

  const locations = preferences?.desiredLocations || [];

  const languages = preferences?.languages || [];

  const hasPreferences =
    Boolean(preferences?.desiredTitle) ||
    locations.length > 0 ||
    industries.length > 0 ||
    languages.length > 0 ||
    Boolean(preferences?.openToRemote) ||
    preferences?.noticePeriod != null ||
    Boolean(preferences?.workAuthorization);

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="cream.300"
      borderRadius="6px"
      p={{ base: 5, md: 6 }}
      boxShadow="0 5px 20px rgba(46, 42, 40, 0.035)"
    >
      {/* =========================================================
          HEADER
      ========================================================== */}

      <Flex justify="space-between" align="flex-start" gap={4}>
        <Box>
          <Text
            fontSize="9px"
            fontWeight="800"
            letterSpacing="0.14em"
            color="accent.600"
          >
            CAREER DIRECTION
          </Text>

          <Text
            fontFamily="heading"
            fontSize="xl"
            fontWeight="500"
            color="brand.500"
            mt={1}
          >
            Career Preferences
          </Text>

          <Text mt={1} fontSize="xs" color="taupe.500">
            What you're looking for next
          </Text>
        </Box>

        <Button
          size="sm"
          variant="ghostBrand"
          onClick={onEdit}
          borderRadius="4px"
          flexShrink={0}
        >
          Edit
        </Button>
      </Flex>

      {/* =========================================================
          EMPTY STATE
      ========================================================== */}

      {!hasPreferences ? (
        <Box
          mt={5}
          p={5}
          bg="cream.100"
          border="1px dashed"
          borderColor="cream.400"
          borderRadius="4px"
        >
          <Text fontFamily="heading" fontSize="md" color="brand.500">
            Tell us what you're looking for next.
          </Text>

          <Text mt={1} fontSize="sm" color="taupe.600" lineHeight="1.6">
            Add your target role, locations and work preferences.
          </Text>

          <Button
            mt={4}
            size="sm"
            variant="solid"
            onClick={onEdit}
            borderRadius="4px"
          >
            Add preferences
          </Button>
        </Box>
      ) : (
        /* =======================================================
           PREFERENCES
        ======================================================== */

        <Stack mt={6} spacing={5}>
          <Preference label="Looking for" value={preferences?.desiredTitle} />

          {industries.length > 0 && (
            <PreferenceTags label="Industries" values={industries} />
          )}

          {locations.length > 0 && (
            <PreferenceTags label="Locations" values={locations} />
          )}

          <Preference
            label="Work preference"
            value={formatCareerPreference(preferences?.openToRemote)}
          />

          <Preference
            label="Notice period"
            value={
              preferences?.noticePeriod != null
                ? `${preferences.noticePeriod} days`
                : "Not specified"
            }
          />

          <Preference
            label="Work authorization"
            value={formatCareerPreference(preferences?.workAuthorization)}
          />

          {languages.length > 0 && (
            <PreferenceTags label="Languages" values={languages} />
          )}
        </Stack>
      )}
    </Box>
  );
}

/* =============================================================
   PREFERENCE ROW
============================================================= */

function Preference({ label, value }) {
  return (
    <Flex justify="space-between" align="flex-start" gap={5}>
      <Text fontSize="sm" color="taupe.500" flexShrink={0}>
        {label}
      </Text>

      <Text
        fontSize="sm"
        fontWeight="600"
        color="charcoal.800"
        textAlign="right"
      >
        {value || "Not specified"}
      </Text>
    </Flex>
  );
}

/* =============================================================
   PREFERENCE TAGS
============================================================= */

function PreferenceTags({ label, values }) {
  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="800"
        color="taupe.500"
        letterSpacing="0.08em"
        mb={2}
        textTransform="uppercase"
      >
        {label}
      </Text>

      <Flex gap={2} flexWrap="wrap">
        {values.map((value) => (
          <Box
            key={value}
            px={2.5}
            py={1}
            bg="cream.100"
            border="1px solid"
            borderColor="cream.300"
            borderRadius="3px"
          >
            <Text fontSize="xs" color="charcoal.700" fontWeight="500">
              {value}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

/* =============================================================
   VALUE FORMATTER
============================================================= */

function formatCareerPreference(value) {
  if (!value) {
    return "Not specified";
  }

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
