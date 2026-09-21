import React from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  VStack,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Progress from "./Progress";

export default function RegistrationLayout({ children }) {
  const step = useSelector((s) => s.registration.step);
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const getStepTitle = (step) => {
    const titles = {
      WELCOME: "Welcome to Springboard Talent",
      ONBOARDING: "Create Your Account",
      NDA: "Non-Disclosure Agreement",
      PRIVACY: "Privacy & Data Policy",
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
      CONFIRMATION: "Your account is ready to use",
    };

    return descriptions[step] || "";
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #faf9ff 0%, #ffffff 55%, #faf9ff 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Subtle background glow */}
      <Box
        position="absolute"
        top="-180px"
        right="-140px"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="purple.100"
        opacity={0.35}
        filter="blur(80px)"
        pointerEvents="none"
      />

      <Box
        position="absolute"
        bottom="-220px"
        left="-180px"
        w="420px"
        h="420px"
        borderRadius="full"
        bg="purple.50"
        opacity={0.55}
        filter="blur(90px)"
        pointerEvents="none"
      />

      {/* Header */}
      <Box
        bg="rgba(255, 255, 255, 0.92)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="purple.100"
        py={{ base: 4, md: 5 }}
        px={{ base: 5, md: 10 }}
        position="relative"
        zIndex={1}
      >
        <Container maxW="1000px" mx="auto">
          <HStack justify="space-between" spacing={4}>
            {/* Brand */}
            <HStack
              spacing={3}
              cursor="pointer"
              onClick={() => navigate("/")}
              flexShrink={0}
            >
              <Box
                w="38px"
                h="38px"
                borderRadius="xl"
                bgGradient="linear(to-br, purple.700, purple.500)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 6px 16px rgba(128, 90, 213, 0.25)"
              >
                <Sparkles size={19} color="white" />
              </Box>

              <VStack
                align="start"
                spacing={0}
                display={{ base: "none", sm: "flex" }}
              >
                <Heading
                  size="sm"
                  color="purple.700"
                  fontWeight="800"
                  letterSpacing="-0.2px"
                >
                  Springboard Talent
                </Heading>

                <Text
                  fontSize="10px"
                  color="gray.500"
                  fontWeight="600"
                  letterSpacing="0.4px"
                  textTransform="uppercase"
                >
                  Career Transformation
                </Text>
              </VStack>
            </HStack>

            {/* Sign in */}
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "md"}
              color="gray.600"
              fontWeight="600"
              borderRadius="lg"
              _hover={{
                bg: "purple.50",
                color: "purple.700",
              }}
              onClick={() => navigate("/login")}
              rightIcon={!isMobile ? <ArrowRight size={15} /> : undefined}
            >
              {isMobile ? "Sign in" : "Already have an account? Sign in"}
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container
        maxW="1000px"
        mx="auto"
        py={{ base: 7, md: 12 }}
        px={{ base: 4, sm: 6, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <VStack spacing={{ base: 7, md: 9 }} align="stretch">
          {/* Progress */}
          <Box>
            <Progress current={step} />
          </Box>

          {/* Step Header */}
          <VStack align="start" spacing={3}>
            <Box
              px={3}
              py={1}
              borderRadius="full"
              bg="purple.50"
              border="1px solid"
              borderColor="purple.100"
            >
              <HStack spacing={1.5}>
                <Sparkles size={13} color="#805AD5" />

                <Text
                  fontSize="xs"
                  fontWeight="700"
                  color="purple.700"
                  textTransform="uppercase"
                  letterSpacing="0.5px"
                >
                  Springboard Registration
                </Text>
              </HStack>
            </Box>

            <Heading
              size="lg"
              color="gray.800"
              fontWeight="800"
              letterSpacing="-0.6px"
              fontSize={{
                base: "25px",
                md: "30px",
              }}
              lineHeight="1.2"
            >
              {getStepTitle(step)}
            </Heading>

            <Box
              h="3px"
              w={{
                base: "48px",
                md: "60px",
              }}
              borderRadius="full"
              bgGradient="linear(to-r, purple.700, purple.500)"
            />
          </VStack>

          {/* Main Card */}
          <Box
            bg="white"
            borderRadius={{
              base: "xl",
              md: "2xl",
            }}
            boxShadow="0 14px 40px rgba(88, 28, 135, 0.08)"
            p={{
              base: 5,
              sm: 6,
              md: 9,
            }}
            border="1px solid"
            borderColor="purple.100"
            position="relative"
            overflow="hidden"
          >
            {/* Decorative top accent */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              h="3px"
              bgGradient="linear(to-r, purple.700, purple.500, purple.300)"
            />

            {children}
          </Box>

          {/* Footer Info */}
          {step !== "CONFIRMATION" && (
            <Box
              bg="purple.50"
              borderRadius="xl"
              p={{
                base: 4,
                md: 5,
              }}
              border="1px solid"
              borderColor="purple.100"
              boxShadow="0 4px 14px rgba(128, 90, 213, 0.05)"
            >
              <HStack align="start" spacing={3}>
                <Box
                  w="30px"
                  h="30px"
                  borderRadius="lg"
                  bg="white"
                  border="1px solid"
                  borderColor="purple.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                >
                  <Sparkles size={15} color="#805AD5" />
                </Box>

                <Text fontSize="sm" color="purple.800" lineHeight="1.6">
                  <Box as="span" fontWeight="800">
                    Pro tip:
                  </Box>{" "}
                  {getStepDescription(step)}
                </Text>
              </HStack>
            </Box>
          )}

          {/* Bottom trust message */}
          {step !== "CONFIRMATION" && (
            <Text textAlign="center" fontSize="xs" color="gray.500" px={4}>
              Your information is securely protected and used only to help
              personalize your Springboard Talent experience.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
