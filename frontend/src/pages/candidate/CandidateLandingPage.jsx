import React from "react";
import { Box, Button, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { clearAuth } from "../../store/authSlice";

export default function CandidateLandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const logout = async () => {
    try { await authApi.logout(); } catch {}
    dispatch(clearAuth());
    navigate("/login", { replace: true });
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg="white" borderBottom="1px solid" borderColor="gray.200" px={{ base: 5, md: 10 }} py={4}>
        <HStack justify="space-between">
          <Heading size="md">Springboard Talent</Heading>
          <Button variant="outline" onClick={logout}>Sign out</Button>
        </HStack>
      </Box>

      <Box maxW="1100px" mx="auto" p={{ base: 5, md: 10 }}>
        <VStack align="stretch" spacing={8}>
          <Box>
            <Heading size="lg">Welcome{user?.fullName ? `, ${user.fullName}` : ""}</Heading>
            <Text mt={2} color="gray.600">
              Your candidate workspace.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
            <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
              <Heading size="sm">Profile</Heading>
              <Text mt={2} color="gray.600">Build and manage your candidate profile.</Text>
              <Button mt={4} onClick={() => navigate("/candidate/profile")}>Open</Button>
            </Box>
            <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
              <Heading size="sm">Assessment Suite</Heading>
              <Text mt={2} color="gray.600">View your assessments.</Text>
              <Button mt={4} onClick={() => navigate("/candidate/assessments")}>Open</Button>
            </Box>
            <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
              <Heading size="sm">Coach Matching</Heading>
              <Text mt={2} color="gray.600">Coach matching will be available in a later module.</Text>
            </Box>
          </SimpleGrid>
        </VStack>
      </Box>
    </Box>
  );
}