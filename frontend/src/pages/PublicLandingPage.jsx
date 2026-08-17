import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Zap, Users, Award } from "lucide-react";

export default function PublicLandingPage() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" bg="white">
      {/* Header/Navigation */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={{ base: 5, md: 10 }}
      >
        <Container maxW="1200px" mx="auto">
          <HStack justify="space-between">
            <Heading size="md" color="blue.600">
              Springboard Talent
            </Heading>
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Candidate Login
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        py={{ base: 16, md: 24 }}
        px={{ base: 5, md: 10 }}
      >
        <Container maxW="1200px" mx="auto">
          <VStack align="stretch" spacing={8} textAlign="center">
            <Heading size="2xl" fontWeight="800">
              Accelerate Your Career with Springboard Talent
            </Heading>
            <Text fontSize="xl" opacity={0.95}>
              Connect with expert coaches, take assessments, and unlock your
              potential. All in one integrated platform.
            </Text>

            {/* CTA Buttons */}
            <HStack justify="center" spacing={6} pt={4}>
              <Button
                size="lg"
                bg="white"
                color="blue.600"
                fontWeight="700"
                _hover={{ bg: "gray.100" }}
                onClick={() => navigate("/register/welcome")}
              >
                Get Started as Candidate
              </Button>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                fontWeight="700"
                _hover={{ bg: "whiteAlpha.200" }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={{ base: 16, md: 20 }} px={{ base: 5, md: 10 }} bg="gray.50">
        <Container maxW="1200px" mx="auto">
          <VStack spacing={12} align="stretch">
            <VStack textAlign="center" spacing={3}>
              <Heading size="xl">Why Choose Springboard Talent?</Heading>
              <Text fontSize="lg" color="gray.600">
                Everything you need to succeed in your career journey
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
              {/* Feature 1 */}
              <Box
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="sm"
                textAlign="center"
              >
                <Icon
                  as={Users}
                  w={10}
                  h={10}
                  color="blue.600"
                  mx="auto"
                  mb={4}
                />
                <Heading size="md" mb={3}>
                  Expert Coaches
                </Heading>
                <Text color="gray.600">
                  Connect with industry experts who understand your career goals
                  and challenges.
                </Text>
              </Box>

              {/* Feature 2 */}
              <Box
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="sm"
                textAlign="center"
              >
                <Icon
                  as={Award}
                  w={10}
                  h={10}
                  color="blue.600"
                  mx="auto"
                  mb={4}
                />
                <Heading size="md" mb={3}>
                  Skill Assessments
                </Heading>
                <Text color="gray.600">
                  Comprehensive assessments designed by industry professionals
                  to evaluate your capabilities.
                </Text>
              </Box>

              {/* Feature 3 */}
              <Box
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="sm"
                textAlign="center"
              >
                <Icon
                  as={Zap}
                  w={10}
                  h={10}
                  color="blue.600"
                  mx="auto"
                  mb={4}
                />
                <Heading size="md" mb={3}>
                  Smart Matching
                </Heading>
                <Text color="gray.600">
                  AI-powered coach matching based on your profile, skills, and
                  career objectives.
                </Text>
              </Box>

              {/* Feature 4 */}
              <Box
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="sm"
                textAlign="center"
              >
                <Icon
                  as={CheckCircle}
                  w={10}
                  h={10}
                  color="blue.600"
                  mx="auto"
                  mb={4}
                />
                <Heading size="md" mb={3}>
                  Personalized Growth
                </Heading>
                <Text color="gray.600">
                  Tailored learning paths and actionable feedback to accelerate
                  your development.
                </Text>
              </Box>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={{ base: 16, md: 20 }} px={{ base: 5, md: 10 }}>
        <Container maxW="1200px" mx="auto">
          <VStack spacing={12} align="stretch">
            <VStack textAlign="center" spacing={3}>
              <Heading size="xl">How It Works</Heading>
              <Text fontSize="lg" color="gray.600">
                Get started in 4 simple steps
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
              {[
                {
                  num: "1",
                  title: "Create Account",
                  desc: "Sign up and complete your profile in minutes",
                },
                {
                  num: "2",
                  title: "Take Assessments",
                  desc: "Evaluate your skills with our comprehensive tests",
                },
                {
                  num: "3",
                  title: "Get Matched",
                  desc: "Connect with the perfect coach for your goals",
                },
                {
                  num: "4",
                  title: "Grow & Succeed",
                  desc: "Achieve your career objectives with expert guidance",
                },
              ].map((step) => (
                <VStack
                  key={step.num}
                  bg="gray.50"
                  p={6}
                  borderRadius="lg"
                  spacing={4}
                  align="start"
                >
                  <Box
                    bg="blue.600"
                    color="white"
                    w={12}
                    h={12}
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="xl"
                    fontWeight="700"
                  >
                    {step.num}
                  </Box>
                  <Heading size="sm">{step.title}</Heading>
                  <Text color="gray.600" fontSize="sm">
                    {step.desc}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        bg="blue.50"
        py={{ base: 12, md: 16 }}
        px={{ base: 5, md: 10 }}
        borderTop="1px solid"
        borderColor="gray.200"
      >
        <Container maxW="1200px" mx="auto">
          <VStack spacing={8} textAlign="center">
            <Heading size="lg">Ready to Transform Your Career?</Heading>
            <Text fontSize="md" color="gray.600">
              Join thousands of candidates who are already growing with
              Springboard Talent.
            </Text>
            <Button
              size="lg"
              colorScheme="blue"
              onClick={() => navigate("/register/welcome")}
            >
              Get Started Now
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.800" color="gray.100" py={8} px={{ base: 5, md: 10 }}>
        <Container maxW="1200px" mx="auto" w="100%">
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8} mb={8}>
            <VStack align="start" spacing={4}>
              <Heading size="sm" color="white">
                Springboard Talent
              </Heading>
              <Text fontSize="sm">
                Accelerating careers through expert coaching and skill
                development.
              </Text>
            </VStack>
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                Product
              </Heading>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Assessments
              </Text>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Coach Matching
              </Text>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Learning Paths
              </Text>
            </VStack>
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                Company
              </Heading>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                About Us
              </Text>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Blog
              </Text>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Careers
              </Text>
            </VStack>
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                Legal
              </Heading>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Privacy Policy
              </Text>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Terms of Service
              </Text>
              <Text
                fontSize="sm"
                as="a"
                _hover={{ color: "white", cursor: "pointer" }}
              >
                Contact
              </Text>
            </VStack>
          </SimpleGrid>

          <Divider my={6} borderColor="gray.700" />

          <HStack justify="space-between" flexWrap="wrap" gap={4}>
            <Text fontSize="sm">
              &copy; 2024 Springboard Talent. All rights reserved.
            </Text>
            <HStack spacing={6} fontSize="sm">
              <Text as="a" _hover={{ color: "white", cursor: "pointer" }}>
                Twitter
              </Text>
              <Text as="a" _hover={{ color: "white", cursor: "pointer" }}>
                LinkedIn
              </Text>
              <Text as="a" _hover={{ color: "white", cursor: "pointer" }}>
                Facebook
              </Text>
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
