import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: "WELCOME",

  registrationInitialized: false,

  ndaAccepted: false,
  ndaScrolledToEnd: false,

  privacyAccepted: false,
  privacyScrolledToEnd: false,

  account: {
    fullName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
    confirmPassword: "",
  },

  employmentSituation: "",

  userId: null,

  // Retained for account/profile status.
  // They are no longer part of onboarding navigation.
  emailVerified: false,
  phoneVerified: false,

  error: null,
};

const slice = createSlice({
  name: "registration",

  initialState,

  reducers: {
    hydrateStatus(state, action) {
      const p = action.payload;

      state.registrationInitialized = true;

      state.userId = p.userId ?? state.userId;

      state.ndaAccepted = !!p.ndaAccepted;
      state.privacyAccepted = !!p.privacyAccepted;

      // Retain verification status returned by backend,
      // but do not use it to control onboarding progression.
      state.emailVerified = !!p.emailVerified;
      state.phoneVerified = !!p.phoneVerified;

      state.employmentSituation =
        p.employmentSituation ?? state.employmentSituation;

      state.step = p.currentStep ?? state.step;

      state.error = null;
    },

    setStep(state, action) {
      state.step = action.payload;
      state.error = null;
    },

    setNdaScrolledToEnd(state, action) {
      state.ndaScrolledToEnd = action.payload;
    },

    acceptNda(state) {
      if (state.ndaScrolledToEnd) {
        state.ndaAccepted = true;
      }
    },

    setPrivacyScrolledToEnd(state, action) {
      state.privacyScrolledToEnd = action.payload;
    },

    acceptPrivacy(state) {
      if (state.privacyScrolledToEnd) {
        state.privacyAccepted = true;
      }
    },

    updateAccount(state, action) {
      state.account = {
        ...state.account,
        ...action.payload,
      };
    },

    setSituation(state, action) {
      state.employmentSituation = action.payload;
    },

    setUserId(state, action) {
      state.userId = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    reset() {
      return initialState;
    },
  },
});

export const {
  hydrateStatus,
  setStep,
  setNdaScrolledToEnd,
  acceptNda,
  setPrivacyScrolledToEnd,
  acceptPrivacy,
  updateAccount,
  setSituation,
  setUserId,
  setError,
  reset,
} = slice.actions;

export default slice.reducer;
