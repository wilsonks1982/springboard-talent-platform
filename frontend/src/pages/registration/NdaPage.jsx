import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScrollGate from "../../components/ScrollGate";
import RegistrationLayout from "../../components/RegistrationLayout";
import { acceptNda, setNdaScrolledToEnd, setStep } from "../../store/registrationSlice";

export default function NdaPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ndaAccepted, ndaScrolledToEnd } = useSelector((s) => s.registration);

  const next = () => {
    if (!ndaAccepted) return;
    dispatch(setStep("PRIVACY"));
    navigate("/register/privacy");
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
        <Button
          colorScheme="blue"
          isDisabled={!ndaScrolledToEnd || !ndaAccepted}
          onClick={next}
        >
          Continue
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}