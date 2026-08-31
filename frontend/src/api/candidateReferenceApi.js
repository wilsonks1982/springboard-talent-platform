import { api } from "./http";

const BASE_URL = "/candidates/me/references";

export const candidateReferenceApi = {
  async getAll() {
    const response = await api.get(BASE_URL);
    return response.data;
  },

  async create(data) {
    const response = await api.post(BASE_URL, data);
    return response.data;
  },

  async update(id, data) {
    const response = await api.put(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
