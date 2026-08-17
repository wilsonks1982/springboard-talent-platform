import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RegistrationGuard from "./RegistrationGuard";

import PublicLandingPage from "../pages/PublicLandingPage";
import LoginPage from "../pages/LoginPage";
import CandidateLandingPage from "../pages/candidate/CandidateLandingPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import AssessmentsPage from "../pages/candidate/AssessmentsPage";

import WelcomePage from "../pages/registration/WelcomePage";
import OnboardingPage from "../pages/registration/OnboardingPage";
import NdaPage from "../pages/registration/NdaPage";
import PrivacyPage from "../pages/registration/PrivacyPage";
import VerificationPage from "../pages/registration/VerificationPage";
import ConfirmationPage from "../pages/registration/ConfirmationPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Registration Routes */}
      <Route element={<RegistrationGuard />}>
        <Route path="/register/welcome" element={<WelcomePage />} />
        <Route path="/register/onboarding" element={<OnboardingPage />} />
        <Route path="/register/nda" element={<NdaPage />} />
        <Route path="/register/privacy" element={<PrivacyPage />} />
        <Route path="/register/verification" element={<VerificationPage />} />
        <Route path="/register/confirmation" element={<ConfirmationPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/candidate" element={<CandidateLandingPage />} />
        <Route path="/candidate/profile" element={<CandidateProfilePage />} />
        <Route path="/candidate/assessments" element={<AssessmentsPage />} />
      </Route>

      {/* Fallbacks */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
