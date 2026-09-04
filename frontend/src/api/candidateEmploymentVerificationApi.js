import { api } from "./http";

const BASE_URL = "/candidates/me/employment-verification";

export const candidateEmploymentVerificationApi = {
  async get() {
    const response = await api.get(BASE_URL);

    return response.data;
  },

  async update(data) {
    const response = await api.put(BASE_URL, data);

    return response.data;
  },

  async triggerVerification() {
    const response = await api.post(`${BASE_URL}/trigger`);

    return response.data;
  },
};
