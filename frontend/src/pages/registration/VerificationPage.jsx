import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, CheckCircle2, Clock } from "lucide-react";
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

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={8}>
        {/* Header */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={Clock} w={6} h={6} color="blue.600" />
            <Text fontSize="lg" fontWeight="700" color="gray.800">
              Verify Your Account
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Confirm your email and phone number to secure your account.
          </Text>
        </Box>

        {/* Progress Indicator */}
        <Box bg="gray.50" p={4} borderRadius="lg">
          <HStack justify="space-between" mb={3}>
            <Text fontSize="sm" fontWeight="600" color="gray.800">
              Verification Progress
            </Text>
            <Text fontSize="sm" fontWeight="600" color="blue.600">
              {completionPercentage}%
            </Text>
          </HStack>
          <Progress
            value={completionPercentage}
            borderRadius="full"
            colorScheme="blue"
          />
        </Box>

        {/* Email Verification Section */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <HStack spacing={3} mb={5}>
            <Icon
              as={Mail}
              w={5}
              h={5}
              color={emailVerified ? "green.500" : "blue.600"}
            />
            <Text fontWeight="700" color="gray.800" flex={1}>
              Email Verification
            </Text>
            {emailVerified && (
              <Badge colorScheme="green" borderRadius="full">
                <HStack spacing={1}>
                  <Icon as={CheckCircle2} w={4} h={4} />
                  <Text>Verified</Text>
                </HStack>
              </Badge>
            )}
          </HStack>

          {!emailVerified && (
            <VStack align="stretch" spacing={4}>
              <Text fontSize="sm" color="gray.600">
                Verification code was sent to <strong>{account.email}</strong>
              </Text>
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600">
                  Enter 6-digit verification code
                </FormLabel>
                <Input
                  placeholder="000000"
                  value={emailCode}
                  onChange={(e) => setEmailCode(e.target.value.slice(0, 6))}
                  maxLength="6"
                  borderRadius="lg"
                  textAlign="center"
                  fontSize="lg"
                  letterSpacing="2px"
                  fontWeight="600"
                  border="2px solid"
                  borderColor="gray.200"
                  _focus={{
                    borderColor: "blue.500",
                    boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                  }}
                  _hover={{ borderColor: "gray.300" }}
                />
              </FormControl>
              <Button
                colorScheme="blue"
                isLoading={emailLoading}
                isDisabled={!emailCode || emailCode.length < 6}
                loadingText="Verifying..."
                onClick={verifyEmail}
                borderRadius="lg"
                fontWeight="700"
              >
                Verify Email
              </Button>
            </VStack>
          )}

          {emailVerified && (
            <Box
              bg="green.50"
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="green.200"
            >
              <HStack spacing={2}>
                <Icon as={CheckCircle2} w={5} h={5} color="green.500" />
                <Box>
                  <Text fontWeight="600" color="green.700" fontSize="sm">
                    Email verified successfully
                  </Text>
                  <Text color="green.600" fontSize="xs">
                    {account.email}
                  </Text>
                </Box>
              </HStack>
            </Box>
          )}
        </Box>

        {/* Phone Verification Section */}
        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <HStack spacing={3} mb={5}>
            <Icon
              as={Phone}
              w={5}
              h={5}
              color={phoneVerified ? "green.500" : "blue.600"}
            />
            <Text fontWeight="700" color="gray.800" flex={1}>
              Phone Verification
            </Text>
            {phoneVerified && (
              <Badge colorScheme="green" borderRadius="full">
                <HStack spacing={1}>
                  <Icon as={CheckCircle2} w={4} h={4} />
                  <Text>Verified</Text>
                </HStack>
              </Badge>
            )}
          </HStack>

          {!phoneVerified && (
            <VStack align="stretch" spacing={4}>
              {!sent ? (
                <>
                  <Text fontSize="sm" color="gray.600">
                    We'll send a one-time verification code to your registered
                    phone number.
                  </Text>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    isLoading={otpLoading}
                    loadingText="Sending OTP..."
                    onClick={sendOtp}
                    borderRadius="lg"
                    fontWeight="700"
                  >
                    Send Verification Code
                  </Button>
                </>
              ) : (
                <>
                  <Text fontSize="sm" color="gray.600">
                    Verification code sent to <strong>{account.phone}</strong>
                  </Text>
                  <FormControl>
                    <FormLabel fontSize="sm" fontWeight="600">
                      Enter 6-digit OTP
                    </FormLabel>
                    <Input
                      placeholder="000000"
                      value={phoneCode}
                      onChange={(e) => setPhoneCode(e.target.value.slice(0, 6))}
                      maxLength="6"
                      borderRadius="lg"
                      textAlign="center"
                      fontSize="lg"
                      letterSpacing="2px"
                      fontWeight="600"
                      border="2px solid"
                      borderColor="gray.200"
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.1)",
                      }}
                      _hover={{ borderColor: "gray.300" }}
                    />
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    isLoading={phoneLoading}
                    isDisabled={!phoneCode || phoneCode.length < 6}
                    loadingText="Verifying..."
                    onClick={verifyPhone}
                    borderRadius="lg"
                    fontWeight="700"
                  >
                    Verify Phone
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={sendOtp}
                    isLoading={otpLoading}
                  >
                    Resend OTP
                  </Button>
                </>
              )}
            </VStack>
          )}

          {phoneVerified && (
            <Box
              bg="green.50"
              p={4}
              borderRadius="lg"
              border="1px solid"
              borderColor="green.200"
            >
              <HStack spacing={2}>
                <Icon as={CheckCircle2} w={5} h={5} color="green.500" />
                <Box>
                  <Text fontWeight="600" color="green.700" fontSize="sm">
                    Phone verified successfully
                  </Text>
                  <Text color="green.600" fontSize="xs">
                    {account.phone}
                  </Text>
                </Box>
              </HStack>
            </Box>
          )}
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
                Verification Error
              </Text>
              <Text color="red.600" fontSize="sm">
                {error}
              </Text>
            </Box>
          </Alert>
        )}

        {/* Continue Button */}
        <Button
          colorScheme="blue"
          size="lg"
          isDisabled={!emailVerified || !phoneVerified}
          onClick={continueToConfirmation}
          borderRadius="lg"
          fontWeight="700"
          _hover={{ boxShadow: "lg" }}
          _active={{ transform: "scale(0.98)" }}
        >
          Complete Registration
        </Button>

        {/* Info Text */}
        <Text fontSize="xs" color="gray.600" textAlign="center">
          Both email and phone verification are required to complete your
          registration.
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}
