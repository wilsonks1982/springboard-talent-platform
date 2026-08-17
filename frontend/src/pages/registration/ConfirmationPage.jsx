import React from "react";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import { setStep } from "../../store/registrationSlice";

export default function ConfirmationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToLogin = () => {
    dispatch(setStep("WELCOME"));
    navigate("/login", { replace: true });
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={5}>
        <Heading size="lg">Your account is ready</Heading>
        <Text>
          Your Springboard Talent registration is complete.
        </Text>
        <Text color="gray.600">
          Next: Assessment Suite, Playbook and Coach Matching.
        </Text>
        <Button colorScheme="blue" onClick={goToLogin}>
          Continue to sign in
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}