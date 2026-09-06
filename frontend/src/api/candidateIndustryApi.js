import { api } from "./http";

export const candidateIndustryApi = {
  async getAvailable() {
    const response = await api.get("/taxonomy/industries");

    return response.data;
  },

  async getSelected() {
    const response = await api.get("/candidates/me/industries");

    return response.data;
  },

  async update(tagIds) {
    const response = await api.put("/candidates/me/industries", {
      tagIds,
    });

    return response.data;
  },
};
