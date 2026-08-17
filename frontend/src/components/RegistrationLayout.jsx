import React from "react";
import { Box, Container, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Progress from "./Progress";

export default function RegistrationLayout({ children }) {
  const step = useSelector((s) => s.registration.step);

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="900px" py={10}>
        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="sm"
          p={{ base: 5, md: 10 }}
        >
          <Heading size="md" mb={8}>
            Candidate Account Registration
          </Heading>
          <Box mb={8}>
            <Progress current={step} />
          </Box>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
