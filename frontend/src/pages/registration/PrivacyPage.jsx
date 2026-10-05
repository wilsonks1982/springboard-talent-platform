import React from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, ShieldCheck } from "lucide-react";

import ScrollGate from "../../components/ScrollGate";
import RegistrationLayout from "../../components/RegistrationLayout";

import {
  acceptPrivacy,
  setPrivacyScrolledToEnd,
  setStep,
  setError,
} from "../../store/registrationSlice";

import { consentApi } from "../../api/authApi";

export default function PrivacyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { privacyAccepted, privacyScrolledToEnd, error } = useSelector(
    (s) => s.registration,
  );

  const [isLoading, setIsLoading] = React.useState(false);

  /* =========================================================
     CONTINUE
  ========================================================= */

  const next = async () => {
    if (!privacyAccepted) return;

    setIsLoading(true);

    try {
      dispatch(setError(null));

      // Accept Privacy Policy consent
      await consentApi.accept({
        documentType: "PRIVACY_POLICY",
        documentVersion: "v1.0",
        jurisdiction: "IN",
      });

      // Privacy is the final consent step.
      // Verification is intentionally not part of onboarding.
      dispatch(setStep("CONFIRMATION"));

      navigate("/register/confirmation");
    } catch (e) {
      dispatch(
        setError(
          e.response?.data?.message || "Unable to accept Privacy Policy.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={{ base: 7, md: 9 }}>
        {/* =====================================================
            PRIVACY DOCUMENT
        ===================================================== */}
        <Box
          bg="white"
          border="1px solid"
          borderColor="cream.300"
          borderRadius="6px"
          p={{ base: 2, md: 3 }}
        >
          <Box
            bg="cream.100"
            border="1px solid"
            borderColor="cream.300"
            borderRadius="4px"
            p={1}
          >
            <ScrollGate
              title="Privacy & Data Policy"
              accepted={privacyAccepted}
              onEnd={() => dispatch(setPrivacyScrolledToEnd(true))}
              onAccept={() => dispatch(acceptPrivacy())}
            />
          </Box>
        </Box>

        {/* =====================================================
            SCROLL GUIDANCE
        ===================================================== */}
        {!privacyScrolledToEnd && (
          <Alert
            status="info"
            borderRadius="4px"
            bg="cream.100"
            border="1px solid"
            borderColor="cream.300"
            px={4}
            py={3}
          >
            <Box
              w="32px"
              h="32px"
              borderRadius="4px"
              bg="white"
              border="1px solid"
              borderColor="cream.300"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={3}
              flexShrink={0}
            >
              <Icon as={Shield} boxSize="16px" color="accent.600" />
            </Box>

            <Box>
              <Text fontWeight="700" color="charcoal.800" fontSize="sm">
                Review the complete policy
              </Text>

              <Text color="taupe.600" fontSize="xs" mt={0.5} lineHeight="1.5">
                Scroll to the bottom of the document to enable acceptance.
              </Text>
            </Box>
          </Alert>
        )}

        {/* =====================================================
            READY TO ACCEPT
        ===================================================== */}
        {privacyScrolledToEnd && !privacyAccepted && (
          <Alert
            status="warning"
            borderRadius="4px"
            bg="accent.50"
            border="1px solid"
            borderColor="accent.200"
            px={4}
            py={3}
          >
            <AlertIcon color="accent.600" boxSize="18px" />

            <Box>
              <Text fontWeight="700" color="charcoal.800" fontSize="sm">
                Ready for acceptance
              </Text>

              <Text color="taupe.600" fontSize="xs" mt={0.5} lineHeight="1.5">
                Please check the acceptance box in the policy before continuing.
              </Text>
            </Box>
          </Alert>
        )}

        {/* =====================================================
            ACCEPTED
        ===================================================== */}
        {privacyAccepted && (
          <Alert
            status="success"
            borderRadius="4px"
            bg="success.50"
            border="1px solid"
            borderColor="success.200"
            px={4}
            py={3}
          >
            <Box
              w="32px"
              h="32px"
              borderRadius="4px"
              bg="white"
              border="1px solid"
              borderColor="success.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={3}
              flexShrink={0}
            >
              <Icon as={CheckCircle2} boxSize="17px" color="success.600" />
            </Box>

            <Box>
              <Text fontWeight="700" color="success.700" fontSize="sm">
                Privacy Policy accepted
              </Text>

              <Text color="success.600" fontSize="xs" mt={0.5} lineHeight="1.5">
                Your privacy consent has been recorded. You can now complete
                your registration.
              </Text>
            </Box>
          </Alert>
        )}

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

              <Text color="error.600" fontSize="xs" mt={0.5} lineHeight="1.5">
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
            isDisabled={!privacyScrolledToEnd || !privacyAccepted || isLoading}
            isLoading={isLoading}
            loadingText="Accepting Policy..."
            onClick={next}
            borderRadius="4px"
            fontWeight="700"
            letterSpacing="0.01em"
            color="white"
            bg="brand.500"
            boxShadow="0 8px 22px rgba(96, 18, 48, 0.18)"
            rightIcon={<ArrowRight size={18} />}
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
            Continue to Confirmation
          </Button>

          <HStack justify="center" spacing={2} mt={4}>
            <Icon as={ShieldCheck} boxSize="14px" color="accent.600" />

            <Text fontSize="xs" color="taupe.500" textAlign="center">
              Your privacy choices are securely recorded.
            </Text>
          </HStack>
        </Box>

        {/* =====================================================
            PRIVACY NOTE
        ===================================================== */}
        <Text
          fontSize="xs"
          color="taupe.400"
          textAlign="center"
          lineHeight="1.6"
          maxW="620px"
          mx="auto"
        >
          Your data is encrypted and secure. We never share your information
          without your consent.
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}
