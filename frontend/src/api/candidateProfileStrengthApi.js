import { api } from "./http";

const BASE_URL = "/candidates/me/profile-strength";

export const profileStrengthApi = {
  async get() {
    const response = await api.get(BASE_URL);
    return response.data;
  },
};
