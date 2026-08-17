import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Users, Target } from "lucide-react";
import { setStep } from "../../store/registrationSlice";
import RegistrationLayout from "../../components/RegistrationLayout";

export default function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const begin = () => {
    dispatch(setStep("ONBOARDING"));
    navigate("/register/onboarding");
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={8}>
        {/* Welcome Message */}
        <VStack spacing={4} textAlign="center">
          <Text
            fontWeight="700"
            fontSize="sm"
            color="blue.600"
            letterSpacing="wider"
          >
            SPRINGBOARD TALENT
          </Text>
          <Heading size="2xl" color="gray.800">
            Welcome to Your Career Transformation
          </Heading>
          <Text fontSize="lg" color="gray.600" maxW="500px">
            Join thousands of professionals who've accelerated their careers
            through expert coaching, personalized assessments, and smart
            matching.
          </Text>
        </VStack>

        {/* Features Overview */}
        <Box
          bg="gradient-to-r from-blue-50 to-indigo-50"
          p={8}
          borderRadius="xl"
          border="1px solid"
          borderColor="blue.100"
        >
          <VStack spacing={6} align="stretch">
            <HStack spacing={4} align="start">
              <Icon
                as={Target}
                w={6}
                h={6}
                color="blue.600"
                flexShrink={0}
                mt={1}
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="600" color="gray.800">
                  Personalized Growth Path
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Get matched with expert coaches tailored to your specific
                  career goals and challenges.
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon
                as={Users}
                w={6}
                h={6}
                color="blue.600"
                flexShrink={0}
                mt={1}
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="600" color="gray.800">
                  Expert Guidance
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Access industry professionals with years of experience ready
                  to support your journey.
                </Text>
              </VStack>
            </HStack>

            <HStack spacing={4} align="start">
              <Icon
                as={Zap}
                w={6}
                h={6}
                color="blue.600"
                flexShrink={0}
                mt={1}
              />
              <VStack align="start" spacing={1}>
                <Text fontWeight="600" color="gray.800">
                  Comprehensive Assessments
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Evaluate your skills with industry-standard assessments
                  designed by experts.
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        {/* Time Estimate */}
        <HStack
          justify="center"
          spacing={2}
          bg="gray.50"
          p={4}
          borderRadius="lg"
        >
          <Box w={2} h={2} borderRadius="full" bg="green.500" />
          <Text fontSize="sm" color="gray.700">
            <strong>Takes about 5 minutes</strong> to complete your profile
          </Text>
        </HStack>

        {/* CTA Button */}
        <Button
          colorScheme="blue"
          size="lg"
          onClick={begin}
          fontWeight="700"
          rightIcon={<ArrowRight />}
          borderRadius="lg"
          _hover={{ boxShadow: "lg" }}
          _active={{ transform: "scale(0.98)" }}
        >
          Get Started
        </Button>

        {/* Footer Info */}
        <Text fontSize="xs" color="gray.500" textAlign="center">
          No credit card required • Free to join • Takes 5-10 minutes
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}
