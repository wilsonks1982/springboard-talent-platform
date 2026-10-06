import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "./routePaths";

export default function PublicRoute() {
  const location = useLocation();
  const { accessToken, user } = useSelector((state) => state.auth);

  if (!accessToken) {
    return <Outlet />;
  }

  /*
   * Employer authentication
   *
   * After employer registration/login, do not send the user
   * into the candidate application.
   */
  if (user?.role === "COMPANY") {
    return <Navigate to={ROUTES.EMPLOYER_SETUP_ENGAGEMENT} replace />;
  }

  /*
   * Candidate authentication
   */
  return <Navigate to={ROUTES.CANDIDATE} replace />;
}
