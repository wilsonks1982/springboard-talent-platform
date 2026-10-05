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
import { ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Progress from "./Progress";
import BrandMark from "./brand/BrandMark";
import BrandWordmark from "./brand/BrandWordmark";

export default function RegistrationLayout({ children }) {
  const step = useSelector((s) => s.registration.step);
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const getStepTitle = (step) => {
    const titles = {
      WELCOME: "Begin Your Journey",
      ONBOARDING: "Create Your Account",
      NDA: "Non-Disclosure Agreement",
      PRIVACY: "Privacy & Data Policy",
      CONFIRMATION: "You're All Set!",
    };

    return titles[step] || "Registration";
  };

  const getStepDescription = (step) => {
    const descriptions = {
      WELCOME: "Start building your next chapter",
      ONBOARDING: "Tell us about yourself and where you want to go",
      NDA: "Please review and accept our agreement",
      PRIVACY: "Understand how we protect your data",
      CONFIRMATION: "Your account is ready to use",
    };

    return descriptions[step] || "";
  };

  return (
    <Box minH="100vh" bg="cream.100" color="charcoal.800" position="relative">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="cream.300"
        position="relative"
        zIndex={2}
      >
        <Container maxW="1100px" mx="auto" px={{ base: 4, md: 8 }}>
          <HStack
            justify="space-between"
            spacing={4}
            minH={{ base: "76px", md: "86px" }}
          >
            {/* Brand */}
            <HStack
              spacing={3}
              cursor="pointer"
              userSelect="none"
              onClick={() => navigate("/")}
              flexShrink={0}
            >
              <BrandMark />
              <BrandWordmark />
            </HStack>

            {/* Sign in */}
            <Button
              variant="ghost"
              size={isMobile ? "sm" : "md"}
              color="taupe.600"
              fontWeight="600"
              borderRadius="4px"
              _hover={{
                bg: "cream.100",
                color: "brand.500",
              }}
              onClick={() => navigate("/login")}
              rightIcon={!isMobile ? <ArrowRight size={15} /> : undefined}
            >
              {isMobile ? "Sign in" : "Already have an account? Sign in"}
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <Container
        maxW="1050px"
        mx="auto"
        py={{ base: 6, md: 10 }}
        px={{ base: 4, sm: 6, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <VStack spacing={{ base: 7, md: 9 }} align="stretch">
          {/* =================================================
              CONTENT
          ================================================= */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="cream.300"
            borderRadius="6px"
            boxShadow="0 12px 36px rgba(46, 42, 40, 0.06)"
            p={{
              base: 5,
              sm: 6,
              md: 9,
            }}
            position="relative"
          >
            {children}
          </Box>

          {/* =================================================
              PROGRESS
          ================================================= */}
          {/* <Box>
            <Progress current={step} />
          </Box> */}

          {/* =================================================
              STEP HEADER
          ================================================= */}
          {/* <VStack align="start" spacing={3} px={{ base: 1, md: 2 }}>
            <Text
              fontSize="10px"
              fontWeight="800"
              letterSpacing="0.16em"
              color="accent.600"
            >
              SPRINGBOARD REGISTRATION
            </Text>

            <Heading
              fontFamily="heading"
              fontSize={{
                base: "2xl",
                md: "3xl",
              }}
              fontWeight="500"
              color="brand.500"
              lineHeight="1.15"
            >
              {getStepTitle(step)}
            </Heading>

            <Text fontSize="sm" color="taupe.600" lineHeight="1.7">
              {getStepDescription(step)}
            </Text>

            <Box
              h="2px"
              w={{ base: "42px", md: "54px" }}
              bg="accent.500"
              mt={1}
            />
          </VStack> */}
        </VStack>
      </Container>
    </Box>
  );
}
