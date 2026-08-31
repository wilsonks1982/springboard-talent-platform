import { api } from "./http";

const BASE_URL = "/candidates/me/certifications";

export const candidateCertificationApi = {
  async getAll() {
    const response = await api.get(BASE_URL);
    return response.data;
  },
  async create(certification) {
    const response = await api.post(BASE_URL, certification);
    return response.data;
  },
  async update(id, certification) {
    const response = await api.put(`${BASE_URL}/${id}`, certification);
    return response.data;
  },
  async delete(id) {
    await api.delete(`${BASE_URL}/${id}`);
  },
};
