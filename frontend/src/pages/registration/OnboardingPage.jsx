import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  User,
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

const EMPLOYMENT_OPTIONS = [
  {
    value: "CURRENTLY_EMPLOYED",
    icon: BriefcaseBusiness,
    title: "Currently Employed",
    description: "I'm working and looking to advance my career.",
  },
  {
    value: "RECENTLY_IMPACTED",
    icon: Mail,
    title: "Recently Impacted",
    description: "I've recently been laid off or furloughed.",
  },
  {
    value: "CAREER_BREAK",
    icon: MapPin,
    title: "On a Career Break",
    description: "I'm taking time away and planning my next move.",
  },
  {
    value: "RETURNING_TO_WORKFORCE",
    icon: User,
    title: "Returning to the Workforce",
    description: "I'm ready to return and take my next step.",
  },
];

export default function OnboardingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { account, employmentSituation, error } = useSelector(
    (s) => s.registration,
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /* =========================================================
     FORM HANDLING
  ========================================================= */

  const handleFieldChange = (field, value) => {
    dispatch(updateAccount({ [field]: value }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }

    if (error) {
      dispatch(setError(null));
    }
  };

  const handleSituationChange = (value) => {
    dispatch(setSituation(value));

    if (error) {
      dispatch(setError(null));
    }
  };

  const submit = async () => {
    const validation = validateAccount(account);

    setErrors(validation);

    if (Object.keys(validation).length || !employmentSituation) {
      if (!employmentSituation) {
        dispatch(
          setError(
            "Please select the employment situation that best describes you.",
          ),
        );
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

  /* =========================================================
     SHARED INPUT STYLE
  ========================================================= */

  const inputProps = {
    borderRadius: "4px",
    border: "1px solid",
    borderColor: "cream.400",
    bg: "white",
    color: "charcoal.800",
    fontSize: "sm",
    height: "46px",

    _placeholder: {
      color: "taupe.400",
    },

    _hover: {
      borderColor: "taupe.400",
    },

    _focus: {
      borderColor: "brand.500",
      boxShadow: "0 0 0 3px rgba(96, 18, 48, 0.08)",
    },
  };

  /* =========================================================
     SECTION HEADER
  ========================================================= */

  const sectionHeading = (icon, eyebrow, title, description) => (
    <HStack align="start" spacing={4} mb={6}>
      <Box
        w="38px"
        h="38px"
        borderRadius="4px"
        bg="accent.50"
        border="1px solid"
        borderColor="accent.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
      >
        <Icon as={icon} boxSize="17px" color="accent.600" />
      </Box>

      <Box>
        <Text
          fontSize="9px"
          fontWeight="800"
          letterSpacing="0.14em"
          color="accent.600"
          mb={1}
        >
          {eyebrow}
        </Text>

        <Text
          fontFamily="heading"
          fontSize="xl"
          fontWeight="500"
          color="brand.500"
          lineHeight="1.2"
        >
          {title}
        </Text>

        <Text fontSize="xs" color="taupe.500" mt={1} lineHeight="1.6">
          {description}
        </Text>
      </Box>
    </HStack>
  );

  /* =========================================================
     EMPLOYMENT OPTION
  ========================================================= */

  const situationCard = ({ value, icon, title, description }) => {
    const selected = employmentSituation === value;

    return (
      <Box
        p={{ base: 4, md: 5 }}
        borderRadius="4px"
        border="1px solid"
        borderColor={selected ? "brand.500" : "cream.400"}
        bg={selected ? "brand.50" : "white"}
        cursor="pointer"
        transition="all 0.2s ease"
        position="relative"
        _hover={{
          borderColor: selected ? "brand.500" : "accent.400",
          transform: "translateY(-1px)",
          boxShadow: "0 6px 18px rgba(46, 42, 40, 0.06)",
        }}
      >
        {selected && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="2px"
            bg="accent.500"
          />
        )}

        <Radio value={value} width="100%" colorScheme="brand">
          <HStack align="center" spacing={3} ml={2}>
            <Box
              w="36px"
              h="36px"
              borderRadius="4px"
              bg={selected ? "white" : "cream.100"}
              border="1px solid"
              borderColor={selected ? "accent.200" : "cream.300"}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon
                as={icon}
                boxSize="17px"
                color={selected ? "brand.500" : "taupe.500"}
              />
            </Box>

            <VStack align="start" spacing={0.5}>
              <Text fontSize="sm" fontWeight="700" color="charcoal.800">
                {title}
              </Text>

              <Text fontSize="xs" color="taupe.500" lineHeight="1.5">
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
      <VStack align="stretch" spacing={{ base: 7, md: 9 }}>
        {/* =====================================================
            PERSONAL INFORMATION
        ===================================================== */}
        <Box
          p={{ base: 5, md: 7 }}
          bg="white"
          border="1px solid"
          borderColor="cream.300"
          borderRadius="6px"
        >
          {sectionHeading(
            User,
            "YOUR DETAILS",
            "Personal Information",
            "The basic information we need to create your profile.",
          )}

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
            spacing={{
              base: 5,
              md: 6,
            }}
          >
            {/* Full Name */}
            <FormControl isInvalid={!!errors.fullName}>
              <FormLabel
                fontSize="xs"
                fontWeight="700"
                color="charcoal.700"
                mb={2}
              >
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

            {/* Email */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel
                fontSize="xs"
                fontWeight="700"
                color="charcoal.700"
                mb={2}
              >
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

            {/* Phone */}
            <FormControl isInvalid={!!errors.phone}>
              <FormLabel
                fontSize="xs"
                fontWeight="700"
                color="charcoal.700"
                mb={2}
              >
                Phone Number
              </FormLabel>

              <Input
                placeholder="+91 98765 43210"
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

            {/* City */}
            <FormControl isInvalid={!!errors.city}>
              <FormLabel
                fontSize="xs"
                fontWeight="700"
                color="charcoal.700"
                mb={2}
              >
                City
              </FormLabel>

              <Input
                placeholder="Bengaluru"
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

        {/* =====================================================
            ACCOUNT SECURITY
        ===================================================== */}
        <Box
          p={{ base: 5, md: 7 }}
          bg="white"
          border="1px solid"
          borderColor="cream.300"
          borderRadius="6px"
        >
          {sectionHeading(
            Lock,
            "ACCOUNT SECURITY",
            "Secure Your Account",
            "Choose a password that keeps your account protected.",
          )}

          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
            }}
            spacing={{
              base: 5,
              md: 6,
            }}
          >
            {/* Password */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel
                fontSize="xs"
                fontWeight="700"
                color="charcoal.700"
                mb={2}
              >
                Password
              </FormLabel>

              <Input
                type="password"
                placeholder="Minimum 8 characters"
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

            {/* Confirm Password */}
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel
                fontSize="xs"
                fontWeight="700"
                color="charcoal.700"
                mb={2}
              >
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

          {/* Security note */}
          <HStack
            mt={5}
            px={4}
            py={3}
            borderRadius="4px"
            bg="cream.100"
            border="1px solid"
            borderColor="cream.300"
            spacing={3}
          >
            <Icon
              as={ShieldCheck}
              boxSize="17px"
              color="accent.600"
              flexShrink={0}
            />

            <Text fontSize="xs" color="taupe.600" lineHeight="1.5">
              Your account credentials are securely protected.
            </Text>
          </HStack>
        </Box>

        {/* =====================================================
            EMPLOYMENT SITUATION
        ===================================================== */}
        <Box
          p={{ base: 5, md: 7 }}
          bg="white"
          border="1px solid"
          borderColor="cream.300"
          borderRadius="6px"
        >
          {sectionHeading(
            BriefcaseBusiness,
            "WHERE YOU ARE TODAY",
            "Employment Status",
            "There is no right answer. We simply want to understand your starting point.",
          )}

          <FormControl>
            <FormLabel
              fontSize="sm"
              fontWeight="700"
              color="charcoal.800"
              mb={4}
            >
              Which situation best describes you right now?
            </FormLabel>

            <RadioGroup
              value={employmentSituation}
              onChange={handleSituationChange}
            >
              <Stack spacing={3}>
                {EMPLOYMENT_OPTIONS.map((option) => situationCard(option))}
              </Stack>
            </RadioGroup>
          </FormControl>
        </Box>

        {/* =====================================================
            ERROR
        ===================================================== */}
        {error && (
          <Alert
            status="error"
            borderRadius="4px"
            bg="error.50"
            border="1px solid"
            borderColor="error.200"
            px={4}
            py={3}
          >
            <AlertIcon boxSize="18px" color="error.600" />

            <Box>
              <Text fontWeight="700" color="error.700" fontSize="sm">
                Something needs attention
              </Text>

              <Text color="error.600" fontSize="xs" mt={0.5}>
                {error}
              </Text>
            </Box>
          </Alert>
        )}

        {/* =====================================================
            CONTINUE
        ===================================================== */}
        <Box pt={1}>
          <Button
            width="100%"
            size="lg"
            height="54px"
            onClick={submit}
            isDisabled={isLoading}
            isLoading={isLoading}
            loadingText="Creating Account..."
            fontWeight="700"
            letterSpacing="0.01em"
            color="white"
            bg="brand.500"
            borderRadius="4px"
            rightIcon={<ArrowRight size={18} />}
            boxShadow="0 8px 22px rgba(96, 18, 48, 0.18)"
            _hover={{
              bg: "brand.600",
              boxShadow: "0 11px 28px rgba(96, 18, 48, 0.24)",
              transform: "translateY(-1px)",
            }}
            _active={{
              transform: "translateY(0)",
            }}
            transition="all 0.2s ease"
          >
            Continue to Agreements
          </Button>

          <Text
            fontSize="xs"
            color="taupe.500"
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
