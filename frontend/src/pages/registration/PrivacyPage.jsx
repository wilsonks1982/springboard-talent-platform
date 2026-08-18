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
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Shield, CheckCircle2 } from "lucide-react";
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

      dispatch(setStep("VERIFICATION"));
      navigate("/register/verification");
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
      <VStack align="stretch" spacing={8}>
        {/* Header Section */}
        <Box>
          <HStack spacing={3} mb={4}>
            <Icon as={Shield} w={6} h={6} color="blue.600" />
            <Text fontSize="lg" fontWeight="700" color="gray.800">
              Review Privacy & Data Policy
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            We take your privacy seriously. Please review how we protect your
            personal data.
          </Text>
        </Box>

        {/* ScrollGate Component */}
        <Box bg="gray.50" borderRadius="xl" p={1}>
          <ScrollGate
            title="Privacy & Data Policy"
            accepted={privacyAccepted}
            onEnd={() => dispatch(setPrivacyScrolledToEnd(true))}
            onAccept={() => dispatch(acceptPrivacy())}
          />
        </Box>

        {/* Status Messages */}
        {!privacyScrolledToEnd && (
          <Alert
            status="info"
            borderRadius="lg"
            bg="blue.50"
            borderLeft="4px solid"
            borderColor="blue.500"
          >
            <AlertIcon color="blue.500" />
            <Box>
              <Text fontWeight="600" color="blue.700" fontSize="sm">
                Scroll to Bottom
              </Text>
              <Text color="blue.600" fontSize="sm">
                Please scroll to the end of the document to enable acceptance.
              </Text>
            </Box>
          </Alert>
        )}

        {privacyScrolledToEnd && !privacyAccepted && (
          <Alert
            status="warning"
            borderRadius="lg"
            bg="amber.50"
            borderLeft="4px solid"
            borderColor="amber.500"
          >
            <AlertIcon color="amber.500" />
            <Box>
              <Text fontWeight="600" color="amber.700" fontSize="sm">
                Accept to Continue
              </Text>
              <Text color="amber.600" fontSize="sm">
                Please check the box to accept our Privacy & Data Policy.
              </Text>
            </Box>
          </Alert>
        )}

        {privacyAccepted && (
          <Alert
            status="success"
            borderRadius="lg"
            bg="green.50"
            borderLeft="4px solid"
            borderColor="green.500"
          >
            <Icon as={CheckCircle2} w={5} h={5} color="green.500" />
            <Box ml={3}>
              <Text fontWeight="600" color="green.700" fontSize="sm">
                Privacy Policy Accepted
              </Text>
              <Text color="green.600" fontSize="sm">
                Thank you for accepting our Privacy & Data Policy.
              </Text>
            </Box>
          </Alert>
        )}

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

        {/* Action Buttons */}
        <HStack spacing={3} pt={4}>
          <Button
            colorScheme="blue"
            size="lg"
            isDisabled={!privacyScrolledToEnd || !privacyAccepted || isLoading}
            isLoading={isLoading}
            loadingText="Accepting Policy..."
            onClick={next}
            flex={1}
            borderRadius="lg"
            fontWeight="700"
          >
            Continue to Verification
          </Button>
        </HStack>

        {/* Info Text */}
        <Text fontSize="xs" color="gray.600" textAlign="center">
          Your data is encrypted and secure. We never share your information
          without your consent.
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}
