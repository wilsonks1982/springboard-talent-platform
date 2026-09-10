import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
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
import {
  Lock,
  Mail,
  Phone,
  MapPin,
  User,
  BriefcaseBusiness,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
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

      const normalizedAccount = {
        ...account,
        phone: normalizePhone(account.phone),
      };

      const response = await authApi.register({
        ...normalizedAccount,
        employmentSituation,
      });

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

  const inputProps = {
    borderRadius: "xl",
    border: "1px solid",
    borderColor: "gray.200",
    bg: "white",
    _focus: {
      borderColor: "purple.500",
      boxShadow: "0 0 0 3px rgba(128, 90, 213, 0.12)",
    },
    _hover: {
      borderColor: "purple.200",
    },
    fontSize: "sm",
    height: "46px",
  };

  const sectionIcon = (icon) => (
    <Box
      w="38px"
      h="38px"
      borderRadius="xl"
      bg="purple.50"
      border="1px solid"
      borderColor="purple.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexShrink={0}
    >
      <Icon as={icon} w={18} h={18} color="purple.600" />
    </Box>
  );

  const sectionHeading = (icon, title, description) => (
    <HStack align="center" spacing={3} mb={6}>
      {sectionIcon(icon)}

      <Box>
        <Text
          fontSize="md"
          fontWeight="800"
          color="gray.800"
          letterSpacing="-0.01em"
        >
          {title}
        </Text>

        <Text fontSize="xs" color="gray.500" mt={0.5}>
          {description}
        </Text>
      </Box>
    </HStack>
  );

  const situationCard = ({ value, icon, title, description }) => {
    const selected = employmentSituation === value;

    return (
      <Box
        p={5}
        borderRadius="xl"
        border="1.5px solid"
        borderColor={selected ? "purple.400" : "gray.200"}
        bg={selected ? "purple.50" : "white"}
        cursor="pointer"
        transition="all 0.2s ease"
        boxShadow={
          selected
            ? "0 6px 18px rgba(128, 90, 213, 0.10)"
            : "0 2px 8px rgba(15, 23, 42, 0.03)"
        }
        _hover={{
          borderColor: selected ? "purple.400" : "purple.300",
          bg: selected ? "purple.50" : "purple.50",
          transform: "translateY(-1px)",
        }}
      >
        <Radio value={value} width="100%">
          <HStack align="center" spacing={3} ml={2}>
            <Box
              w="34px"
              h="34px"
              borderRadius="lg"
              bg={selected ? "white" : "purple.50"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={icon} w={17} h={17} color="purple.600" />
            </Box>

            <VStack align="start" spacing={0}>
              <Text fontSize="sm" fontWeight="700" color="gray.800">
                {title}
              </Text>

              <Text fontSize="xs" color="gray.500" mt={0.5} lineHeight="1.5">
                {description}
              </Text>
            </VStack>
          </HStack>
        </Radio>
      </Box>
    );
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={7}>
        {/* Intro */}
        <Box px={{ base: 1, md: 2 }} pt={1} pb={2}>
          <HStack spacing={2} mb={3}>
            <Badge
              colorScheme="purple"
              bg="purple.50"
              color="purple.700"
              border="1px solid"
              borderColor="purple.100"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="10px"
              fontWeight="800"
              letterSpacing="0.04em"
              textTransform="uppercase"
            >
              Step 1 · Account
            </Badge>
          </HStack>

          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="800"
            color="gray.900"
            letterSpacing="-0.035em"
            lineHeight="1.15"
          >
            Let’s get to know you
          </Text>

          <Text
            fontSize="sm"
            color="gray.500"
            mt={2}
            maxW="620px"
            lineHeight="1.7"
          >
            Create your account and tell us a little about your current
            situation. This helps us personalize your Springboard experience.
          </Text>
        </Box>

        {/* Personal Information */}
        <Box
          p={{ base: 5, md: 6 }}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          boxShadow="0 8px 28px rgba(88, 28, 135, 0.06)"
        >
          {sectionHeading(
            User,
            "Personal Information",
            "Your basic contact details",
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel fontSize="xs" fontWeight="700" color="gray.700" mb={2}>
                Full Name
              </FormLabel>

              <Input
                placeholder="John Doe"
                value={account.fullName}
                onChange={(e) => handleFieldChange("fullName", e.target.value)}
                {...inputProps}
              />

              {errors.fullName && (
                <FormErrorMessage fontSize="xs">
                  {errors.fullName}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel fontSize="xs" fontWeight="700" color="gray.700" mb={2}>
                Email Address
              </FormLabel>

              <Input
                type="email"
                placeholder="john@example.com"
                value={account.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                {...inputProps}
              />

              {errors.email && (
                <FormErrorMessage fontSize="xs">
                  {errors.email}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.phone}>
              <FormLabel fontSize="xs" fontWeight="700" color="gray.700" mb={2}>
                Phone Number
              </FormLabel>

              <Input
                placeholder="+1 (555) 123-4567"
                value={account.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                {...inputProps}
              />

              {errors.phone && (
                <FormErrorMessage fontSize="xs">
                  {errors.phone}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.city}>
              <FormLabel fontSize="xs" fontWeight="700" color="gray.700" mb={2}>
                City
              </FormLabel>

              <Input
                placeholder="New York"
                value={account.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                {...inputProps}
              />

              {errors.city && (
                <FormErrorMessage fontSize="xs">{errors.city}</FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>
        </Box>

        {/* Security */}
        <Box
          p={{ base: 5, md: 6 }}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          boxShadow="0 8px 28px rgba(88, 28, 135, 0.06)"
        >
          {sectionHeading(
            Lock,
            "Secure Your Account",
            "Choose a strong password for your account",
          )}

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel fontSize="xs" fontWeight="700" color="gray.700" mb={2}>
                Password
              </FormLabel>

              <Input
                type="password"
                placeholder="Minimum 8 characters with at least one number"
                value={account.password}
                onChange={(e) => handleFieldChange("password", e.target.value)}
                {...inputProps}
              />

              {errors.password && (
                <FormErrorMessage fontSize="xs">
                  {errors.password}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel fontSize="xs" fontWeight="700" color="gray.700" mb={2}>
                Confirm Password
              </FormLabel>

              <Input
                type="password"
                placeholder="Re-enter your password"
                value={account.confirmPassword}
                onChange={(e) =>
                  handleFieldChange("confirmPassword", e.target.value)
                }
                {...inputProps}
              />

              {errors.confirmPassword && (
                <FormErrorMessage fontSize="xs">
                  {errors.confirmPassword}
                </FormErrorMessage>
              )}
            </FormControl>
          </SimpleGrid>

          <HStack
            mt={5}
            px={4}
            py={3}
            borderRadius="xl"
            bg="purple.50"
            border="1px solid"
            borderColor="purple.100"
            spacing={3}
          >
            <Icon as={ShieldCheck} w={17} h={17} color="purple.600" />

            <Text fontSize="xs" color="purple.700" lineHeight="1.5">
              Your account credentials are securely protected.
            </Text>
          </HStack>
        </Box>

        {/* Employment Situation */}
        <Box
          p={{ base: 5, md: 6 }}
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          boxShadow="0 8px 28px rgba(88, 28, 135, 0.06)"
        >
          {sectionHeading(
            BriefcaseBusiness,
            "Employment Status",
            "Help us understand where you are today",
          )}

          <FormControl>
            <FormLabel fontSize="sm" fontWeight="700" color="gray.800" mb={4}>
              Which situation best describes you right now?
            </FormLabel>

            <RadioGroup
              value={employmentSituation}
              onChange={(value) => dispatch(setSituation(value))}
            >
              <Stack spacing={3}>
                {situationCard({
                  value: "CURRENTLY_EMPLOYED",
                  icon: BriefcaseBusiness,
                  title: "Currently Employed",
                  description: "I'm working and looking to advance my career",
                })}

                {situationCard({
                  value: "RECENTLY_IMPACTED",
                  icon: Mail,
                  title: "Recently Impacted",
                  description: "I've been recently laid off or furloughed",
                })}

                {situationCard({
                  value: "CAREER_BREAK",
                  icon: MapPin,
                  title: "On a Career Break",
                  description: "I'm taking time off and planning my next move",
                })}

                {situationCard({
                  value: "RETURNING_TO_WORKFORCE",
                  icon: User,
                  title: "Returning to the Workforce",
                  description: "I'm ready to jump back into work",
                })}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            status="error"
            borderRadius="xl"
            bg="red.50"
            border="1px solid"
            borderColor="red.100"
            px={4}
            py={3}
          >
            <AlertIcon color="red.500" />

            <Box>
              <Text fontWeight="700" color="red.700" fontSize="sm">
                Something needs attention
              </Text>

              <Text color="red.600" fontSize="xs" mt={0.5}>
                {error}
              </Text>
            </Box>
          </Alert>
        )}

        {/* Continue */}
        <Box pt={1}>
          <Button
            width="100%"
            size="lg"
            onClick={submit}
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Creating Account..."
            fontWeight="800"
            borderRadius="xl"
            height="54px"
            color="white"
            bgGradient="linear(to-r, purple.700, purple.600)"
            boxShadow="0 10px 28px rgba(128, 90, 213, 0.22)"
            rightIcon={<ArrowRight size={18} />}
            _hover={{
              bgGradient: "linear(to-r, purple.800, purple.700)",
              boxShadow: "0 14px 32px rgba(128, 90, 213, 0.28)",
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "scale(0.985)",
            }}
            transition="all 0.2s ease"
          >
            Continue to Agreements
          </Button>

          <Text
            fontSize="xs"
            color="gray.500"
            textAlign="center"
            mt={4}
            lineHeight="1.6"
          >
            By continuing, you agree to our Terms of Service and will review our
            agreements in the next steps.
          </Text>
        </Box>
      </VStack>
    </RegistrationLayout>
  );
}
