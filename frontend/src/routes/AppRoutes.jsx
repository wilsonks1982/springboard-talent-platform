import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RegistrationGuard from "./RegistrationGuard";
import CandidateProfileGate from "./CandidateProfileGate";

import PublicLandingPage from "../pages/PublicLandingPage";
import LoginPage from "../pages/LoginPage";

import CandidateLandingPage from "../pages/candidate/CandidateLandingPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import CandidateProfileSetupPage from "../pages/candidate/CandidateProfileSetupPage";
import AssessmentsPage from "../pages/candidate/AssessmentsPage";

import WelcomePage from "../pages/registration/WelcomePage";
import OnboardingPage from "../pages/registration/OnboardingPage";
import NdaPage from "../pages/registration/NdaPage";
import PrivacyPage from "../pages/registration/PrivacyPage";
import ConfirmationPage from "../pages/registration/ConfirmationPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ==================== PUBLIC ROUTES ==================== */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<PublicLandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* ==================== REGISTRATION ROUTES ==================== */}
      <Route element={<RegistrationGuard />}>
        <Route path="/register/welcome" element={<WelcomePage />} />

        <Route path="/register/onboarding" element={<OnboardingPage />} />

        <Route path="/register/nda" element={<NdaPage />} />

        <Route path="/register/privacy" element={<PrivacyPage />} />

        <Route path="/register/confirmation" element={<ConfirmationPage />} />
      </Route>

      {/* ==================== PROTECTED CANDIDATE ROUTES ==================== */}
      <Route element={<ProtectedRoute />}>
        {/* Profile setup must remain accessible before completion */}
        <Route
          path="/candidate/profile-setup"
          element={<CandidateProfileSetupPage />}
        />

        {/* Candidate workspace requires completed profile */}
        <Route element={<CandidateProfileGate />}>
          <Route path="/candidate" element={<CandidateLandingPage />} />

          <Route path="/candidate/profile" element={<CandidateProfilePage />} />

          <Route path="/candidate/assessments" element={<AssessmentsPage />} />
        </Route>
      </Route>

      {/* ==================== FALLBACK ==================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
