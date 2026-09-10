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
import { ArrowRight, Zap, Users, Target, Sparkles, Check } from "lucide-react";
import { setStep } from "../../store/registrationSlice";
import RegistrationLayout from "../../components/RegistrationLayout";

const features = [
  {
    icon: Target,
    title: "Personalized Growth Path",
    description:
      "Get matched with expert coaches tailored to your specific career goals and challenges.",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Access industry professionals with years of experience ready to support your journey.",
  },
  {
    icon: Zap,
    title: "Comprehensive Assessments",
    description:
      "Evaluate your skills with industry-standard assessments designed by experts.",
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
      <VStack align="stretch" spacing={{ base: 7, md: 9 }} position="relative">
        {/* =====================================================
            HERO
        ===================================================== */}
        <VStack spacing={4} textAlign="center" maxW="720px" mx="auto">
          <Badge
            display="inline-flex"
            alignItems="center"
            gap={2}
            px={3}
            py={1.5}
            borderRadius="full"
            bg="purple.50"
            color="purple.700"
            border="1px solid"
            borderColor="purple.100"
            fontSize="xs"
            fontWeight="800"
            letterSpacing="0.08em"
          >
            <Icon as={Sparkles} boxSize={3.5} />
            SPRINGBOARD TALENT
          </Badge>

          <Heading
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="800"
            lineHeight="1.08"
            letterSpacing="-0.035em"
            color="gray.900"
          >
            Welcome to your
            <Text as="span" display="block" color="purple.700">
              career transformation.
            </Text>
          </Heading>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.500"
            maxW="620px"
            lineHeight="1.75"
          >
            Join professionals accelerating their careers through expert
            coaching, personalized assessments, and intelligent career matching.
          </Text>
        </VStack>

        {/* =====================================================
            FEATURES
        ===================================================== */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {features.map((feature) => (
            <Box
              key={feature.title}
              p={{ base: 5, md: 6 }}
              bg="white"
              border="1px solid"
              borderColor="purple.100"
              borderRadius="2xl"
              boxShadow="0 8px 25px rgba(88, 28, 135, 0.05)"
              transition="all 0.2s ease"
              _hover={{
                transform: "translateY(-3px)",
                boxShadow: "0 14px 35px rgba(88, 28, 135, 0.09)",
                borderColor: "purple.200",
              }}
            >
              <VStack align="start" spacing={4}>
                <Box
                  w="46px"
                  h="46px"
                  borderRadius="xl"
                  bg="purple.50"
                  border="1px solid"
                  borderColor="purple.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={feature.icon} boxSize={5} color="purple.600" />
                </Box>

                <Box>
                  <Text
                    fontWeight="750"
                    fontSize="md"
                    color="gray.800"
                    mb={1.5}
                  >
                    {feature.title}
                  </Text>

                  <Text fontSize="sm" color="gray.500" lineHeight="1.65">
                    {feature.description}
                  </Text>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* =====================================================
            TIME ESTIMATE
        ===================================================== */}
        <Box
          bg="linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%)"
          border="1px solid"
          borderColor="purple.100"
          borderRadius="2xl"
          px={{ base: 5, md: 6 }}
          py={4}
        >
          <HStack justify="center" spacing={3}>
            <Box
              w="9px"
              h="9px"
              borderRadius="full"
              bg="purple.500"
              boxShadow="0 0 0 4px rgba(128, 90, 213, 0.10)"
            />

            <Text fontSize="sm" color="gray.600" textAlign="center">
              <Text as="span" fontWeight="750" color="gray.800">
                Takes about 5 minutes
              </Text>{" "}
              to complete your profile
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
            fontWeight="800"
            borderRadius="xl"
            py={7}
            color="white"
            bgGradient="linear(to-r, purple.700, purple.600)"
            rightIcon={<ArrowRight size={19} />}
            boxShadow="0 10px 28px rgba(128, 90, 213, 0.22)"
            _hover={{
              bgGradient: "linear(to-r, purple.800, purple.700)",
              boxShadow: "0 14px 34px rgba(128, 90, 213, 0.30)",
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "scale(0.985)",
            }}
            transition="all 0.2s ease"
          >
            Get Started
          </Button>

          {/* Trust points */}
          <HStack
            spacing={{ base: 3, md: 5 }}
            justify="center"
            flexWrap="wrap"
            rowGap={2}
          >
            <TrustPoint text="Free to join" />
            <TrustPoint text="No credit card" />
            <TrustPoint text="5–10 minutes" />
          </HStack>
        </VStack>

        {/* =====================================================
            FOOTER MESSAGE
        ===================================================== */}
        <Text
          fontSize="xs"
          color="gray.400"
          textAlign="center"
          lineHeight="1.6"
        >
          Your journey starts with understanding where you are today and where
          you want to go next.
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}

/* =============================================================
   TRUST POINT
============================================================= */

function TrustPoint({ text }) {
  return (
    <HStack spacing={1.5}>
      <Icon as={Check} boxSize={3.5} color="purple.500" />

      <Text fontSize="xs" color="gray.500" fontWeight="500">
        {text}
      </Text>
    </HStack>
  );
}
