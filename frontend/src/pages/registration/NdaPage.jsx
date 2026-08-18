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
import { FileText, CheckCircle2 } from "lucide-react";
import ScrollGate from "../../components/ScrollGate";
import RegistrationLayout from "../../components/RegistrationLayout";
import {
  acceptNda,
  setNdaScrolledToEnd,
  setStep,
  setError,
} from "../../store/registrationSlice";
import { consentApi } from "../../api/authApi";

export default function NdaPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ndaAccepted, ndaScrolledToEnd, error } = useSelector(
    (s) => s.registration,
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const next = async () => {
    if (!ndaAccepted) return;

    setIsLoading(true);
    try {
      dispatch(setError(null));

      // Accept NDA consent
      await consentApi.accept({
        documentType: "NDA",
        documentVersion: "v1.0",
        jurisdiction: "IN",
      });

      dispatch(setStep("PRIVACY"));
      navigate("/register/privacy");
    } catch (e) {
      dispatch(setError(e.response?.data?.message || "Unable to accept NDA."));
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
            <Icon as={FileText} w={6} h={6} color="blue.600" />
            <Text fontSize="lg" fontWeight="700" color="gray.800">
              Review Non-Disclosure Agreement
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Please read and accept our NDA to continue with your registration.
          </Text>
        </Box>

        {/* ScrollGate Component */}
        <Box bg="gray.50" borderRadius="xl" p={1}>
          <ScrollGate
            title="Non-Disclosure Agreement"
            accepted={ndaAccepted}
            onEnd={() => dispatch(setNdaScrolledToEnd(true))}
            onAccept={() => dispatch(acceptNda())}
          />
        </Box>

        {/* Status Messages */}
        {!ndaScrolledToEnd && (
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

        {ndaScrolledToEnd && !ndaAccepted && (
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
                Please check the box to accept the Non-Disclosure Agreement.
              </Text>
            </Box>
          </Alert>
        )}

        {ndaAccepted && (
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
                NDA Accepted
              </Text>
              <Text color="green.600" fontSize="sm">
                Thank you for accepting our Non-Disclosure Agreement.
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
            isDisabled={!ndaScrolledToEnd || !ndaAccepted || isLoading}
            isLoading={isLoading}
            loadingText="Accepting NDA..."
            onClick={next}
            flex={1}
            borderRadius="lg"
            fontWeight="700"
          >
            Continue to Privacy Policy
          </Button>
        </HStack>

        {/* Info Text */}
        <Text fontSize="xs" color="gray.600" textAlign="center">
          This is a legal document. Please ensure you understand and agree to
          all terms before continuing.
        </Text>
      </VStack>
    </RegistrationLayout>
  );
}
