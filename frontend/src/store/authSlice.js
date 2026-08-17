import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: sessionStorage.getItem("accessToken"),
  user: null,
  authReady: false
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user || null;
      if (action.payload.accessToken) {
        sessionStorage.setItem("accessToken", action.payload.accessToken);
      }
    },
    setAuthReady(state, action) {
      state.authReady = action.payload;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      state.authReady = true;
      sessionStorage.removeItem("accessToken");
    }
  }
});

export const { setAuth, setAuthReady, clearAuth } = slice.actions;
export default slice.reducer;