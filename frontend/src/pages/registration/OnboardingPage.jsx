import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import {
  updateAccount,
  setSituation,
  setStep,
  setError,
  setUserId,
} from "../../store/registrationSlice";
import { normalizePhone, validateAccount } from "../../utils/validation";
import { authApi, consentApi } from "../../api/authApi";

export default function OnboardingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, employmentSituation, error } = useSelector(
    (s) => s.registration,
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const update = (field, value) => dispatch(updateAccount({ [field]: value }));

  const submit = async () => {
    // Validate account fields
    const validation = validateAccount(account);
    setErrors(validation);

    if (Object.keys(validation).length || !employmentSituation) {
      if (!employmentSituation) {
        dispatch(setError("Please select your employment situation."));
      }
      return;
    }

    setIsLoading(true);
    try {
      dispatch(setError(null));

      // Normalize phone
      const normalizedAccount = {
        ...account,
        phone: normalizePhone(account.phone),
      };

      // Create account
      const response = await authApi.register({
        ...normalizedAccount,
        employmentSituation,
      });

      dispatch(setUserId(response.data.userId));

      // Accept NDA
      await consentApi.accept({
        documentType: "NDA",
        documentVersion: "v1.0",
        jurisdiction: "IN",
      });

      // Accept Privacy Policy
      await consentApi.accept({
        documentType: "PRIVACY_POLICY",
        documentVersion: "v1.0",
        jurisdiction: "IN",
      });

      dispatch(setStep("NDA"));
      navigate("/register/nda");
    } catch (e) {
      dispatch(
        setError(e.response?.data?.message || "Unable to create your account."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const field = (name, label, type = "text") => (
    <FormControl isInvalid={!!errors[name]}>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        value={account[name]}
        onChange={(e) => update(name, e.target.value)}
      />
      <FormErrorMessage>{errors[name]}</FormErrorMessage>
    </FormControl>
  );

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={6}>
        {/* Account Information Section */}
        <div>
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Account Information
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            {field("fullName", "Full name")}
            {field("email", "Email", "email")}
            {field("phone", "Phone")}
            {field("city", "City")}
            {field("password", "Password", "password")}
            {field("confirmPassword", "Confirm password", "password")}
          </SimpleGrid>
        </div>

        {/* Employment Situation Section */}
        <div>
          <Text fontSize="lg" fontWeight="600" mb={4}>
            Employment Situation
          </Text>
          <FormControl>
            <FormLabel fontSize="md">
              Which situation best describes you right now?
            </FormLabel>
            <RadioGroup
              value={employmentSituation}
              onChange={(value) => dispatch(setSituation(value))}
            >
              <VStack align="stretch" spacing={3}>
                <Radio value="CURRENTLY_EMPLOYED">Currently employed</Radio>
                <Radio value="RECENTLY_IMPACTED">Recently impacted</Radio>
                <Radio value="CAREER_BREAK">On a career break</Radio>
                <Radio value="RETURNING_TO_WORKFORCE">
                  Returning to the workforce
                </Radio>
              </VStack>
            </RadioGroup>
          </FormControl>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          colorScheme="blue"
          onClick={submit}
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}
