import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import EmployerRoute from "./EmployerRoute";
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

import EmployerLoginPage from "../pages/employer/EmployerLoginPage";
import EmployerRegistrationPage from "../pages/employer/EmployerRegistrationPage";
import EmployerEngagementSetupPage from "../pages/employer/EmployerEngagementSetupPage";

import { ROUTES } from "./routePaths";

export default function AppRoutes() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC
      ===================================================== */}

      <Route element={<PublicRoute />}>
        <Route path={ROUTES.HOME} element={<PublicLandingPage />} />

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        <Route path={ROUTES.EMPLOYER_LOGIN} element={<EmployerLoginPage />} />

        <Route
          path={ROUTES.EMPLOYER_REGISTER}
          element={<EmployerRegistrationPage />}
        />
      </Route>

      {/* =====================================================
          CANDIDATE REGISTRATION
      ===================================================== */}

      <Route element={<RegistrationGuard />}>
        <Route path={ROUTES.REGISTER_WELCOME} element={<WelcomePage />} />

        <Route path={ROUTES.REGISTER_ONBOARDING} element={<OnboardingPage />} />

        <Route path={ROUTES.REGISTER_NDA} element={<NdaPage />} />

        <Route path={ROUTES.REGISTER_PRIVACY} element={<PrivacyPage />} />

        <Route
          path={ROUTES.REGISTER_CONFIRMATION}
          element={<ConfirmationPage />}
        />
      </Route>

      {/* =====================================================
          CANDIDATE PROTECTED
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        {/* Profile setup must remain accessible before
            profile completion. */}
        <Route
          path={ROUTES.CANDIDATE_PROFILE_SETUP}
          element={<CandidateProfileSetupPage />}
        />

        {/* Candidate workspace requires completed profile. */}
        <Route element={<CandidateProfileGate />}>
          <Route path={ROUTES.CANDIDATE} element={<CandidateLandingPage />} />

          <Route
            path={ROUTES.CANDIDATE_PROFILE}
            element={<CandidateProfilePage />}
          />

          <Route
            path={ROUTES.CANDIDATE_ASSESSMENTS}
            element={<AssessmentsPage />}
          />
        </Route>
      </Route>

      {/* =====================================================
          EMPLOYER PROTECTED
      ===================================================== */}

      <Route element={<EmployerRoute />}>
        <Route
          path={ROUTES.EMPLOYER_SETUP_ENGAGEMENT}
          element={<EmployerEngagementSetupPage />}
        />

        {/* Employer workspace — coming next */}
        {/* 
        <Route
          path={ROUTES.EMPLOYER}
          element={<EmployerLandingPage />}
        />
        */}
      </Route>

      {/* =====================================================
          FALLBACK
      ===================================================== */}

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
