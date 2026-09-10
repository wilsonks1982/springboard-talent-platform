import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { authApi } from "../api/authApi";
import { setAuth } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const submit = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      setError("");

      const response = await authApi.login({
        email,
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #faf9ff 0%, #ffffff 55%, #faf9ff 100%)"
      color="gray.800"
    >
      {/* =========================================================
          HEADER
      ========================================================= */}
      <Box
        bg="rgba(255,255,255,0.92)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="purple.100"
        py={4}
        px={{ base: 5, md: 10 }}
        position="relative"
        zIndex={2}
      >
        <Container maxW="1200px" mx="auto">
          <HStack justify="space-between">
            <HStack spacing={2} cursor="pointer" onClick={() => navigate("/")}>
              <FlexBrandMark />

              <Heading
                size="md"
                color="purple.700"
                letterSpacing="-0.02em"
                _hover={{ color: "purple.800" }}
              >
                Springboard Talent
              </Heading>
            </HStack>

            <Text fontSize="sm" color="gray.600">
              Don't have an account?{" "}
              <Link
                as="span"
                color="purple.700"
                fontWeight="700"
                cursor="pointer"
                _hover={{
                  textDecoration: "underline",
                  color: "purple.800",
                }}
                onClick={() => navigate("/register/welcome")}
              >
                Sign up
              </Link>
            </Text>
          </HStack>
        </Container>
      </Box>

      {/* =========================================================
          MAIN
      ========================================================= */}
      <Box
        position="relative"
        overflow="hidden"
        py={{ base: 8, md: 16 }}
        px={{ base: 4, md: 8 }}
      >
        {/* Ambient purple glow */}
        <Box
          position="absolute"
          top="-180px"
          left="-160px"
          w="420px"
          h="420px"
          borderRadius="full"
          bg="purple.100"
          opacity={0.45}
          filter="blur(80px)"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          bottom="-180px"
          right="-140px"
          w="420px"
          h="420px"
          borderRadius="full"
          bg="purple.100"
          opacity={0.35}
          filter="blur(90px)"
          pointerEvents="none"
        />

        <Container maxW="1200px" mx="auto" position="relative">
          <Box
            display="grid"
            gridTemplateColumns={{
              base: "1fr",
              md: "1fr 1fr",
            }}
            gap={{ base: 8, md: 14 }}
            alignItems="center"
          >
            {/* =====================================================
                LEFT SIDE
            ===================================================== */}
            {!isMobile && (
              <Box>
                <VStack align="start" spacing={8}>
                  <Box>
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
                      WELCOME BACK
                    </Badge>

                    <Heading
                      mt={5}
                      fontSize={{ md: "4xl", lg: "5xl" }}
                      fontWeight="800"
                      lineHeight="1.08"
                      letterSpacing="-0.035em"
                      color="gray.900"
                    >
                      Continue your
                      <Text as="span" display="block" color="purple.700">
                        career journey.
                      </Text>
                    </Heading>

                    <Text
                      mt={5}
                      fontSize="lg"
                      color="gray.600"
                      lineHeight={1.8}
                      maxW="540px"
                    >
                      Access your personalized workspace, connect with the right
                      coaches, track your progress, and move your career
                      forward.
                    </Text>
                  </Box>

                  {/* Benefits */}
                  <VStack align="start" spacing={5}>
                    <Benefit
                      title="Personalized Coaching"
                      description="Get matched with coaches who understand your goals"
                    />

                    <Benefit
                      title="Skill Assessments"
                      description="Evaluate and strengthen your professional capabilities"
                    />

                    <Benefit
                      title="Career Growth"
                      description="Build a clearer path toward your next opportunity"
                    />
                  </VStack>

                  {/* Stats */}
                  <Box
                    pt={5}
                    w="full"
                    maxW="520px"
                    borderTop="1px solid"
                    borderColor="purple.100"
                  >
                    <HStack spacing={0} justify="space-between">
                      <Stat value="5K+" label="Active Candidates" />

                      <Divider
                        orientation="vertical"
                        h="38px"
                        borderColor="purple.100"
                      />

                      <Stat value="500+" label="Expert Coaches" />

                      <Divider
                        orientation="vertical"
                        h="38px"
                        borderColor="purple.100"
                      />

                      <Stat value="95%" label="Success Rate" />
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            )}

            {/* =====================================================
                LOGIN CARD
            ===================================================== */}
            <Box position="relative">
              {/* Purple glow behind card */}
              <Box
                position="absolute"
                inset="-12px"
                borderRadius="3xl"
                bg="purple.200"
                opacity={0.22}
                filter="blur(30px)"
                pointerEvents="none"
              />

              <Box
                position="relative"
                bg="rgba(255,255,255,0.96)"
                p={{ base: 6, md: 9 }}
                borderRadius="3xl"
                boxShadow="0 24px 70px rgba(88, 28, 135, 0.10)"
                border="1px solid"
                borderColor="purple.100"
              >
                <VStack align="stretch" spacing={6}>
                  {/* Form Header */}
                  <Box textAlign="center">
                    <Box
                      mx="auto"
                      mb={4}
                      w="52px"
                      h="52px"
                      borderRadius="2xl"
                      bg="purple.50"
                      border="1px solid"
                      borderColor="purple.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={Lock} boxSize={5} color="purple.700" />
                    </Box>

                    <Heading
                      fontSize="2xl"
                      fontWeight="800"
                      color="gray.900"
                      letterSpacing="-0.02em"
                    >
                      Sign in
                    </Heading>

                    <Text mt={2} fontSize="sm" color="gray.500">
                      Access your Springboard Talent account
                    </Text>
                  </Box>

                  {/* Error */}
                  {error && (
                    <Alert
                      status="error"
                      borderRadius="xl"
                      bg="red.50"
                      border="1px solid"
                      borderColor="red.100"
                      alignItems="flex-start"
                    >
                      <AlertIcon mt={1} />

                      <Box>
                        <Text fontWeight="700" color="red.700" fontSize="sm">
                          Login failed
                        </Text>

                        <Text color="red.600" fontSize="sm" mt={0.5}>
                          {error}
                        </Text>
                      </Box>
                    </Alert>
                  )}

                  {/* Email */}
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="700"
                      color="gray.700"
                      mb={2}
                    >
                      Email address
                    </FormLabel>

                    <InputGroup>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setError("");
                        }}
                        onKeyPress={handleKeyPress}
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        pl={11}
                        py={6}
                        fontSize="sm"
                        bg="gray.50"
                        _focus={{
                          bg: "white",
                          borderColor: "purple.500",
                          boxShadow: "0 0 0 3px rgba(128, 90, 213, 0.12)",
                        }}
                        _hover={{
                          borderColor: "purple.200",
                        }}
                        _placeholder={{
                          color: "gray.400",
                        }}
                      />

                      <InputRightElement pt={2} left={1}>
                        <Icon as={Mail} boxSize={4.5} color="gray.400" />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Password */}
                  <FormControl>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <FormLabel
                        fontSize="sm"
                        fontWeight="700"
                        color="gray.700"
                        mb={0}
                      >
                        Password
                      </FormLabel>

                      <Link
                        fontSize="xs"
                        color="purple.700"
                        fontWeight="700"
                        _hover={{
                          textDecoration: "underline",
                          color: "purple.800",
                        }}
                      >
                        Forgot password?
                      </Link>
                    </Box>

                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError("");
                        }}
                        onKeyPress={handleKeyPress}
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        pl={11}
                        py={6}
                        fontSize="sm"
                        bg="gray.50"
                        _focus={{
                          bg: "white",
                          borderColor: "purple.500",
                          boxShadow: "0 0 0 3px rgba(128, 90, 213, 0.12)",
                        }}
                        _hover={{
                          borderColor: "purple.200",
                        }}
                        _placeholder={{
                          color: "gray.400",
                        }}
                      />

                      <InputRightElement
                        cursor="pointer"
                        pt={2}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          as={showPassword ? EyeOff : Eye}
                          boxSize={4.5}
                          color="gray.400"
                          _hover={{
                            color: "purple.600",
                          }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Remember */}
                  <HStack justify="flex-start" fontSize="sm">
                    <Input
                      type="checkbox"
                      id="remember"
                      w={4}
                      h={4}
                      cursor="pointer"
                      borderRadius="md"
                      borderColor="gray.300"
                      accentColor="#805AD5"
                    />

                    <FormLabel
                      htmlFor="remember"
                      cursor="pointer"
                      mb={0}
                      color="gray.600"
                      fontSize="sm"
                      fontWeight="500"
                    >
                      Keep me signed in
                    </FormLabel>
                  </HStack>

                  {/* Sign In */}
                  <Button
                    size="lg"
                    onClick={submit}
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    fontWeight="800"
                    borderRadius="xl"
                    py={6}
                    color="white"
                    bgGradient="linear(to-r, purple.700, purple.600)"
                    rightIcon={<ArrowRight size={18} />}
                    boxShadow="0 10px 25px rgba(128, 90, 213, 0.22)"
                    _hover={{
                      bgGradient: "linear(to-r, purple.800, purple.700)",
                      boxShadow: "0 14px 30px rgba(128, 90, 213, 0.28)",
                      transform: "translateY(-1px)",
                    }}
                    _active={{
                      transform: "scale(0.985)",
                    }}
                    transition="all 0.2s ease"
                  >
                    Sign in
                  </Button>

                  {/* Sign Up */}
                  <Box
                    textAlign="center"
                    pt={5}
                    borderTop="1px solid"
                    borderColor="gray.100"
                  >
                    <Text fontSize="sm" color="gray.500">
                      New to Springboard Talent?{" "}
                      <Link
                        as="span"
                        color="purple.700"
                        fontWeight="700"
                        cursor="pointer"
                        _hover={{
                          textDecoration: "underline",
                          color: "purple.800",
                        }}
                        onClick={() => navigate("/register/welcome")}
                      >
                        Create an account
                      </Link>
                    </Text>
                  </Box>
                </VStack>

                {/* Footer Info */}
                <Box
                  mt={7}
                  pt={5}
                  borderTop="1px solid"
                  borderColor="gray.100"
                  textAlign="center"
                >
                  <Text fontSize="xs" color="gray.400" mb={2}>
                    Secure login • We never share your data
                  </Text>

                  <HStack justify="center" spacing={3} fontSize="xs">
                    <Link color="gray.400" _hover={{ color: "purple.600" }}>
                      Privacy Policy
                    </Link>

                    <Text color="gray.200">•</Text>

                    <Link color="gray.400" _hover={{ color: "purple.600" }}>
                      Terms of Service
                    </Link>

                    <Text color="gray.200">•</Text>

                    <Link color="gray.400" _hover={{ color: "purple.600" }}>
                      Contact Support
                    </Link>
                  </HStack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =========================================================
          FOOTER
      ========================================================= */}
      <Box
        bg="white"
        borderTop="1px solid"
        borderColor="purple.50"
        py={6}
        px={{ base: 5, md: 10 }}
      >
        <Container maxW="1200px" mx="auto">
          <Text fontSize="xs" color="gray.400" textAlign="center">
            &copy; 2024 Springboard Talent. All rights reserved. Helping you
            accelerate your career journey.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

