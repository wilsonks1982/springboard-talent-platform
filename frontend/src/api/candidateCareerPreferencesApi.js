import { api } from "./http";

const BASE_URL = "/candidates/me/career-preferences";

export const candidateCareerPreferencesApi = {
  async get() {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  async update(data) {
    const response = await api.put(BASE_URL, data);
    return response.data;
  },
};
