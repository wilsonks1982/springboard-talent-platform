import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute() {
  const { accessToken } = useSelector((s) => s.auth);

  // Allow access to public pages (/login, /) for unauthenticated users
  // Redirect authenticated users to /candidate
  return accessToken ? <Navigate to="/candidate" replace /> : <Outlet />;
}
