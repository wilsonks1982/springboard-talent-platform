import React, { useEffect } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { authApi } from "./api/authApi";
import { setAuth, setAuthReady, clearAuth } from "./store/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const { accessToken, authReady } = useSelector((s) => s.auth);

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      if (!accessToken) {
        console.log("No access token found, clearing auth state.");
        dispatch(setAuthReady(true));
        return;
      }

      try {
        const response = await authApi.me();
        if (active) {
          dispatch(setAuth({ accessToken, user: response.data }));
          dispatch(setAuthReady(true));
        }
      } catch {
        if (active) {
          dispatch(clearAuth());
          dispatch(setAuthReady(true));
        }
      }
    }

    bootstrap();
    return () => {
      active = false;
    };
  }, [dispatch, accessToken]);

  if (!authReady) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return <AppRoutes />;
}
