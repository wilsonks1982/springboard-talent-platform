import React, { useState } from "react";
import {
  Alert, AlertIcon, Button, FormControl, FormLabel, Input,
  Text, VStack
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import RegistrationLayout from "../../components/RegistrationLayout";
import { setError, setStep, setVerification } from "../../store/registrationSlice";

export default function VerificationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { account, emailVerified, phoneVerified, error } =
    useSelector((s) => s.registration);

  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [sent, setSent] = useState(false);

  const verifyEmail = async () => {
    try {
      dispatch(setError(null));
      await authApi.verifyEmail({ code: emailCode });
      dispatch(setVerification({ emailVerified: true }));
    } catch (e) {
      dispatch(setError(e.response?.data?.message || "Invalid email verification code."));
    }
  };

  const sendOtp = async () => {
    try {
      dispatch(setError(null));
      await authApi.sendOtp();
      setSent(true);
    } catch (e) {
      dispatch(setError(e.response?.data?.message || "Unable to send OTP."));
    }
  };

  const verifyPhone = async () => {
    try {
      dispatch(setError(null));
      await authApi.verifyOtp({ code: phoneCode });
      dispatch(setVerification({ phoneVerified: true }));
    } catch (e) {
      dispatch(setError(e.response?.data?.message || "Invalid phone OTP."));
    }
  };

  const continueToConfirmation = () => {
    if (emailVerified && phoneVerified) {
      dispatch(setStep("CONFIRMATION"));
      navigate("/register/confirmation");
    }
  };

  return (
    <RegistrationLayout>
      <VStack align="stretch" spacing={7}>
        <Text fontSize="2xl" fontWeight="700">Verify your account</Text>

        <FormControl>
          <FormLabel>Email verification</FormLabel>
          <Text fontSize="sm" color="gray.600" mb={3}>
            Verification was sent to {account.email}.
          </Text>
          <Input
            placeholder="6-digit code"
            value={emailCode}
            onChange={(e) => setEmailCode(e.target.value)}
            isDisabled={emailVerified}
          />
          <Button mt={3} onClick={verifyEmail} isDisabled={emailVerified || !emailCode}>
            {emailVerified ? "Email verified" : "Verify email"}
          </Button>
        </FormControl>

        <FormControl>
          <FormLabel>Phone verification</FormLabel>
          <Text fontSize="sm" color="gray.600" mb={3}>
            We'll send a one-time code to your registered phone number.
          </Text>
          <Button onClick={sendOtp} isDisabled={phoneVerified}>
            {sent ? "Resend OTP" : "Send OTP"}
          </Button>

          {sent && (
            <>
              <Input
                mt={3}
                placeholder="6-digit OTP"
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
                isDisabled={phoneVerified}
              />
              <Button mt={3} onClick={verifyPhone} isDisabled={phoneVerified || !phoneCode}>
                {phoneVerified ? "Phone verified" : "Verify phone"}
              </Button>
            </>
          )}
        </FormControl>

        {error && <Alert status="error"><AlertIcon />{error}</Alert>}

        <Button
          colorScheme="blue"
          isDisabled={!emailVerified || !phoneVerified}
          onClick={continueToConfirmation}
        >
          Continue
        </Button>
      </VStack>
    </RegistrationLayout>
  );
}