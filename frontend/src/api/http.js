import axios from "axios";
import { store } from "../store";
import { clearAuth } from "../store/authSlice";
import { getApiConfig } from "./apiConfig";

const apiConfig = getApiConfig();

export const api = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: apiConfig.timeout,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  },
);
