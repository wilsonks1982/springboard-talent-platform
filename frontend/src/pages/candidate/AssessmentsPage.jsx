import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function AssessmentsPage() {
  return (
    <Box p={{ base: 6, md: 10 }}>
      <Heading size="lg">Assessment Suite</Heading>
      <Text mt={3} color="gray.600">
        Assessment functionality will be implemented in a later module.
      </Text>
    </Box>
  );
}