import React from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import RegistrationLayout from "../../components/RegistrationLayout";
import { setStep } from "../../store/registrationSlice";

export default function ConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account } = useSelector((s) => s.registration);

  const goToLogin = () => {
    dispatch(setStep("WELCOME"));
    navigate("/login", { replace: true });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={8}>
        {/* Success Icon & Message */}
        <Box textAlign="center">
          <Box
            mx="auto"
            mb={6}
            w={20}
            h={20}
            borderRadius="full"
            bg="green.50"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="fadeInScale 0.6s ease-out"
          >
            <Icon as={CheckCircle} w={10} h={10} color="green.500" />
          </Box>

          <Heading size="lg" color="gray.800" mb={2}>
            {getGreeting()}, {account.fullName?.split(" ")[0]}!
          </Heading>
          <Text fontSize="lg" color="gray.600" mb={4}>
            Your account is ready to use
          </Text>
        </Box>

        {/* Confirmation Details */}
        <Box
          bg="gradient-to-r from-green-50 to-blue-50"
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor="green.200"
        >
          <VStack align="stretch" spacing={4}>
            <HStack spacing={3}>
              <Icon as={CheckCircle} w={5} h={5} color="green.500" />
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Account Created
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {account.email}
                </Text>
              </Box>
              <Badge colorScheme="green">Done</Badge>
            </HStack>

            <HStack spacing={3}>
              <Icon as={CheckCircle} w={5} h={5} color="green.500" />
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Email Verified
                </Text>
                <Text fontSize="xs" color="gray.600">
                  Confirmation link sent
                </Text>
              </Box>
              <Badge colorScheme="green">Done</Badge>
            </HStack>

            <HStack spacing={3}>
              <Icon as={CheckCircle} w={5} h={5} color="green.500" />
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Phone Verified
                </Text>
                <Text fontSize="xs" color="gray.600">
                  {account.phone}
                </Text>
              </Box>
              <Badge colorScheme="green">Done</Badge>
            </HStack>

            <HStack spacing={3}>
              <Icon as={CheckCircle} w={5} h={5} color="green.500" />
              <Box flex={1}>
                <Text fontSize="sm" fontWeight="600" color="gray.700">
                  Agreements Accepted
                </Text>
                <Text fontSize="xs" color="gray.600">
                  NDA & Privacy Policy
                </Text>
              </Box>
              <Badge colorScheme="green">Done</Badge>
            </HStack>
          </VStack>
        </Box>

        {/* What's Next */}
        <Box
          bg="blue.50"
          p={6}
          borderRadius="xl"
          border="1px solid"
          borderColor="blue.200"
        >
          <HStack spacing={3} mb={4}>
            <Icon as={Sparkles} w={5} h={5} color="blue.600" />
            <Heading size="sm" color="gray.800">
              What's Next?
            </Heading>
          </HStack>

          <VStack align="stretch" spacing={3}>
            <Box pl={8}>
              <Text fontSize="sm" fontWeight="600" color="gray.800" mb={1}>
                Complete Your Profile
              </Text>
              <Text fontSize="xs" color="gray.600">
                Add more details about your experience and career goals.
              </Text>
            </Box>

            <Box pl={8}>
              <Text fontSize="sm" fontWeight="600" color="gray.800" mb={1}>
                Take Skill Assessments
              </Text>
              <Text fontSize="xs" color="gray.600">
                Evaluate your abilities with industry-standard tests.
              </Text>
            </Box>

            <Box pl={8}>
              <Text fontSize="sm" fontWeight="600" color="gray.800" mb={1}>
                Get Matched with a Coach
              </Text>
              <Text fontSize="xs" color="gray.600">
                Find the perfect coach to guide your career journey.
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* Quick Stats */}
        <HStack spacing={4}>
          <Box flex={1} bg="gray.50" p={4} borderRadius="lg" textAlign="center">
            <HStack justify="center" mb={2}>
              <Icon as={Calendar} w={4} h={4} color="blue.600" />
            </HStack>
            <Text fontSize="xs" color="gray.600">
              Account Created
            </Text>
            <Text fontSize="sm" fontWeight="600" color="gray.800">
              Today
            </Text>
          </Box>

          <Box flex={1} bg="gray.50" p={4} borderRadius="lg" textAlign="center">
            <HStack justify="center" mb={2}>
              <Icon as={Clock} w={4} h={4} color="blue.600" />
            </HStack>
            <Text fontSize="xs" color="gray.600">
              Time to Complete
            </Text>
            <Text fontSize="sm" fontWeight="600" color="gray.800">
              ~5 minutes
            </Text>
          </Box>
        </HStack>

        {/* CTA Buttons */}
        <Button
          colorScheme="blue"
          size="lg"
          rightIcon={<ArrowRight />}
          onClick={goToLogin}
          borderRadius="lg"
          fontWeight="700"
          _hover={{ boxShadow: "lg" }}
          _active={{ transform: "scale(0.98)" }}
        >
          Sign In to Your Account
        </Button>

        {/* Footer Text */}
        <Box textAlign="center" bg="blue.50" p={4} borderRadius="lg">
          <Text fontSize="xs" color="gray.700">
            Welcome to Springboard Talent! 🎉
          </Text>
          <Text fontSize="xs" color="gray.600" mt={1}>
            Your journey to career transformation starts here.
          </Text>
        </Box>
      </VStack>
    </RegistrationLayout>
  );
}
