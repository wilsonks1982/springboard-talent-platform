import React from "react";
import {
  Button,
  VStack,
  Alert,
  AlertIcon,
  Text,
  Box,
  HStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
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
      <VStack align="stretch" spacing={7}>
        {/* Header */}
        <Box>
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
              Step 3 · Privacy
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
              <Icon as={Shield} w={18} h={18} color="purple.600" />
            </Box>

            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="800"
              color="gray.900"
              letterSpacing="-0.025em"
              lineHeight="1.2"
            >
              Review Privacy & Data Policy
            </Text>
          </HStack>

          <Text fontSize="sm" color="gray.500" lineHeight="1.7" maxW="650px">
            We take your privacy seriously. Please review how your personal data
            is collected, protected, and used.
          </Text>
        </Box>

        {/* Privacy Document */}
        <Box
          bg="white"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="2xl"
          p={{ base: 2, md: 3 }}
          boxShadow="0 10px 30px rgba(88, 28, 135, 0.07)"
        >
          <Box bg="gray.50" borderRadius="xl" p={1}>
            <ScrollGate
              title="Privacy & Data Policy"
              accepted={privacyAccepted}
              onEnd={() => dispatch(setPrivacyScrolledToEnd(true))}
              onAccept={() => dispatch(acceptPrivacy())}
            />
          </Box>
        </Box>

        {/* Scroll Guidance */}
        {!privacyScrolledToEnd && (
          <Alert
            status="info"
            borderRadius="xl"
            bg="purple.50"
            border="1px solid"
            borderColor="purple.100"
            px={4}
            py={3}
          >
            <Box
              w="32px"
              h="32px"
              borderRadius="lg"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={3}
              flexShrink={0}
            >
              <Icon as={Shield} w={16} h={16} color="purple.600" />
            </Box>

            <Box>
              <Text fontWeight="700" color="purple.800" fontSize="sm">
                Review the complete policy
              </Text>

              <Text color="purple.700" fontSize="xs" mt={0.5} lineHeight="1.5">
                Scroll to the bottom of the document to enable acceptance.
              </Text>
            </Box>
          </Alert>
        )}

        {/* Ready to Accept */}
        {privacyScrolledToEnd && !privacyAccepted && (
          <Alert
            status="warning"
            borderRadius="xl"
            bg="orange.50"
            border="1px solid"
            borderColor="orange.100"
            px={4}
            py={3}
          >
            <AlertIcon color="orange.500" />

            <Box>
              <Text fontWeight="700" color="orange.800" fontSize="sm">
                Ready for acceptance
              </Text>

              <Text color="orange.700" fontSize="xs" mt={0.5}>
                Please check the acceptance box in the policy before continuing.
              </Text>
            </Box>
          </Alert>
        )}

        {/* Accepted */}
        {privacyAccepted && (
          <Alert
            status="success"
            borderRadius="xl"
            bg="purple.50"
            border="1px solid"
            borderColor="purple.100"
            px={4}
            py={3}
          >
            <Box
              w="32px"
              h="32px"
              borderRadius="lg"
              bg="white"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mr={3}
              flexShrink={0}
            >
              <Icon as={CheckCircle2} w={16} h={16} color="purple.600" />
            </Box>

            <Box>
              <Text fontWeight="700" color="purple.800" fontSize="sm">
                Privacy Policy accepted
              </Text>

              <Text color="purple.700" fontSize="xs" mt={0.5}>
                Your privacy consent has been recorded. You can now complete
                your registration.
              </Text>
            </Box>
          </Alert>
        )}

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
            height="54px"
            isDisabled={!privacyScrolledToEnd || !privacyAccepted || isLoading}
            isLoading={isLoading}
            loadingText="Accepting Policy..."
            onClick={next}
            borderRadius="xl"
            fontWeight="800"
            color="white"
            bgGradient="linear(to-r, purple.700, purple.600)"
            boxShadow="0 10px 28px rgba(128, 90, 213, 0.22)"
            rightIcon={<ArrowRight size={16} />}
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
            Continue to Confirmation
          </Button>

          <HStack justify="center" spacing={2} mt={4}>
            <Icon as={ShieldCheck} w={14} h={14} color="purple.500" />

            <Text fontSize="xs" color="gray.500" textAlign="center">
              Your privacy choices are securely recorded.
            </Text>
          </HStack>
        </Box>

        {/* Privacy Note */}
        <Text
          fontSize="xs"
          color="gray.400"
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
