import React from "react";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../store/registrationSlice";
import RegistrationLayout from "../../components/RegistrationLayout";

export default function WelcomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const begin = () => {
    dispatch(setStep("ONBOARDING"));
    navigate("/register/onboarding");
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={6}>
        <Text fontWeight="700" color="blue.600">
          SPRINGBOARD TALENT
        </Text>
        <Heading>Welcome</Heading>
        <Text color="gray.600">
          Create your candidate account and take the first step with Springboard
          Talent.
        </Text>
        <Button colorScheme="blue" size="lg" onClick={begin}>
          Begin
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}
