import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
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
import { Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
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
      const response = await authApi.login({ email, password });
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
    <Box minH="100vh" bg="white">
      {/* Header */}
      <Box
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        py={4}
        px={{ base: 5, md: 10 }}
      >
        <Container maxW="1200px" mx="auto">
          <HStack justify="space-between">
            <Heading
              size="md"
              color="blue.600"
              cursor="pointer"
              onClick={() => navigate("/")}
              _hover={{ opacity: 0.8 }}
            >
              Springboard Talent
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Don't have an account?{" "}
              <Link
                as="span"
                color="blue.600"
                fontWeight="600"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate("/register/welcome")}
              >
                Sign up
              </Link>
            </Text>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Box py={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
        <Container maxW="1200px" mx="auto">
          <Box
            display="grid"
            gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={{ base: 8, md: 12 }}
            alignItems="center"
          >
            {/* Left Side - Info Section */}
            {!isMobile && (
              <Box>
                <VStack align="start" spacing={8}>
                  <Box>
                    <Text
                      fontWeight="700"
                      fontSize="sm"
                      color="blue.600"
                      letterSpacing="wider"
                      mb={2}
                    >
                      WELCOME BACK
                    </Text>
                    <Heading size="2xl" color="gray.800" mb={4}>
                      Continue Your Career Journey
                    </Heading>
                    <Text fontSize="lg" color="gray.600" lineHeight={1.8}>
                      Access your personalized workspace, view coach matches,
                      track your assessments, and accelerate your career growth.
                    </Text>
                  </Box>

                  <VStack align="start" spacing={4}>
                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        borderRadius="full"
                        bg="blue.50"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Icon as={CheckCircle} w={6} h={6} color="blue.600" />
                      </Box>
                      <Box>
                        <Text fontWeight="600" color="gray.800">
                          Personalized Coaching
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Get matched with coaches who understand your goals
                        </Text>
                      </Box>
                    </HStack>

                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        borderRadius="full"
                        bg="blue.50"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Icon as={CheckCircle} w={6} h={6} color="blue.600" />
                      </Box>
                      <Box>
                        <Text fontWeight="600" color="gray.800">
                          Skill Assessments
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Evaluate and improve your professional capabilities
                        </Text>
                      </Box>
                    </HStack>

                    <HStack spacing={4}>
                      <Box
                        w={12}
                        h={12}
                        borderRadius="full"
                        bg="blue.50"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Icon as={CheckCircle} w={6} h={6} color="blue.600" />
                      </Box>
                      <Box>
                        <Text fontWeight="600" color="gray.800">
                          Career Growth
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Accelerate your professional development journey
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>

                  {/* Stats */}
                  <Box pt={4} w="full">
                    <HStack spacing={6} justify="space-between">
                      <Box>
                        <Text fontSize="2xl" fontWeight="700" color="blue.600">
                          5K+
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Active Candidates
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="2xl" fontWeight="700" color="blue.600">
                          500+
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Expert Coaches
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize="2xl" fontWeight="700" color="blue.600">
                          95%
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Success Rate
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            )}

            {/* Right Side - Login Form */}
            <Box>
              <Box
                bg="white"
                p={{ base: 6, md: 8 }}
                borderRadius="2xl"
                boxShadow="0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)"
                border="1px solid"
                borderColor="gray.100"
              >
                <VStack align="stretch" spacing={6}>
                  {/* Form Header */}
                  <Box textAlign="center" mb={2}>
                    <Heading size="lg" color="gray.800" mb={2}>
                      Sign In
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                      Access your Springboard Talent account
                    </Text>
                  </Box>

                  {/* Error Alert */}
                  {error && (
                    <Alert
                      status="error"
                      borderRadius="lg"
                      bg="red.50"
                      borderLeft="4px solid"
                      borderColor="red.500"
                    >
                      <AlertIcon color="red.500" />
                      <Box>
                        <Text fontWeight="600" color="red.700" fontSize="sm">
                          Login Failed
                        </Text>
                        <Text color="red.600" fontSize="sm">
                          {error}
                        </Text>
                      </Box>
                    </Alert>
                  )}

                  {/* Email Field */}
                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="600"
                      color="gray.700"
                      mb={2}
                    >
                      Email Address
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
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        pl={10}
                        py={6}
                        fontSize="sm"
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                        }}
                        _hover={{ borderColor: "gray.300" }}
                        _placeholder={{ color: "gray.400" }}
                      />
                      <InputRightElement pt={2}>
                        <Icon as={Mail} w={5} h={5} color="gray.400" />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Password Field */}
                  <FormControl>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <FormLabel
                        fontSize="sm"
                        fontWeight="600"
                        color="gray.700"
                        mb={0}
                      >
                        Password
                      </FormLabel>
                      <Link
                        fontSize="xs"
                        color="blue.600"
                        fontWeight="600"
                        _hover={{ textDecoration: "underline" }}
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
                        borderRadius="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        pl={10}
                        py={6}
                        fontSize="sm"
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                        }}
                        _hover={{ borderColor: "gray.300" }}
                        _placeholder={{ color: "gray.400" }}
                      />
                      <InputRightElement
                        cursor="pointer"
                        pt={2}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon
                          as={showPassword ? EyeOff : Eye}
                          w={5}
                          h={5}
                          color="gray.400"
                          _hover={{ color: "gray.600" }}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Remember Me */}
                  <HStack justify="flex-start" fontSize="sm">
                    <Input
                      type="checkbox"
                      id="remember"
                      w={4}
                      h={4}
                      cursor="pointer"
                      borderRadius="md"
                      borderColor="gray.300"
                    />
                    <FormLabel
                      htmlFor="remember"
                      cursor="pointer"
                      mb={0}
                      color="gray.700"
                      fontSize="sm"
                      fontWeight="500"
                    >
                      Keep me signed in
                    </FormLabel>
                  </HStack>

                  {/* Sign In Button */}
                  <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={submit}
                    isLoading={isLoading}
                    loadingText="Signing in..."
                    fontWeight="700"
                    borderRadius="lg"
                    py={6}
                    rightIcon={<ArrowRight />}
                    _hover={{ boxShadow: "lg" }}
                    _active={{ transform: "scale(0.98)" }}
                  >
                    Sign In
                  </Button>

                  {/* Sign Up Link */}
                  <Box
                    textAlign="center"
                    pt={4}
                    borderTop="1px solid"
                    borderColor="gray.200"
                  >
                    <Text fontSize="sm" color="gray.600">
                      New to Springboard Talent?{" "}
                      <Link
                        as="span"
                        color="blue.600"
                        fontWeight="600"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => navigate("/register/welcome")}
                      >
                        Create an account
                      </Link>
                    </Text>
                  </Box>
                </VStack>

                {/* Footer Info */}
                <Box
                  mt={8}
                  pt={6}
                  borderTop="1px solid"
                  borderColor="gray.200"
                  textAlign="center"
                >
                  <Text fontSize="xs" color="gray.500" mb={2}>
                    Secure login • We never share your data
                  </Text>
                  <HStack justify="center" spacing={4} fontSize="xs">
                    <Link color="gray.500" _hover={{ color: "gray.700" }}>
                      Privacy Policy
                    </Link>
                    <Text color="gray.300">•</Text>
                    <Link color="gray.500" _hover={{ color: "gray.700" }}>
                      Terms of Service
                    </Link>
                    <Text color="gray.300">•</Text>
                    <Link color="gray.500" _hover={{ color: "gray.700" }}>
                      Contact Support
                    </Link>
                  </HStack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        bg="gray.50"
        borderTop="1px solid"
        borderColor="gray.200"
        py={6}
        px={{ base: 5, md: 10 }}
        mt={16}
      >
        <Container maxW="1200px" mx="auto">
          <Text fontSize="xs" color="gray.600" textAlign="center">
            &copy; 2024 Springboard Talent. All rights reserved. | Helping you
            accelerate your career journey.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