/* =============================================================
   BRAND MARK
============================================================= */

function FlexBrandMark() {
  return (
    <Box
      w="30px"
      h="30px"
      borderRadius="lg"
      bgGradient="linear(to-br, purple.700, purple.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="0 5px 12px rgba(128, 90, 213, 0.22)"
    >
      <Box w="11px" h="11px" borderRadius="full" bg="white" />
    </Box>
  );
}

/* =============================================================
   BENEFIT
============================================================= */

function Benefit({ title, description }) {
  return (
    <HStack align="flex-start" spacing={4}>
      <Box
        w={11}
        h={11}
        borderRadius="xl"
        bg="purple.50"
        border="1px solid"
        borderColor="purple.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={CheckCircle} w={5} h={5} color="purple.600" />
      </Box>

      <Box>
        <Text fontWeight="700" color="gray.800" fontSize="sm">
          {title}
        </Text>

        <Text fontSize="sm" color="gray.500" mt={0.5} lineHeight="1.6">
          {description}
        </Text>
      </Box>
    </HStack>
  );
}

/* =============================================================
   STAT
============================================================= */

function Stat({ value, label }) {
  return (
    <Box>
      <Text
        fontSize="xl"
        fontWeight="800"
        color="purple.700"
        letterSpacing="-0.02em"
      >
        {value}
      </Text>

      <Text fontSize="xs" color="gray.500" mt={0.5}>
        {label}
      </Text>
    </Box>
  );
}
