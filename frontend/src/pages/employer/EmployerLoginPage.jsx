import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
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
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import BrandMark from "../../components/brand/BrandMark";
import BrandWordmark from "../../components/brand/BrandWordmark";
import { authApi } from "../../api/authApi";
import { setAuth } from "../../store/authSlice";

export default function EmployerLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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

      navigate("/employer", { replace: true });
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Unable to sign in. Please check your email and password.",
      );
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
          <Flex align="center" justify="space-between" gap={6}>
            {/* Brand */}
            <HStack spacing={3} cursor="pointer" onClick={() => navigate("/")}>
              <BrandMark />
              <BrandWordmark />
            </HStack>

            {/* Registration link */}
            <Text
              fontSize="sm"
              color="taupe.600"
              display={{ base: "none", sm: "block" }}
            >
              New to Springboard?{" "}
              <Link
                as="span"
                color="brand.500"
                fontWeight="700"
                cursor="pointer"
                onClick={() => navigate("/employer/register")}
                _hover={{
                  color: "brand.600",
                  textDecoration: "underline",
                }}
              >
                Create Employer Account
              </Link>
            </Text>
          </Flex>
        </Container>
      </Box>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <Box
        minH={{
          base: "calc(100vh - 82px)",
          lg: "calc(100vh - 82px)",
        }}
        py={{ base: 10, md: 16, lg: 20 }}
        px={{ base: 5, md: 8 }}
      >
        <Container maxW="1180px">
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            gap={{ base: 12, lg: 20 }}
            alignItems="center"
          >
            {/* =====================================================
                LEFT — EMPLOYER MESSAGE
            ===================================================== */}
            <Box display={{ base: "none", lg: "block" }}>
              <VStack align="stretch" spacing={8}>
                <Box>
                  <HStack spacing={3} mb={6}>
                    <Flex
                      w="42px"
                      h="42px"
                      align="center"
                      justify="center"
                      border="1px solid"
                      borderColor="accent.500"
                      color="accent.600"
                    >
                      <Icon as={BriefcaseBusiness} boxSize="20px" />
                    </Flex>

                    <Text textStyle="overline" color="accent.600">
                      Employer Workspace
                    </Text>
                  </HStack>

                  <Heading
                    fontSize={{ md: "4xl", lg: "5xl" }}
                    fontWeight="500"
                    color="brand.500"
                    lineHeight="1.08"
                    letterSpacing="-0.025em"
                  >
                    Build your team
                    <Box as="span" display="block">
                      around potential.
                    </Box>
                  </Heading>

                  <Box w="58px" h="2px" bg="accent.500" mt={7} mb={7} />

                  <Text
                    fontSize="md"
                    color="taupe.600"
                    lineHeight="1.9"
                    maxW="500px"
                  >
                    Sign in to manage your organization, define hiring needs,
                    discover qualified talent, and move the right candidates
                    through your hiring journey.
                  </Text>
                </Box>

                {/* Employer benefits */}
                <VStack align="stretch" spacing={4} pt={2}>
                  <EmployerBenefit>
                    Manage your organization's hiring workspace.
                  </EmployerBenefit>

                  <EmployerBenefit>
                    Define roles and talent requirements.
                  </EmployerBenefit>

                  <EmployerBenefit>
                    Discover and evaluate qualified candidates.
                  </EmployerBenefit>

                  <EmployerBenefit>
                    Build stronger teams with confidence.
                  </EmployerBenefit>
                </VStack>

                <Box
                  borderLeft="2px solid"
                  borderColor="accent.500"
                  pl={5}
                  pt={2}
                >
                  <Text
                    fontFamily="heading"
                    fontSize="xl"
                    fontStyle="italic"
                    color="brand.500"
                  >
                    Find Your Gold Standard.
                  </Text>

                  <Text mt={2} fontSize="sm" color="taupe.500" lineHeight="1.7">
                    Springboard Talent Partners
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* =====================================================
                RIGHT — LOGIN FORM
            ===================================================== */}
            <Box
              bg="white"
              border="1px solid"
              borderColor="cream.400"
              boxShadow="0 18px 50px rgba(46, 42, 40, 0.08)"
              borderRadius="6px"
              position="relative"
              overflow="hidden"
            >
              {/* Gold top rule */}
              <Box h="4px" bg="accent.500" />

              <Box p={{ base: 7, md: 10, lg: 12 }}>
                <VStack align="stretch" spacing={7}>
                  {/* Form heading */}
                  <Box>
                    <Text textStyle="overline" mb={3}>
                      Employer Sign In
                    </Text>

                    <Heading
                      fontSize={{ base: "3xl", md: "4xl" }}
                      fontWeight="500"
                      color="brand.500"
                      lineHeight="1.15"
                    >
                      Welcome back.
                    </Heading>

                    <Text
                      mt={3}
                      color="taupe.600"
                      fontSize="sm"
                      lineHeight="1.7"
                    >
                      Sign in to continue to your employer workspace.
                    </Text>
                  </Box>

                  {/* Error */}
                  {error && (
                    <Alert
                      status="error"
                      border="1px solid"
                      borderColor="error.200"
                      bg="error.50"
                      color="error.700"
                      borderRadius="4px"
                      alignItems="flex-start"
                    >
                      <AlertIcon mt="2px" />
                      <Text fontSize="sm">{error}</Text>
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
                          <Icon as={Mail} boxSize="17px" color="taupe.500" />
                        </InputLeftElement>

                        <Input
                          type="email"
                          value={email}
                          onChange={(event) => {
                            setEmail(event.target.value);
                            if (error) setError("");
                          }}
                          onKeyDown={handleKeyDown}
                          placeholder="you@company.com"
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
                          fontSize="xs"
                          color="brand.500"
                          fontWeight="600"
                          mb={2}
                          cursor="pointer"
                          onClick={() => {
                            // Password recovery will be wired when the
                            // backend recovery flow is available.
                          }}
                          _hover={{
                            color: "brand.600",
                            textDecoration: "underline",
                          }}
                        >
                          Forgot password?
                        </Link>
                      </Flex>

                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <Icon
                            as={LockKeyhole}
                            boxSize="17px"
                            color="taupe.500"
                          />
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
                            minW="36px"
                            h="36px"
                            px={0}
                            color="taupe.500"
                            onClick={() =>
                              setShowPassword((current) => !current)
                            }
                            _hover={{
                              bg: "cream.200",
                              color: "brand.500",
                            }}
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
                      width="100%"
                      mt={2}
                      rightIcon={
                        !isLoading ? <ArrowRight size={17} /> : undefined
                      }
                      isLoading={isLoading}
                      loadingText="Signing in..."
                    >
                      Sign in to Employer Workspace
                    </Button>
                  </VStack>

                  {/* Divider */}
                  <Flex align="center" gap={4}>
                    <Box flex="1" h="1px" bg="cream.400" />
                    <Text fontSize="xs" color="taupe.500" whiteSpace="nowrap">
                      New employer?
                    </Text>
                    <Box flex="1" h="1px" bg="cream.400" />
                  </Flex>

                  {/* Register */}
                  <Button
                    variant="outlineGold"
                    size="md"
                    width="100%"
                    onClick={() => navigate("/employer/register")}
                  >
                    Create Employer Account
                  </Button>

                  {/* Back */}
                  <Button
                    variant="ghostBrand"
                    size="sm"
                    width="100%"
                    onClick={() => navigate("/")}
                  >
                    Back to Springboard
                  </Button>
                </VStack>
              </Box>
            </Box>
          </SimpleGrid>

          {/* =====================================================
              MOBILE BRAND MESSAGE
          ===================================================== */}
          <Box
            display={{ base: "block", lg: "none" }}
            mt={12}
            textAlign="center"
          >
            <Text
              fontFamily="heading"
              fontSize="xl"
              fontStyle="italic"
              color="brand.500"
            >
              Find Your Gold Standard.
            </Text>

            <Text mt={2} fontSize="xs" color="taupe.500" letterSpacing="0.08em">
              SPRINGBOARD TALENT PARTNERS
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

/* =============================================================
   EMPLOYER BENEFIT
============================================================= */

function EmployerBenefit({ children }) {
  return (
    <HStack spacing={3} align="start">
      <Flex
        mt="2px"
        w="20px"
        h="20px"
        align="center"
        justify="center"
        border="1px solid"
        borderColor="accent.500"
        color="accent.600"
        flexShrink={0}
      >
        <Icon as={CheckCircle2} boxSize="12px" />
      </Flex>

      <Text fontSize="14px" color="taupe.600" lineHeight="1.65">
        {children}
      </Text>
    </HStack>
  );
}
