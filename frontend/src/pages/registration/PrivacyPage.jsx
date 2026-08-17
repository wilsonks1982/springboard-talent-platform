import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScrollGate from "../../components/ScrollGate";
import RegistrationLayout from "../../components/RegistrationLayout";
import { acceptPrivacy, setPrivacyScrolledToEnd, setStep } from "../../store/registrationSlice";

export default function PrivacyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { privacyAccepted, privacyScrolledToEnd } = useSelector((s) => s.registration);

  const next = () => {
    if (!privacyAccepted) return;
    dispatch(setStep("ACCOUNT"));
    navigate("/register/account");
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={6}>
        <ScrollGate
          title="Privacy Consent"
          accepted={privacyAccepted}
          onEnd={() => dispatch(setPrivacyScrolledToEnd(true))}
          onAccept={() => dispatch(acceptPrivacy())}
        />
        <Button
          colorScheme="blue"
          isDisabled={!privacyScrolledToEnd || !privacyAccepted}
          onClick={next}
        >
          Continue
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}