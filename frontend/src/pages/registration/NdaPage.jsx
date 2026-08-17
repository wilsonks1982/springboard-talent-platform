import React from "react";
import { Button, VStack, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <VStack align="stretch" spacing={6}>
        <ScrollGate
          title="Non-Disclosure Agreement"
          accepted={ndaAccepted}
          onEnd={() => dispatch(setNdaScrolledToEnd(true))}
          onAccept={() => dispatch(acceptNda())}
        />

        {error && (
          <Alert status="error" borderRadius="lg" bg="red.50">
            <AlertIcon color="red.500" />
            <Text color="red.600" fontSize="sm">
              {error}
            </Text>
          </Alert>
        )}

        <Button
          colorScheme="blue"
          isDisabled={!ndaScrolledToEnd || !ndaAccepted || isLoading}
          isLoading={isLoading}
          loadingText="Accepting NDA..."
          onClick={next}
        >
          Continue
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}
