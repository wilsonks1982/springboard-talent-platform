import { api } from "./http";

const BASE_URL = "/candidates/me/experiences";

export const candidateExperienceApi = {
  async getAll() {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  async create(experience) {
    const response = await api.post(BASE_URL, experience);

    return response.data;
  },

  async update(id, experience) {
    const response = await api.put(`${BASE_URL}/${id}`, experience);

    return response.data;
  },

  async remove(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
