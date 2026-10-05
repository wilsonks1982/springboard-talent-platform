import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

import { authApi } from "../api/authApi";
import { setAuth } from "../store/authSlice";
import BrandMark from "../components/brand/BrandMark";
import BrandWordmark from "../components/brand/BrandWordmark";

function Benefit({ children }) {
  return (
    <HStack spacing={3} align="start">
      <Flex
        mt="2px"
        w="20px"
        h="20px"
        align="center"
        justify="center"
        borderRadius="full"
        bg="accent.50"
        color="accent.600"
        flexShrink={0}
      >
        <Icon as={CheckCircle2} boxSize="13px" />
      </Flex>

      <Text fontSize="14px" lineHeight="1.6" color="taupe.600">
        {children}
      </Text>
    </HStack>
  );
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authApi.login({
        email: email.trim(),
        password,
      });

      dispatch(
        setAuth({
          accessToken: response.data.accessToken,
          user: response.data.user,
        }),
      );

      navigate("/candidate", { replace: true });
    } catch (e) {
      setError(e.response?.data?.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  return (
    <Box minH="100vh" bg="cream.100" color="charcoal.800">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <Box
        bg="rgba(255,255,255,0.94)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="cream.400"
        position="relative"
        zIndex={2}
      >
        <Container maxW="1280px" py={4} px={{ base: 5, md: 8 }}>
          <Flex align="center" justify="space-between">
            {/* Brand */}
            <HStack spacing={3} cursor="pointer" onClick={() => navigate("/")}>
              <BrandMark />
              <BrandWordmark />
            </HStack>

            {/* Registration */}
            <HStack spacing={{ base: 2, md: 4 }}>
              <Text
                display={{ base: "none", sm: "block" }}
                fontSize="13px"
                color="taupe.600"
              >
                New to Springboard?
              </Text>

              <Button
                variant="outlineGold"
                size="sm"
                onClick={() => navigate("/register/welcome")}
              >
                Create account
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <Container
        maxW="1280px"
        minH={{
          base: "calc(100vh - 77px)",
          lg: "calc(100vh - 77px)",
        }}
        px={{ base: 5, md: 8 }}
        py={{ base: 8, md: 12, lg: 16 }}
      >
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={{ base: 10, lg: 20 }}
          alignItems="center"
          minH={{ lg: "calc(100vh - 205px)" }}
        >
          {/* =====================================================
              LEFT — BRAND STORY
          ===================================================== */}
          <Box display={{ base: "none", lg: "block" }} pr={8}>
            <VStack align="start" spacing={8}>
              <Box>
                <HStack spacing={3} mb={5}>
                  <Box w="28px" h="1px" bg="accent.500" />

                  <Text textStyle="overline" color="taupe.500">
                    Candidate Platform
                  </Text>
                </HStack>

                <Heading
                  fontFamily="heading"
                  fontSize={{ lg: "48px", xl: "56px" }}
                  lineHeight="1.08"
                  fontWeight="500"
                  color="brand.500"
                  letterSpacing="-0.025em"
                  maxW="620px"
                >
                  Your Potential.
                  <br />
                  <Box as="span" color="charcoal.800">
                    Your Platform.
                  </Box>
                </Heading>

                <Text
                  mt={7}
                  maxW="540px"
                  fontSize="17px"
                  lineHeight="1.8"
                  color="taupe.600"
                >
                  Your career is more than a job search. Build a profile that
                  reflects your experience, direction and potential — and let
                  the right opportunities find you.
                </Text>
              </Box>

              {/* Gold statement */}
              <Box
                position="relative"
                pl={6}
                py={2}
                borderLeft="2px solid"
                borderColor="accent.500"
              >
                <Text
                  fontFamily="heading"
                  fontSize="30px"
                  lineHeight="1.25"
                  fontStyle="italic"
                  fontWeight="500"
                  color="brand.500"
                >
                  Find Your Gold Standard.
                </Text>

                <Text mt={2} fontSize="13px" color="taupe.500">
                  Grow. Outgrow.
                </Text>
              </Box>

              {/* Benefits */}
              <VStack align="stretch" spacing={4} w="full" maxW="500px">
                <Benefit>Build a compelling professional profile.</Benefit>

                <Benefit>Define where you want your career to go.</Benefit>

                <Benefit>
                  Connect with opportunities aligned to your potential.
                </Benefit>
              </VStack>

              <HStack pt={2} spacing={3} color="taupe.500">
                <Icon as={Sparkles} boxSize="15px" color="accent.500" />

                <Text
                  fontSize="11px"
                  fontWeight="700"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                >
                  Progress. Elevate.
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* =====================================================
              RIGHT — LOGIN PANEL
          ===================================================== */}
          <Flex justify={{ base: "center", lg: "flex-end" }}>
            <Box
              w="full"
              maxW="500px"
              bg="white"
              border="1px solid"
              borderColor="cream.400"
              borderRadius="8px"
              boxShadow="0 18px 55px rgba(46, 42, 40, 0.08)"
              px={{ base: 6, md: 10 }}
              py={{ base: 8, md: 10 }}
            >
              <VStack align="stretch" spacing={7}>
                {/* Panel heading */}
                <Box>
                  <Text textStyle="overline" color="accent.600" mb={3}>
                    Candidate Access
                  </Text>

                  <Heading
                    fontFamily="heading"
                    fontSize={{ base: "30px", md: "34px" }}
                    fontWeight="500"
                    lineHeight="1.15"
                    color="brand.500"
                  >
                    Welcome back.
                  </Heading>

                  <Text
                    mt={3}
                    fontSize="14px"
                    lineHeight="1.7"
                    color="taupe.600"
                  >
                    Sign in to continue building your professional journey.
                  </Text>
                </Box>

                {/* Error */}
                {error && (
                  <Alert
                    status="error"
                    variant="subtle"
                    borderRadius="5px"
                    border="1px solid"
                    borderColor="error.200"
                  >
                    <AlertIcon />
                    <Text fontSize="13px">{error}</Text>
                  </Alert>
                )}

                {/* Form */}
                <VStack
                  as="form"
                  align="stretch"
                  spacing={5}
                  onSubmit={(event) => {
                    event.preventDefault();
                    submit();
                  }}
                >
                  {/* Email */}
                  <FormControl>
                    <FormLabel>Email address</FormLabel>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={Mail} boxSize="17px" color="taupe.400" />
                      </InputLeftElement>

                      <Input
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          if (error) setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="you@example.com"
                        autoComplete="email"
                        autoFocus
                        pl="42px"
                      />
                    </InputGroup>
                  </FormControl>

                  {/* Password */}
                  <FormControl>
                    <Flex justify="space-between" align="center">
                      <FormLabel mb={2}>Password</FormLabel>

                      <Link
                        as="button"
                        type="button"
                        fontSize="12px"
                        color="brand.500"
                        fontWeight="700"
                        mb={2}
                        onClick={() => {
                          // Keep this visually available without
                          // introducing a route that does not exist yet.
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Flex>

                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={Lock} boxSize="17px" color="taupe.400" />
                      </InputLeftElement>

                      <Input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                          if (error) setError("");
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        pl="42px"
                        pr="48px"
                      />

                      <InputRightElement>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          minW="auto"
                          px={2}
                          color="taupe.500"
                          _hover={{
                            color: "brand.500",
                            bg: "transparent",
                          }}
                          onClick={() => setShowPassword((current) => !current)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          <Icon
                            as={showPassword ? EyeOff : Eye}
                            boxSize="17px"
                          />
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    w="full"
                    mt={1}
                    isLoading={isLoading}
                    loadingText="Signing in"
                    rightIcon={
                      !isLoading ? <ArrowRight size={17} /> : undefined
                    }
                  >
                    Sign in to Springboard
                  </Button>
                </VStack>

                {/* Divider */}
                <HStack spacing={4}>
                  <Divider borderColor="cream.400" />

                  <Text
                    fontSize="10px"
                    fontWeight="800"
                    letterSpacing="0.12em"
                    textTransform="uppercase"
                    color="taupe.400"
                    whiteSpace="nowrap"
                  >
                    New candidate
                  </Text>

                  <Divider borderColor="cream.400" />
                </HStack>

                {/* Registration CTA */}
                <Box
                  p={4}
                  bg="cream.100"
                  border="1px solid"
                  borderColor="cream.400"
                  borderRadius="5px"
                >
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "stretch", sm: "center" }}
                    justify="space-between"
                    gap={4}
                  >
                    <Box>
                      <Text
                        fontSize="13px"
                        fontWeight="700"
                        color="charcoal.800"
                      >
                        Start your journey
                      </Text>

                      <Text mt={1} fontSize="12px" color="taupe.600">
                        Create your candidate profile.
                      </Text>
                    </Box>

                    <Button
                      variant="outlineGold"
                      size="sm"
                      flexShrink={0}
                      onClick={() => navigate("/register/welcome")}
                    >
                      Create account
                    </Button>
                  </Flex>
                </Box>

                {/* Employer path */}
                <Box textAlign="center" pt={1}>
                  <Text fontSize="12px" color="taupe.500">
                    Are you an employer?{" "}
                    <Link
                      as="button"
                      type="button"
                      color="brand.500"
                      fontWeight="700"
                      onClick={() => navigate("/employer/login")}
                    >
                      Employer sign in
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Flex>
        </SimpleGrid>
      </Container>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Box borderTop="1px solid" borderColor="cream.400" bg="white">
        <Container maxW="1280px" px={{ base: 5, md: 8 }} py={5}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            align={{ base: "start", sm: "center" }}
            justify="space-between"
            gap={3}
          >
            <Text fontSize="11px" color="taupe.500">
              © 2026 Springboard Talent Partners
            </Text>

            <HStack spacing={2}>
              <Box w="4px" h="4px" bg="accent.500" />

              <Text
                fontSize="10px"
                fontWeight="800"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="taupe.500"
              >
                Grow. Outgrow.
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
