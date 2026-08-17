import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function CandidateProfilePage() {
  return (
    <Box p={{ base: 6, md: 10 }}>
      <Heading size="lg">Candidate Profile</Heading>
      <Text mt={3} color="gray.600">
        Profile Builder belongs to Module 2.
      </Text>
    </Box>
  );
}