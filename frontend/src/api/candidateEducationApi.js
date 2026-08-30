import { api } from "./http";

const BASE_URL = "/candidates/me/education";

export const candidateEducationApi = {
  async getAll() {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  async create(education) {
    const response = await api.post(BASE_URL, education);

    return response.data;
  },

  async update(id, education) {
    const response = await api.put(`${BASE_URL}/${id}`, education);

    return response.data;
  },

  async remove(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
