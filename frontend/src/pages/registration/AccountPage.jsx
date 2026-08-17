import React, { useState } from "react";
import {
  Alert, AlertIcon, Button, FormControl, FormErrorMessage,
  FormLabel, Input, SimpleGrid, VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegistrationLayout from "../../components/RegistrationLayout";
import { updateAccount, setStep } from "../../store/registrationSlice";
import { normalizePhone, validateAccount } from "../../utils/validation";

export default function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, error } = useSelector((s) => s.registration);
  const [errors, setErrors] = useState({});

  const update = (field, value) =>
    dispatch(updateAccount({ [field]: value }));

  const submit = () => {
    const validation = validateAccount(account);
    setErrors(validation);

    if (!Object.keys(validation).length) {
      dispatch(updateAccount({ phone: normalizePhone(account.phone) }));
      dispatch(setStep("SITUATION"));
      navigate("/register/situation");
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
      <VStack align="stretch" spacing={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {field("fullName", "Full name")}
          {field("email", "Email", "email")}
          {field("phone", "Phone")}
          {field("city", "City")}
          {field("password", "Password", "password")}
          {field("confirmPassword", "Confirm password", "password")}
        </SimpleGrid>

        {error && <Alert status="error"><AlertIcon />{error}</Alert>}

        <Button colorScheme="blue" onClick={submit}>Continue</Button>
      </VStack>
    </RegistrationLayout>
  );
}