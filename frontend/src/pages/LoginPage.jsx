import React, { useState } from "react";
import {
  Alert, AlertIcon, Button, Heading, Input, FormControl,
  FormLabel, VStack, Container, Box, Text
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authApi } from "../api/authApi";
import { setAuth } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      const response = await authApi.login({ email, password });
      dispatch(setAuth({
        accessToken: response.data.accessToken,
        user: response.data.user
      }));
      navigate("/candidate", { replace: true });
    } catch (e) {
      setError(e.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <Container maxW="500px" py={20}>
      <Box bg="white" p={{ base: 6, md: 10 }} borderRadius="2xl" boxShadow="sm">
        <VStack align="stretch" spacing={5}>
          <Heading size="lg">Sign in</Heading>
          <Text color="gray.600">Access your Springboard Talent account.</Text>

          {error && <Alert status="error"><AlertIcon />{error}</Alert>}

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          <Button colorScheme="blue" onClick={submit}>Sign in</Button>
        </VStack>
      </Box>
    </Container>
  );
}