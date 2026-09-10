import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import RegistrationLayout from "../../components/RegistrationLayout";
import {
  setError,
  setStep,
  setVerification,
} from "../../store/registrationSlice";
import { authApi } from "../../api/authApi";

export default function VerificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { account, emailVerified, phoneVerified, error } = useSelector(
    (s) => s.registration,
  );

  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [sent, setSent] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const verifyEmail = async () => {
    try {
      setEmailLoading(true);
      dispatch(setError(null));

      await authApi.verifyEmail({ code: emailCode });

      dispatch(setVerification({ emailVerified: true }));
    } catch (e) {
      dispatch(
        setError(
          e.response?.data?.message || "Invalid email verification code.",
        ),
      );
    } finally {
      setEmailLoading(false);
    }
  };

  const sendOtp = async () => {
    try {
      setOtpLoading(true);
      dispatch(setError(null));

      await authApi.sendOtp();

      setSent(true);
    } catch (e) {
      dispatch(setError(e.response?.data?.message || "Unable to send OTP."));
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyPhone = async () => {
    try {
      setPhoneLoading(true);
      dispatch(setError(null));

      await authApi.verifyOtp({ code: phoneCode });

      dispatch(setVerification({ phoneVerified: true }));
    } catch (e) {
      dispatch(setError(e.response?.data?.message || "Invalid phone OTP."));
    } finally {
      setPhoneLoading(false);
    }
  };

  const continueToConfirmation = () => {
    if (emailVerified && phoneVerified) {
      dispatch(setStep("CONFIRMATION"));
      navigate("/register/confirmation");
    }
  };

  const completionPercentage =
    emailVerified && phoneVerified
      ? 100
      : emailVerified || phoneVerified
        ? 50
        : 0;

  const inputProps = {
    borderRadius: "xl",
    border: "2px solid",
    borderColor: "gray.200",
    bg: "white",
    height: "52px",
    textAlign: "center",
    fontSize: "xl",
    letterSpacing: "4px",
    fontWeight: "700",
    _focus: {
      borderColor: "purple.500",
      boxShadow: "0 0 0 3px rgba(128, 90, 213, 0.12)",
    },
    _hover: {
      borderColor: "purple.200",
    },
  };

  const verificationStatus = (verified) => (
    <Badge
      bg={verified ? "purple.50" : "gray.50"}
      color={verified ? "purple.700" : "gray.500"}
      border="1px solid"
      borderColor={verified ? "purple.100" : "gray.200"}
      borderRadius="full"
      px={3}
      py={1}
      fontSize="10px"
      fontWeight="800"
      textTransform="uppercase"
    >
      <HStack spacing={1}>
        {verified && <Icon as={CheckCircle2} w={13} h={13} />}
        <Text>{verified ? "Verified" : "Pending"}</Text>
      </HStack>
    </Badge>
  );

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={7}>
        {/* Header */}
        <Box>
          <HStack spacing={2} mb={3}>
            <Badge
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
              Step 4 · Verification
            </Badge>
          </HStack>

          <HStack spacing={3} align="center" mb={3}>
            <Box
              w="42px"
              h="42px"
              borderRadius="xl"
              bg="purple.50"
              border="1px solid"
              borderColor="purple.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon as={ShieldCheck} w={21} h={21} color="purple.600" />
            </Box>

            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="800"
              color="gray.900"
              letterSpacing="-0.025em"
              lineHeight="1.2"
            >
              Verify Your Account
            </Text>
          </HStack>

          <Text fontSize="sm" color="gray.500" lineHeight="1.7" maxW="650px">
            Confirm your email and phone number to secure your account and
            complete registration.
          </Text>
        </Box>

        {/* Progress */}
        <Box
          bg="white"
          p={{ base: 5, md: 6 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="0 8px 28px rgba(88, 28, 135, 0.06)"
        >
          <HStack justify="space-between" mb={3}>
            <Box>
              <Text fontSize="sm" fontWeight="800" color="gray.800">
                Verification Progress
              </Text>

              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Verify both contact methods to continue
              </Text>
            </Box>

            <Text fontSize="sm" fontWeight="800" color="purple.600">
              {completionPercentage}%
            </Text>
          </HStack>

          <Progress
            value={completionPercentage}
            borderRadius="full"
            colorScheme="purple"
            bg="purple.50"
            size="sm"
          />

          <HStack justify="space-between" mt={3} fontSize="xs" color="gray.500">
            <Text>{emailVerified ? "✓ Email verified" : "Email pending"}</Text>

            <Text>{phoneVerified ? "✓ Phone verified" : "Phone pending"}</Text>
          </HStack>
        </Box>

        {/* Email Verification */}
        <Box
          bg="white"
          p={{ base: 5, md: 6 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="0 8px 28px rgba(88, 28, 135, 0.06)"
        >
          <HStack spacing={3} mb={5}>
            <Box
              w="38px"
              h="38px"
              borderRadius="xl"
              bg={emailVerified ? "purple.50" : "purple.50"}
              border="1px solid"
              borderColor="purple.100"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={Mail} w={18} h={18} color="purple.600" />
            </Box>

            <Box flex={1}>
              <Text fontWeight="800" color="gray.800" fontSize="md">
                Email Verification
              </Text>

              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Confirm ownership of your email address
              </Text>
            </Box>

            {verificationStatus(emailVerified)}
          </HStack>

          {!emailVerified && (
            <VStack align="stretch" spacing={4}>
              <Box
                bg="purple.50"
                border="1px solid"
                borderColor="purple.100"
                borderRadius="xl"
                px={4}
                py={3}
              >
                <Text fontSize="xs" color="purple.700">
                  Verification code sent to{" "}
                  <Text as="span" fontWeight="800">
                    {account.email}
                  </Text>
                </Text>
              </Box>

              <FormControl>
                <FormLabel
                  fontSize="xs"
                  fontWeight="700"
                  color="gray.700"
                  textAlign="center"
                >
                  Enter 6-digit verification code
                </FormLabel>

                <Input
                  placeholder="000000"
                  value={emailCode}
                  onChange={(e) =>
                    setEmailCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  maxLength="6"
                  {...inputProps}
                />
              </FormControl>

              <Button
                size="lg"
                height="50px"
                color="white"
                bgGradient="linear(to-r, purple.700, purple.600)"
                boxShadow="0 8px 20px rgba(128, 90, 213, 0.18)"
                isLoading={emailLoading}
                isDisabled={!emailCode || emailCode.length < 6}
                loadingText="Verifying..."
                onClick={verifyEmail}
                borderRadius="xl"
                fontWeight="800"
                _hover={{
                  bgGradient: "linear(to-r, purple.800, purple.700)",
                  transform: "translateY(-1px)",
                }}
                transition="all 0.2s ease"
              >
                Verify Email
              </Button>
            </VStack>
          )}

          {emailVerified && (
            <Box
              bg="purple.50"
              p={4}
              borderRadius="xl"
              border="1px solid"
              borderColor="purple.100"
            >
              <HStack spacing={3}>
                <Icon as={CheckCircle2} w={20} h={20} color="purple.600" />

                <Box>
                  <Text fontWeight="700" color="purple.800" fontSize="sm">
                    Email verified successfully
                  </Text>

                  <Text color="purple.600" fontSize="xs" mt={0.5}>
                    {account.email}
                  </Text>
                </Box>
              </HStack>
            </Box>
          )}
        </Box>

        {/* Phone Verification */}
        <Box
          bg="white"
          p={{ base: 5, md: 6 }}
          borderRadius="2xl"
          border="1px solid"
          borderColor="gray.100"
          boxShadow="0 8px 28px rgba(88, 28, 135, 0.06)"
        >
          <HStack spacing={3} mb={5}>
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
            >
              <Icon as={Phone} w={18} h={18} color="purple.600" />
            </Box>

            <Box flex={1}>
              <Text fontWeight="800" color="gray.800" fontSize="md">
                Phone Verification
              </Text>

              <Text fontSize="xs" color="gray.500" mt={0.5}>
                Confirm ownership of your phone number
              </Text>
            </Box>

            {verificationStatus(phoneVerified)}
          </HStack>

          {!phoneVerified && (
            <VStack align="stretch" spacing={4}>
              {!sent ? (
                <>
                  <Box
                    bg="purple.50"
                    border="1px solid"
                    borderColor="purple.100"
                    borderRadius="xl"
                    px={4}
                    py={3}
                  >
                    <Text fontSize="xs" color="purple.700" lineHeight="1.6">
                      We'll send a one-time verification code to your registered
                      phone number.
                    </Text>
                  </Box>

                  <Button
                    size="lg"
                    height="50px"
                    variant="outline"
                    border="1.5px solid"
                    borderColor="purple.300"
                    color="purple.700"
                    isLoading={otpLoading}
                    loadingText="Sending OTP..."
                    onClick={sendOtp}
                    borderRadius="xl"
                    fontWeight="800"
                    _hover={{
                      bg: "purple.50",
                      borderColor: "purple.400",
                    }}
                  >
                    Send Verification Code
                  </Button>
                </>
              ) : (
                <>
                  <Box
                    bg="purple.50"
                    border="1px solid"
                    borderColor="purple.100"
                    borderRadius="xl"
                    px={4}
                    py={3}
                  >
                    <Text fontSize="xs" color="purple.700">
                      Verification code sent to{" "}
                      <Text as="span" fontWeight="800">
                        {account.phone}
                      </Text>
                    </Text>
                  </Box>

                  <FormControl>
                    <FormLabel
                      fontSize="xs"
                      fontWeight="700"
                      color="gray.700"
                      textAlign="center"
                    >
                      Enter 6-digit OTP
                    </FormLabel>

                    <Input
                      placeholder="000000"
                      value={phoneCode}
                      onChange={(e) =>
                        setPhoneCode(
                          e.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      maxLength="6"
                      {...inputProps}
                    />
                  </FormControl>

                  <Button
                    size="lg"
                    height="50px"
                    color="white"
                    bgGradient="linear(to-r, purple.700, purple.600)"
                    boxShadow="0 8px 20px rgba(128, 90, 213, 0.18)"
                    isLoading={phoneLoading}
                    isDisabled={!phoneCode || phoneCode.length < 6}
                    loadingText="Verifying..."
                    onClick={verifyPhone}
                    borderRadius="xl"
                    fontWeight="800"
                    _hover={{
                      bgGradient: "linear(to-r, purple.800, purple.700)",
                      transform: "translateY(-1px)",
                    }}
                    transition="all 0.2s ease"
                  >
                    Verify Phone
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    color="purple.600"
                    onClick={sendOtp}
                    isLoading={otpLoading}
                    fontWeight="700"
                    _hover={{
                      bg: "purple.50",
                    }}
                  >
                    Resend OTP
                  </Button>
                </>
              )}
            </VStack>
          )}

          {phoneVerified && (
            <Box
              bg="purple.50"
              p={4}
              borderRadius="xl"
              border="1px solid"
              borderColor="purple.100"
            >
              <HStack spacing={3}>
                <Icon as={CheckCircle2} w={20} h={20} color="purple.600" />

                <Box>
                  <Text fontWeight="700" color="purple.800" fontSize="sm">
                    Phone verified successfully
                  </Text>

                  <Text color="purple.600" fontSize="xs" mt={0.5}>
                    {account.phone}
                  </Text>
                </Box>
              </HStack>
            </Box>
          )}
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
                Verification Error
              </Text>

              <Text color="red.600" fontSize="xs" mt={0.5}>
                {error}
              </Text>
            </Box>
          </Alert>
        )}

        {/* Complete Registration */}
        <Box pt={1}>
          <Button
            width="100%"
            size="lg"
            height="54px"
            isDisabled={!emailVerified || !phoneVerified}
            onClick={continueToConfirmation}
            borderRadius="xl"
            fontWeight="800"
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
            Complete Registration
          </Button>

          <HStack justify="center" spacing={2} mt={4}>
            <Icon as={ShieldCheck} w={14} h={14} color="purple.500" />

            <Text fontSize="xs" color="gray.500" textAlign="center">
              Both email and phone verification are required.
            </Text>
          </HStack>
        </Box>
      </VStack>
    </RegistrationLayout>
  );
}
