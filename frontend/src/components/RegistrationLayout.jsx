import React from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress";

export default function RegistrationLayout({ children }) {
  const step = useSelector((s) => s.registration.step);
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const getStepTitle = (step) => {
    const titles = {
      WELCOME: "Welcome to Springboard Talent",
      ONBOARDING: "Create Your Account",
      NDA: "Non-Disclosure Agreement",
      PRIVACY: "Privacy & Data Policy",
      VERIFICATION: "Verify Your Account",
      CONFIRMATION: "You're All Set!",
    };
    return titles[step] || "Registration";
  };

  const getStepDescription = (step) => {
    const descriptions = {
      WELCOME: "Start your journey to career transformation",
      ONBOARDING: "Tell us about yourself and your career goals",
      NDA: "Please review and accept our agreement",
      PRIVACY: "Understand how we protect your data",
      VERIFICATION: "Secure your account with email and phone verification",
      CONFIRMATION: "Your account is ready to use",
    };
    return descriptions[step] || "";
  };

  return (
    <Box minH="100vh" bg="gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={{ base: 5, md: 10 }}
      >
        <Container maxW="900px" mx="auto">
          <HStack justify="space-between">
            <Heading
              size="md"
              color="blue.600"
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              Springboard Talent
            </Heading>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Already have an account? Sign in
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        maxW="900px"
        mx="auto"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
      >
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          {/* Progress Bar */}
          <Box>
            <Progress current={step} />
          </Box>

          {/* Step Header */}
          <VStack align="start" spacing={2}>
            <Heading
              size="lg"
              color="gray.800"
              fontSize={{ base: "24px", md: "28px" }}
            >
              {getStepTitle(step)}
            </Heading>
            <Box h="1px" w="60px" bg="blue.500" />
          </VStack>

          {/* Card Container */}
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)"
            p={{ base: 6, md: 8 }}
            border="1px solid"
            borderColor="gray.100"
          >
            {children}
          </Box>

          {/* Footer Info */}
          {step !== "CONFIRMATION" && (
            <Box
              bg="blue.50"
              borderRadius="lg"
              p={4}
              border="1px solid"
              borderColor="blue.200"
              fontSize="sm"
              color="blue.800"
            >
              <strong>Pro tip:</strong> {getStepDescription(step)}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
