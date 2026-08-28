import { api } from "./http";

export const candidateApi = {
  getMe: async () => {
    const response = await api.get("/candidates/me");
    return response.data;
  },
};
