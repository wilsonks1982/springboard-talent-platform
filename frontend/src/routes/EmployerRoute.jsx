import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EmployerRoute() {
  const location = useLocation();

  const { accessToken, user } = useSelector((state) => state.auth);

  if (!accessToken) {
    return (
      <Navigate
        to="/employer/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  /*
   * If the authenticated user role is already available,
   * prevent candidate users from entering employer routes.
   *
   * We deliberately allow the route when user is null because
   * the current auth slice persists the access token but does
   * not reliably rehydrate the user object after a page refresh.
   *
   * Backend authorization remains the final security boundary.
   */
  if (user?.role && user.role !== "COMPANY") {
    return <Navigate to="/candidate" replace />;
  }

  return <Outlet />;
}
