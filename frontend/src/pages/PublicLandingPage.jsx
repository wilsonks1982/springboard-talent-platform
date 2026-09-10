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
import {
  CheckCircle,
  Zap,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function PublicLandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Expert Coaches",
      description:
        "Connect with industry experts who understand your career goals and challenges.",
    },
    {
      icon: Award,
      title: "Skill Assessments",
      description:
        "Comprehensive assessments designed by industry professionals to evaluate your capabilities.",
    },
    {
      icon: Zap,
      title: "Smart Matching",
      description:
        "AI-powered coach matching based on your profile, skills, and career objectives.",
    },
    {
      icon: CheckCircle,
      title: "Personalized Growth",
      description:
        "Tailored learning paths and actionable feedback to accelerate your development.",
    },
  ];

  const howItWorks = [
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
  ];

  return (
    <Box minH="100vh" bg="white" color="gray.800" overflow="hidden">
      {/* ==================== HEADER ==================== */}
      <Box
        bg="rgba(255, 255, 255, 0.94)"
        backdropFilter="blur(14px)"
        borderBottom="1px solid"
        borderColor="purple.100"
        py={4}
        px={{ base: 5, md: 10 }}
        position="sticky"
        top={0}
        zIndex={20}
      >
        <Container maxW="1200px" mx="auto">
          <HStack justify="space-between" spacing={4}>
            {/* Brand */}
            <HStack spacing={3}>
              <Box
                w="40px"
                h="40px"
                borderRadius="xl"
                bgGradient="linear(to-br, purple.700, purple.500)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 7px 18px rgba(128, 90, 213, 0.25)"
              >
                <Sparkles size={19} color="white" strokeWidth={2} />
              </Box>

              <VStack
                align="start"
                spacing={0}
                display={{ base: "none", sm: "flex" }}
              >
                <Heading
                  size="md"
                  color="purple.700"
                  fontWeight="800"
                  letterSpacing="-0.3px"
                >
                  Springboard Talent
                </Heading>

                <Text
                  fontSize="9px"
                  color="gray.500"
                  fontWeight="700"
                  textTransform="uppercase"
                  letterSpacing="0.7px"
                >
                  Career Transformation
                </Text>
              </VStack>
            </HStack>

            <Button
              variant="ghost"
              size="sm"
              color="gray.600"
              fontWeight="700"
              borderRadius="lg"
              _hover={{
                bg: "purple.50",
                color: "purple.700",
              }}
              onClick={() => navigate("/login")}
            >
              Candidate Login
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* ==================== HERO ==================== */}
      <Box
        position="relative"
        overflow="hidden"
        bgGradient="linear(to-br, purple.800, purple.700, purple.600)"
        color="white"
        py={{ base: 16, md: 24 }}
        px={{ base: 5, md: 10 }}
      >
        {/* Background decoration */}
        <Box
          position="absolute"
          top="-180px"
          right="-120px"
          w="420px"
          h="420px"
          borderRadius="full"
          bg="purple.400"
          opacity={0.18}
          filter="blur(70px)"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          bottom="-220px"
          left="-140px"
          w="420px"
          h="420px"
          borderRadius="full"
          bg="purple.300"
          opacity={0.12}
          filter="blur(80px)"
          pointerEvents="none"
        />

        <Container maxW="1000px" mx="auto" position="relative" zIndex={1}>
          <VStack
            align="center"
            spacing={{ base: 6, md: 8 }}
            textAlign="center"
          >
            {/* Eyebrow */}
            <HStack
              px={4}
              py={2}
              borderRadius="full"
              bg="whiteAlpha.150"
              border="1px solid"
              borderColor="whiteAlpha.300"
              spacing={2}
            >
              <Sparkles size={15} />

              <Text
                color="white"
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.7px"
                textTransform="uppercase"
              >
                Build Your Next Career
              </Text>
            </HStack>

            <Heading
              fontSize={{ base: "36px", sm: "46px", md: "58px" }}
              lineHeight="1.08"
              fontWeight="800"
              letterSpacing="-1.5px"
              maxW="850px"
            >
              Accelerate Your Career with{" "}
              <Box as="span" color="purple.200">
                Springboard Talent
              </Box>
            </Heading>

            <Text
              fontSize={{ base: "md", md: "xl" }}
              lineHeight="1.7"
              maxW="720px"
              color="whiteAlpha.900"
            >
              Connect with expert coaches, take assessments, and unlock your
              potential. All in one integrated platform.
            </Text>

            {/* CTA */}
            <HStack
              justify="center"
              spacing={{ base: 3, md: 4 }}
              pt={3}
              flexWrap="wrap"
            >
              <Button
                size="lg"
                px={7}
                h="52px"
                bg="white"
                color="purple.700"
                fontWeight="800"
                borderRadius="xl"
                boxShadow="0 10px 28px rgba(0, 0, 0, 0.16)"
                rightIcon={<ArrowRight size={17} />}
                _hover={{
                  bg: "purple.50",
                  transform: "translateY(-2px)",
                  boxShadow: "0 14px 32px rgba(0, 0, 0, 0.20)",
                }}
                transition="all 0.2s ease"
                onClick={() => navigate("/register/welcome")}
              >
                Get Started as Candidate
              </Button>

              <Button
                size="lg"
                px={7}
                h="52px"
                variant="outline"
                borderColor="whiteAlpha.600"
                color="white"
                fontWeight="700"
                borderRadius="xl"
                _hover={{
                  bg: "whiteAlpha.150",
                  borderColor: "white",
                }}
                onClick={() => navigate("/login")}
              >
                Sign In
              </Button>
            </HStack>

            {/* Trust points */}
            <HStack
              pt={3}
              spacing={{ base: 4, md: 7 }}
              color="whiteAlpha.800"
              flexWrap="wrap"
              justify="center"
            >
              <HStack spacing={2}>
                <ShieldCheck size={15} />
                <Text color="white" fontSize="xs">
                  Secure &amp; Private
                </Text>
              </HStack>

              <HStack spacing={2}>
                <CheckCircle size={15} />
                <Text color="white" fontSize="xs">
                  Personalized Experience
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* ==================== FEATURES ==================== */}
      <Box
        py={{ base: 16, md: 20 }}
        px={{ base: 5, md: 10 }}
        bg="linear-gradient(180deg, #faf9ff 0%, #ffffff 100%)"
      >
        <Container maxW="1200px" mx="auto">
          <VStack spacing={12} align="stretch">
            <VStack textAlign="center" spacing={3}>
              <Text
                fontSize="xs"
                fontWeight="800"
                color="purple.600"
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Everything You Need
              </Text>

              <Heading size="xl" fontWeight="800" letterSpacing="-0.6px">
                Why Choose Springboard Talent?
              </Heading>

              <Text fontSize="lg" color="gray.600" maxW="650px">
                Everything you need to succeed in your career journey.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              {features.map((feature) => (
                <Box
                  key={feature.title}
                  bg="white"
                  p={{ base: 6, md: 7 }}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="purple.100"
                  boxShadow="0 8px 24px rgba(88, 28, 135, 0.06)"
                  textAlign="center"
                  transition="all 0.25s ease"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "0 14px 30px rgba(88, 28, 135, 0.11)",
                    borderColor: "purple.200",
                  }}
                >
                  <Box
                    w="54px"
                    h="54px"
                    mx="auto"
                    mb={5}
                    borderRadius="xl"
                    bg="purple.50"
                    border="1px solid"
                    borderColor="purple.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={feature.icon} w={7} h={7} color="purple.600" />
                  </Box>

                  <Heading size="md" mb={3} fontWeight="800">
                    {feature.title}
                  </Heading>

                  <Text color="gray.600" fontSize="sm" lineHeight="1.7">
                    {feature.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ==================== HOW IT WORKS ==================== */}
      <Box py={{ base: 16, md: 20 }} px={{ base: 5, md: 10 }} bg="white">
        <Container maxW="1200px" mx="auto">
          <VStack spacing={12} align="stretch">
            <VStack textAlign="center" spacing={3}>
              <Text
                fontSize="xs"
                fontWeight="800"
                color="purple.600"
                textTransform="uppercase"
                letterSpacing="1px"
              >
                Simple Process
              </Text>

              <Heading size="xl" fontWeight="800" letterSpacing="-0.6px">
                How It Works
              </Heading>

              <Text fontSize="lg" color="gray.600">
                Get started in 4 simple steps.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
              {howItWorks.map((step) => (
                <VStack
                  key={step.num}
                  bg="purple.50"
                  p={{ base: 6, md: 7 }}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="purple.100"
                  spacing={4}
                  align="start"
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    w="48px"
                    h="48px"
                    bgGradient="linear(to-br, purple.700, purple.500)"
                    color="white"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="lg"
                    fontWeight="800"
                    boxShadow="0 7px 16px rgba(128, 90, 213, 0.22)"
                  >
                    {step.num}
                  </Box>

                  <Heading size="sm" fontWeight="800" color="gray.800">
                    {step.title}
                  </Heading>

                  <Text color="gray.600" fontSize="sm" lineHeight="1.65">
                    {step.desc}
                  </Text>
                </VStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* ==================== CTA ==================== */}
      <Box
        position="relative"
        overflow="hidden"
        bg="purple.50"
        py={{ base: 14, md: 18 }}
        px={{ base: 5, md: 10 }}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor="purple.100"
      >
        <Box
          position="absolute"
          top="-120px"
          right="-80px"
          w="300px"
          h="300px"
          borderRadius="full"
          bg="purple.200"
          opacity={0.25}
          filter="blur(60px)"
        />

        <Container maxW="800px" mx="auto" position="relative">
          <VStack spacing={7} textAlign="center">
            <Box
              w="52px"
              h="52px"
              borderRadius="xl"
              bg="white"
              border="1px solid"
              borderColor="purple.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 7px 18px rgba(128, 90, 213, 0.10)"
            >
              <Sparkles size={22} color="#805AD5" />
            </Box>

            <VStack spacing={3}>
              <Heading size="lg" fontWeight="800" letterSpacing="-0.4px">
                Ready to Transform Your Career?
              </Heading>

              <Text fontSize="md" color="gray.600" maxW="600px">
                Join thousands of candidates who are already growing with
                Springboard Talent.
              </Text>
            </VStack>

            <Button
              size="lg"
              h="50px"
              px={7}
              bgGradient="linear(to-r, purple.700, purple.600)"
              color="white"
              fontWeight="800"
              borderRadius="xl"
              boxShadow="0 10px 24px rgba(128, 90, 213, 0.25)"
              rightIcon={<ArrowRight size={17} />}
              _hover={{
                bgGradient: "linear(to-r, purple.800, purple.700)",
                transform: "translateY(-2px)",
                boxShadow: "0 14px 30px rgba(128, 90, 213, 0.30)",
              }}
              transition="all 0.2s ease"
              onClick={() => navigate("/register/welcome")}
            >
              Get Started Now
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* ==================== FOOTER ==================== */}
      <Box bg="gray.950" color="gray.300" py={10} px={{ base: 5, md: 10 }}>
        <Container maxW="1200px" mx="auto" w="100%">
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={9} mb={9}>
            {/* Brand */}
            <VStack align="start" spacing={4}>
              <HStack spacing={2.5}>
                <Box
                  w="30px"
                  h="30px"
                  borderRadius="lg"
                  bgGradient="linear(to-br, purple.700, purple.500)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Sparkles size={15} color="white" />
                </Box>

                <Heading size="sm" color="white">
                  Springboard Talent
                </Heading>
              </HStack>

              <Text fontSize="sm" color="gray.400" lineHeight="1.7">
                Accelerating careers through expert coaching and skill
                development.
              </Text>
            </VStack>

            {/* Product */}
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                Product
              </Heading>

              {["Assessments", "Coach Matching", "Learning Paths"].map(
                (item) => (
                  <Text
                    key={item}
                    fontSize="sm"
                    color="gray.400"
                    _hover={{
                      color: "purple.300",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </Text>
                ),
              )}
            </VStack>

            {/* Company */}
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                Company
              </Heading>

              {["About Us", "Blog", "Careers"].map((item) => (
                <Text
                  key={item}
                  fontSize="sm"
                  color="gray.400"
                  _hover={{
                    color: "purple.300",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </Text>
              ))}
            </VStack>

            {/* Legal */}
            <VStack align="start" spacing={3}>
              <Heading size="sm" color="white">
                Legal
              </Heading>

              {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <Text
                  key={item}
                  fontSize="sm"
                  color="gray.400"
                  _hover={{
                    color: "purple.300",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </Text>
              ))}
            </VStack>
          </SimpleGrid>

          <Divider borderColor="gray.800" />

          <HStack justify="space-between" flexWrap="wrap" gap={4} pt={6}>
            <Text fontSize="sm" color="gray.500">
              &copy; 2024 Springboard Talent. All rights reserved.
            </Text>

            <HStack spacing={6} fontSize="sm" color="gray.500">
              {["Twitter", "LinkedIn", "Facebook"].map((item) => (
                <Text
                  key={item}
                  _hover={{
                    color: "purple.300",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </Text>
              ))}
            </HStack>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
