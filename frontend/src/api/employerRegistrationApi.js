import { api } from "./http";

const BASE_URL = "/employers";

export const employerRegistrationApi = {
  async register(data) {
    const response = await api.post(`${BASE_URL}/register`, data);
    return response.data;
  },
};
