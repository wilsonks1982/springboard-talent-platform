import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Target, Users, Zap, Check } from "lucide-react";

import { setStep } from "../../store/registrationSlice";
import RegistrationLayout from "../../components/RegistrationLayout";

const features = [
  {
    icon: Target,
    eyebrow: "PERSONALIZED DIRECTION",
    title: "A clearer path forward",
    description:
      "Build a career direction around your strengths, ambitions, and the opportunities that matter to you.",
  },
  {
    icon: Users,
    eyebrow: "EXPERT PERSPECTIVE",
    title: "Guidance that understands you",
    description:
      "Gain access to a talent platform designed around your experience, potential, and next career move.",
  },
  {
    icon: Zap,
    eyebrow: "CAREER INTELLIGENCE",
    title: "Know where you stand",
    description:
      "Understand your professional strengths and create a stronger foundation for what comes next.",
  },
];

export default function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const begin = () => {
    dispatch(setStep("ONBOARDING"));
    navigate("/register/onboarding");
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={{ base: 8, md: 10 }}>
        {/* =====================================================
            INTRODUCTION
        ===================================================== */}
        <VStack
          align="center"
          textAlign="center"
          spacing={4}
          maxW="760px"
          mx="auto"
          pt={{ base: 1, md: 3 }}
        >
          <Badge
            display="inline-flex"
            alignItems="center"
            px={3}
            py={1.5}
            borderRadius="2px"
            bg="accent.50"
            color="accent.700"
            border="1px solid"
            borderColor="accent.200"
            fontSize="10px"
            fontWeight="800"
            letterSpacing="0.16em"
          >
            BEGIN YOUR JOURNEY
          </Badge>

          <Heading
            fontFamily="heading"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="500"
            lineHeight="1.08"
            letterSpacing="-0.025em"
            color="brand.500"
          >
            Your Potential.
            <Text as="span" display="block">
              Your Platform.
            </Text>
          </Heading>

          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", md: "2xl" }}
            fontStyle="italic"
            fontWeight="400"
            color="accent.600"
          >
            Find Your Gold Standard.
          </Text>

          <Text
            fontSize={{ base: "sm", md: "md" }}
            color="taupe.600"
            maxW="640px"
            lineHeight="1.8"
          >
            Springboard helps you understand where you are, clarify where you
            want to go, and build the next chapter of your career with purpose.
          </Text>
        </VStack>

        {/* =====================================================
            WHAT SPRINGBOARD OFFERS
        ===================================================== */}
        <Box>
          <HStack spacing={3} justify="center" mb={{ base: 5, md: 6 }}>
            <Box h="1px" w="32px" bg="accent.500" />

            <Text
              fontSize="10px"
              fontWeight="800"
              letterSpacing="0.16em"
              color="taupe.500"
            >
              THE SPRINGBOARD APPROACH
            </Text>

            <Box h="1px" w="32px" bg="accent.500" />
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 5 }}>
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </SimpleGrid>
        </Box>

        {/* =====================================================
            TIME EXPECTATION
        ===================================================== */}
        <Box
          px={{ base: 4, md: 6 }}
          py={4}
          bg="cream.100"
          border="1px solid"
          borderColor="cream.300"
        >
          <HStack justify="center" spacing={3} flexWrap="wrap">
            <Box
              w="7px"
              h="7px"
              borderRadius="full"
              bg="accent.500"
              flexShrink={0}
            />

            <Text fontSize="sm" color="taupe.600" textAlign="center">
              <Text as="span" fontWeight="700" color="charcoal.800">
                About 5 minutes
              </Text>{" "}
              to create your account and get started.
            </Text>
          </HStack>
        </Box>

        {/* =====================================================
            CTA
        ===================================================== */}
        <VStack spacing={4}>
          <Button
            width="full"
            size="lg"
            onClick={begin}
            height="56px"
            fontWeight="700"
            letterSpacing="0.01em"
            color="white"
            bg="brand.500"
            borderRadius="4px"
            rightIcon={<ArrowRight size={18} />}
            boxShadow="0 8px 22px rgba(96, 18, 48, 0.18)"
            _hover={{
              bg: "brand.600",
              boxShadow: "0 11px 28px rgba(96, 18, 48, 0.24)",
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
            transition="all 0.2s ease"
          >
            Begin Your Journey
          </Button>

          <HStack
            spacing={{ base: 3, md: 5 }}
            justify="center"
            flexWrap="wrap"
            rowGap={2}
          >
            <TrustPoint text="Free to join" />
            <TrustPoint text="No credit card" />
            <TrustPoint text="Your information stays protected" />
          </HStack>
        </VStack>

        {/* =====================================================
            PHILOSOPHY
        ===================================================== */}
        <VStack spacing={2} pt={{ base: 1, md: 2 }}>
          <Text
            fontFamily="heading"
            fontSize={{ base: "xl", md: "2xl" }}
            fontStyle="italic"
            color="brand.500"
          >
            Grow. Outgrow.
          </Text>

          <Text
            fontSize="xs"
            color="taupe.500"
            textAlign="center"
            maxW="560px"
            lineHeight="1.7"
          >
            Your career is not a fixed destination. It is a journey of becoming,
            growing, and moving toward what comes next.
          </Text>
        </VStack>
      </VStack>
    </RegistrationLayout>
  );
}

/* =============================================================
   FEATURE CARD
============================================================= */

function FeatureCard({ feature }) {
  return (
    <Box
      p={{ base: 5, md: 6 }}
      bg="white"
      border="1px solid"
      borderColor="cream.300"
      borderRadius="6px"
      transition="all 0.2s ease"
      _hover={{
        borderColor: "accent.300",
        transform: "translateY(-2px)",
        boxShadow: "0 10px 28px rgba(46, 42, 40, 0.07)",
      }}
    >
      <VStack align="start" spacing={4}>
        <HStack justify="space-between" width="full" align="start">
          <Box
            w="42px"
            h="42px"
            border="1px solid"
            borderColor="accent.300"
            bg="accent.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
          >
            <Icon as={feature.icon} boxSize={18} color="accent.600" />
          </Box>

          <Text
            fontSize="9px"
            fontWeight="800"
            letterSpacing="0.12em"
            color="taupe.500"
            textAlign="right"
          >
            {feature.eyebrow}
          </Text>
        </HStack>

        <Box>
          <Text
            fontFamily="heading"
            fontSize="lg"
            fontWeight="500"
            color="brand.500"
            mb={2}
          >
            {feature.title}
          </Text>

          <Text fontSize="sm" color="taupe.600" lineHeight="1.7">
            {feature.description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

/* =============================================================
   TRUST POINT
============================================================= */

function TrustPoint({ text }) {
  return (
    <HStack spacing={1.5}>
      <Icon as={Check} boxSize={13} color="accent.600" />

      <Text fontSize="xs" color="taupe.600" fontWeight="500">
        {text}
      </Text>
    </HStack>
  );
}
