import React, { useEffect, useMemo, useState } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../api/authApi";
import { hydrateStatus, setStep } from "../store/registrationSlice";

const routeStep = {
  "/register/welcome": "WELCOME",
  "/register/onboarding": "ONBOARDING",
  "/register/nda": "NDA",
  "/register/privacy": "PRIVACY",
  "/register/verification": "VERIFICATION",
  "/register/confirmation": "CONFIRMATION",
};

const order = [
  "WELCOME",
  "ONBOARDING",
  "NDA",
  "PRIVACY",
  "VERIFICATION",
  "CONFIRMATION",
];

const pathFor = (step) =>
  ({
    WELCOME: "/register/welcome",
    ONBOARDING: "/register/onboarding",
    NDA: "/register/nda",
    PRIVACY: "/register/privacy",
    VERIFICATION: "/register/verification",
    CONFIRMATION: "/register/confirmation",
  })[step] || "/register/welcome";

export default function RegistrationGuard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { accessToken } = useSelector((s) => s.auth);
  const registration = useSelector((s) => s.registration);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!accessToken) {
        if (active) setChecking(false);
        return;
      }

      try {
        const response = await authApi.status();
        if (active) {
          dispatch(hydrateStatus(response.data));
          setChecking(false);
        }
      } catch {
        if (active) setChecking(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [accessToken, dispatch]);

  const requested = routeStep[location.pathname] || "WELCOME";
  const requestedIndex = order.indexOf(requested);
  const currentIndex = order.indexOf(registration.step);

  const target = useMemo(() => {
    if (requestedIndex <= currentIndex) return null;
    return pathFor(registration.step);
  }, [requestedIndex, currentIndex, registration.step]);

  if (checking) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // Once registration is complete, don't allow the registration wizard to be reopened.
  if (
    registration.step === "CONFIRMATION" &&
    location.pathname !== "/register/confirmation"
  ) {
    return <Navigate to="/candidate" replace />;
  }

  if (target) {
    return <Navigate to={target} replace />;
  }

  return <Outlet />;
}
