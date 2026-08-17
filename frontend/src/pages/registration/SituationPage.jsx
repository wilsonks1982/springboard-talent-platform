import React from "react";
import { Button, FormControl, FormLabel, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi, consentApi } from "../../api/authApi";
import RegistrationLayout from "../../components/RegistrationLayout";
import { setError, setSituation, setStep, setUserId } from "../../store/registrationSlice";
import { situations } from "../../utils/validation";

export default function SituationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registration = useSelector((s) => s.registration);

  const submit = async () => {
    if (!registration.employmentSituation) return;

    try {
      dispatch(setError(null));

      const response = await authApi.register({
        ...registration.account,
        employmentSituation: registration.employmentSituation
      });

      dispatch(setUserId(response.data.userId));

      await consentApi.accept({
        documentType: "NDA",
        documentVersion: "v1.0",
        jurisdiction: "IN"
      });

      await consentApi.accept({
        documentType: "PRIVACY_POLICY",
        documentVersion: "v1.0",
        jurisdiction: "IN"
      });

      dispatch(setStep("VERIFICATION"));
      navigate("/register/verification");
    } catch (e) {
      dispatch(setError(
        e.response?.data?.message || "Unable to create your account."
      ));
    }
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={6}>
        <FormControl>
          <FormLabel fontSize="xl" fontWeight="700">
            Which situation best describes you right now?
          </FormLabel>

          <RadioGroup
            value={registration.employmentSituation}
            onChange={(value) => dispatch(setSituation(value))}
          >
            <VStack align="stretch" spacing={4}>
              {situations.map(([value, label]) => (
                <Radio key={value} value={value}>{label}</Radio>
              ))}
            </VStack>
          </RadioGroup>
        </FormControl>

        {registration.error && (
          <Text color="red.500">{registration.error}</Text>
        )}

        <Button
          colorScheme="blue"
          isDisabled={!registration.employmentSituation}
          onClick={submit}
        >
          Create account
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}