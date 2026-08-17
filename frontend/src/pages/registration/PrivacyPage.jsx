import React from "react";
import { Button, VStack, Alert, AlertIcon, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
      <VStack align="stretch" spacing={6}>
        <ScrollGate
          title="Privacy & Data Policy"
          accepted={privacyAccepted}
          onEnd={() => dispatch(setPrivacyScrolledToEnd(true))}
          onAccept={() => dispatch(acceptPrivacy())}
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
          isDisabled={!privacyScrolledToEnd || !privacyAccepted || isLoading}
          isLoading={isLoading}
          loadingText="Accepting Policy..."
          onClick={next}
        >
          Continue
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}
