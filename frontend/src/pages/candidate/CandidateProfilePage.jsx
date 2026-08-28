import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { candidateApi } from "../../api/candidateApi";

export default function CandidateProfilePage() {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCandidate();
  }, []);

  async function loadCandidate() {
    try {
      setLoading(true);
      setError("");

      const data = await candidateApi.getMe();
      setCandidate(data);
    } catch (err) {
      console.error("Failed to load candidate profile", err);

      setError(
        err.response?.data?.message || "Unable to load your candidate profile.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box p={{ base: 6, md: 10 }} display="flex" justifyContent="center">
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={{ base: 6, md: 10 }}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (!candidate) {
    return null;
  }

  const user = candidate.user;

  return (
    <Box p={{ base: 6, md: 10 }}>
      <Heading size="lg">Candidate Profile</Heading>

      <Text mt={2} color="gray.600">
        Manage your professional profile and career information.
      </Text>

      <Stack spacing={6} mt={8}>
        {/* Personal Information */}
        <Box borderWidth="1px" borderRadius="lg" p={6} bg="white">
          <Heading size="md">Personal Information</Heading>

          <Divider my={4} />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <ProfileField label="Full Name" value={user.fullName} />

            <ProfileField label="Email" value={user.email} />

            <ProfileField label="Phone" value={user.phone} />

            <ProfileField label="Location" value={user.location} />

            <ProfileField
              label="Employment Situation"
              value={formatValue(user.employmentSituation)}
            />
          </SimpleGrid>
        </Box>

        {/* Professional Profile */}
        <Box borderWidth="1px" borderRadius="lg" p={6} bg="white">
          <Heading size="md">Professional Profile</Heading>

          <Divider my={4} />

          <Stack spacing={4}>
            <ProfileField
              label="Functional Area"
              value={candidate.functionalArea}
            />

            <ProfileField
              label="Current Challenge"
              value={candidate.currentChallenge}
            />

            <ProfileField
              label="Growth Aspiration"
              value={candidate.growthAspiration}
            />

            <ProfileField
              label="Plain Language Pitch"
              value={candidate.plainLanguagePitch}
            />

            <ProfileField
              label="Notice Period"
              value={candidate.noticePeriod}
            />

            <ProfileField
              label="Compensation Range"
              value={candidate.compensationRange}
            />

            <ProfileField
              label="Work Mode"
              value={formatValue(candidate.workModePreference)}
            />

            <ProfileField
              label="Relocation Preference"
              value={formatValue(candidate.relocationPreference)}
            />

            <ProfileField label="LinkedIn" value={candidate.linkedinUrl} />
          </Stack>
        </Box>

        {/* Experience */}
        <ProfileSection
          title="Experience"
          count={candidate.experiences.length}
        />

        {/* Education */}
        <ProfileSection title="Education" count={candidate.education.length} />

        {/* Certifications */}
        <ProfileSection
          title="Certifications"
          count={candidate.certifications.length}
        />

        {/* Achievements */}
        <ProfileSection
          title="Achievements"
          count={candidate.achievements.length}
        />

        {/* References */}
        <ProfileSection
          title="References"
          count={candidate.references.length}
        />

        {/* Resume */}
        <ProfileSection title="Resume" count={candidate.resume ? 1 : 0} />
      </Stack>
    </Box>
  );
}

function ProfileField({ label, value }) {
  return (
    <Box>
      <Text fontSize="sm" fontWeight="600" color="gray.500">
        {label}
      </Text>

      <Text mt={1}>{value || "Not provided"}</Text>
    </Box>
  );
}

function ProfileSection({ title, count }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={6} bg="white">
      <Heading size="md">{title}</Heading>

      <Text mt={3} color="gray.600">
        {count === 0
          ? `No ${title.toLowerCase()} added yet.`
          : `${count} ${count === 1 ? "item" : "items"} added.`}
      </Text>
    </Box>
  );
}

function formatValue(value) {
  if (!value) return "";

  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
