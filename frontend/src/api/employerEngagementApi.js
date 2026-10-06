import { api } from "./http";

const BASE_URL = "/employers/me/engagements";

export const employerEngagementApi = {
  async create({ engagementType, context }) {
    const response = await api.post(`${BASE_URL}`, {
      engagementType,
      context: context?.trim() || null,
    });
    return response.data;
  },

  async getMine() {
    const response = await api.get(`${BASE_URL}`);
    return response.data || [];
  },
};
