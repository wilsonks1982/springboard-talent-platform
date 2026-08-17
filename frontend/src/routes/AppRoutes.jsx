import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import RegistrationGuard from "./RegistrationGuard";

import LoginPage from "../pages/LoginPage";
import CandidateLandingPage from "../pages/candidate/CandidateLandingPage";
import CandidateProfilePage from "../pages/candidate/CandidateProfilePage";
import AssessmentsPage from "../pages/candidate/AssessmentsPage";

import WelcomePage from "../pages/registration/WelcomePage";
import NdaPage from "../pages/registration/NdaPage";
import PrivacyPage from "../pages/registration/PrivacyPage";
import AccountPage from "../pages/registration/AccountPage";
import SituationPage from "../pages/registration/SituationPage";
import VerificationPage from "../pages/registration/VerificationPage";
import ConfirmationPage from "../pages/registration/ConfirmationPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<RegistrationGuard />}>
        <Route path="/register/welcome" element={<WelcomePage />} />
        <Route path="/register/nda" element={<NdaPage />} />
        <Route path="/register/privacy" element={<PrivacyPage />} />
        <Route path="/register/account" element={<AccountPage />} />
        <Route path="/register/situation" element={<SituationPage />} />
        <Route path="/register/verification" element={<VerificationPage />} />
        <Route path="/register/confirmation" element={<ConfirmationPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/candidate" element={<CandidateLandingPage />} />
        <Route path="/candidate/profile" element={<CandidateProfilePage />} />
        <Route path="/candidate/assessments" element={<AssessmentsPage />} />
      </Route>

      <Route
        path="/"
        element={<Navigate to="/candidate" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}