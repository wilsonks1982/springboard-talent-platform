import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  HStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Phone, MapPin, User } from "lucide-react";
import RegistrationLayout from "../../components/RegistrationLayout";
import {
  updateAccount,
  setSituation,
  setStep,
  setError,
  setUserId,
} from "../../store/registrationSlice";
import { normalizePhone, validateAccount } from "../../utils/validation";
import { setAuth } from "../../store/authSlice";
import { authApi } from "../../api/authApi";

export default function OnboardingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, employmentSituation, error } = useSelector(
    (s) => s.registration,
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field, value) => {
    dispatch(updateAccount({ [field]: value }));
  };

  const submit = async () => {
    // Validate account fields
    const validation = validateAccount(account);
    setErrors(validation);

    if (Object.keys(validation).length || !employmentSituation) {
      if (!employmentSituation) {
        dispatch(setError("Please select your employment situation."));
      }
      return;
    }

    setIsLoading(true);
    try {
      dispatch(setError(null));

      // Normalize phone
      const normalizedAccount = {
        ...account,
        phone: normalizePhone(account.phone),
      };

      // Create account
      const response = await authApi.register({
        ...normalizedAccount,
        employmentSituation,
      });

      // Store user data and access token
      dispatch(setUserId(response.data.userId));
      dispatch(
        setAuth({
          accessToken: response.data.accessToken,
          user: {
            id: response.data.userId,
            email: response.data.email,
            phone: response.data.phone,
            emailVerified: response.data.emailVerified,
            phoneVerified: response.data.phoneVerified,
          },
        }),
      );

      // Move to NDA page
      dispatch(setStep("NDA"));
      navigate("/register/nda");
    } catch (e) {
      dispatch(
        setError(e.response?.data?.message || "Unable to create your account."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={8}>
        {/* Account Information Section */}
        <Box>
          <HStack spacing={2} mb={5}>
            <Icon as={User} w={5} h={5} color="blue.600" />
            <Text fontSize="md" fontWeight="700" color="gray.800">
              Personal Information
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* Full Name */}
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Full Name
              </FormLabel>
              <Input
                placeholder="John Doe"
                value={account.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                }}
                _hover={{ borderColor: "gray.300" }}
                fontSize="sm"
              />
              {errors.fullName && (
                <FormErrorMessage fontSize="xs" mt={1}>
                  {errors.fullName}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* Email */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Email Address
              </FormLabel>
              <Input
                type="email"
                placeholder="john@example.com"
                value={account.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                }}
                _hover={{ borderColor: "gray.300" }}
                fontSize="sm"
              />
              {errors.email && (
                <FormErrorMessage fontSize="xs" mt={1}>
                  {errors.email}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* Phone */}
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Phone Number
              </FormLabel>
              <Input
                placeholder="+1 (555) 123-4567"
                value={account.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                }}
                _hover={{ borderColor: "gray.300" }}
                fontSize="sm"
              />
              {errors.phone && (
                <FormErrorMessage fontSize="xs" mt={1}>
                  {errors.phone}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* City */}
            <FormControl isInvalid={!!errors.city}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                City
              </FormLabel>
              <Input
                placeholder="New York"
                value={account.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                }}
                _hover={{ borderColor: "gray.300" }}
                fontSize="sm"
              />
              {errors.city && (
                <FormErrorMessage fontSize="xs" mt={1}>
                  {errors.city}
                </FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
        </Box>

        <Divider my={2} />

        {/* Security Section */}
        <Box>
          <HStack spacing={2} mb={5}>
            <Icon as={Lock} w={5} h={5} color="blue.600" />
            <Text fontSize="md" fontWeight="700" color="gray.800">
              Security
            </Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {/* Password */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Minimum 8 characters with at least one number"
                value={account.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                }}
                _hover={{ borderColor: "gray.300" }}
                fontSize="sm"
              />
              {errors.password && (
                <FormErrorMessage fontSize="xs" mt={1}>
                  {errors.password}
                </FormErrorMessage>
              )}
            </FormControl>

            {/* Confirm Password */}
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                Confirm Password
              </FormLabel>
              <Input
                type="password"
                placeholder="Re-enter your password"
                value={account.confirmPassword}
                onChange={(e) =>
                  handleFieldChange("confirmPassword", e.target.value)
                }
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                }}
                _hover={{ borderColor: "gray.300" }}
                fontSize="sm"
              />
              {errors.confirmPassword && (
                <FormErrorMessage fontSize="xs" mt={1}>
                  {errors.confirmPassword}
                </FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
        </Box>

        <Divider my={2} />

        {/* Employment Situation Section */}
        <Box>
          <HStack spacing={2} mb={5}>
            <Icon as={User} w={5} h={5} color="blue.600" />
            <Text fontSize="md" fontWeight="700" color="gray.800">
              Employment Status
            </Text>
          </HStack>

          <FormControl>
            <FormLabel fontSize="sm" fontWeight="600" color="gray.700" mb={4}>
              Which situation best describes you right now?
            </FormLabel>
            <RadioGroup
              value={employmentSituation}
              onChange={(value) => dispatch(setSituation(value))}
            >
              <Stack direction="column" spacing={3}>
                <Box
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={
                    employmentSituation === "CURRENTLY_EMPLOYED"
                      ? "blue.500"
                      : "gray.200"
                  }
                  bg={
                    employmentSituation === "CURRENTLY_EMPLOYED"
                      ? "blue.50"
                      : "white"
                  }
                  cursor="pointer"
                  transition="all 0.2s ease"
                  _hover={{ borderColor: "blue.300", bg: "blue.50" }}
                >
                  <Radio value="CURRENTLY_EMPLOYED" fontSize="sm">
                    <VStack align="start" spacing={0} ml={2}>
                      <Text fontWeight="600" color="gray.800">
                        Currently Employed
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        I'm working and looking to advance my career
                      </Text>
                    </VStack>
                  </Radio>
                </Box>

                <Box
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={
                    employmentSituation === "RECENTLY_IMPACTED"
                      ? "blue.500"
                      : "gray.200"
                  }
                  bg={
                    employmentSituation === "RECENTLY_IMPACTED"
                      ? "blue.50"
                      : "white"
                  }
                  cursor="pointer"
                  transition="all 0.2s ease"
                  _hover={{ borderColor: "blue.300", bg: "blue.50" }}
                >
                  <Radio value="RECENTLY_IMPACTED" fontSize="sm">
                    <VStack align="start" spacing={0} ml={2}>
                      <Text fontWeight="600" color="gray.800">
                        Recently Impacted
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        I've been recently laid off or furloughed
                      </Text>
                    </VStack>
                  </Radio>
                </Box>

                <Box
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={
                    employmentSituation === "CAREER_BREAK"
                      ? "blue.500"
                      : "gray.200"
                  }
                  bg={
                    employmentSituation === "CAREER_BREAK" ? "blue.50" : "white"
                  }
                  cursor="pointer"
                  transition="all 0.2s ease"
                  _hover={{ borderColor: "blue.300", bg: "blue.50" }}
                >
                  <Radio value="CAREER_BREAK" fontSize="sm">
                    <VStack align="start" spacing={0} ml={2}>
                      <Text fontWeight="600" color="gray.800">
                        On a Career Break
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        I'm taking time off and planning my next move
                      </Text>
                    </VStack>
                  </Radio>
                </Box>

                <Box
                  p={4}
                  borderRadius="lg"
                  border="2px solid"
                  borderColor={
                    employmentSituation === "RETURNING_TO_WORKFORCE"
                      ? "blue.500"
                      : "gray.200"
                  }
                  bg={
                    employmentSituation === "RETURNING_TO_WORKFORCE"
                      ? "blue.50"
                      : "white"
                  }
                  cursor="pointer"
                  transition="all 0.2s ease"
                  _hover={{ borderColor: "blue.300", bg: "blue.50" }}
                >
                  <Radio value="RETURNING_TO_WORKFORCE" fontSize="sm">
                    <VStack align="start" spacing={0} ml={2}>
                      <Text fontWeight="600" color="gray.800">
                        Returning to the Workforce
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        I'm ready to jump back into work
                      </Text>
                    </VStack>
                  </Radio>
                </Box>
              </Stack>
            </RadioGroup>
          </FormControl>
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
                Error
              </Text>
              <Text color="red.600" fontSize="sm">
                {error}
              </Text>
            </Box>
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          colorScheme="blue"
          size="lg"
          onClick={submit}
          isDisabled={isLoading}
          isLoading={isLoading}
          loadingText="Creating Account..."
          fontWeight="700"
          mt={6}
          borderRadius="lg"
          _hover={{ boxShadow: "lg" }}
          _active={{ transform: "scale(0.98)" }}
        >
          Continue to Agreements
        </Button>

        {/* Info Text */}
        <Text fontSize="xs" color="gray.600" textAlign="center">
          By continuing, you agree to our Terms of Service and will review our
          agreements in the next steps.
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}
