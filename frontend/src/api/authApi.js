import { api } from "./http";

export const authApi = {
  register: (payload) => api.post("/auth/register", payload),
  login: (payload) => api.post("/auth/login", payload),
  logout: () => api.post("/auth/logout"),
  me: () => api.get("/auth/me"),
  status: () => api.get("/auth/registration/status"),
  verifyEmail: (payload) => api.post("/auth/email/verify", payload),
  resendEmail: () => api.post("/auth/email/resend"),
  sendOtp: () => api.post("/auth/phone/send-otp"),
  verifyOtp: (payload) => api.post("/auth/phone/verify-otp", payload),
};

export const consentApi = {
  accept: (payload) => api.post("/consents", payload),
  current: () => api.get("/consents/current"),
};
