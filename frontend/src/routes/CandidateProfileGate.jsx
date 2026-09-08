import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

import { profileStrengthApi } from "../api/candidateProfileStrengthApi";

const REQUIRED_KEYS = [
  "BASIC_INFORMATION",
  "EXPERIENCE",
  "EDUCATION",
  "CAREER_DIRECTION",
  "PROFESSIONAL_SNAPSHOT",
];

export default function CandidateProfileGate() {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function checkProfile() {
      try {
        const profileStrength = await profileStrengthApi.get();

        if (!mounted) {
          return;
        }

        const sections = profileStrength?.sections || [];

        const complete = REQUIRED_KEYS.every((requiredKey) => {
          const section = sections.find((item) => item.key === requiredKey);

          return Boolean(section?.completed);
        });

        setProfileComplete(complete);
      } catch (error) {
        console.error("Failed to check candidate profile completion", error);

        /*
         * Fail closed.
         *
         * If we cannot verify profile completion, do not allow the
         * candidate to bypass the profile setup gate.
         */
        setProfileComplete(false);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkProfile();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Center minH="100vh" bg="gray.50">
        <VStack spacing={4}>
          <Spinner size="lg" />

          <Text color="gray.600">Checking your profile…</Text>
        </VStack>
      </Center>
    );
  }

  if (!profileComplete) {
    return (
      <Navigate
        to="/candidate/profile-setup"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
