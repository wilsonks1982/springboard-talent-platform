import { configureStore } from "@reduxjs/toolkit";
import registration from "./registrationSlice";
import auth from "./authSlice";

export const store = configureStore({
  reducer: { registration, auth }
});