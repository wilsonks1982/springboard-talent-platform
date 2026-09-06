import { api } from "./http";

export const candidateSkillApi = {
  async getAvailable() {
    const response = await api.get("/taxonomy/skills");

    return response.data;
  },

  async getSelected() {
    const response = await api.get("/candidates/me/skills");

    return response.data;
  },

  async update(tagIds) {
    const response = await api.put("/candidates/me/skills", {
      tagIds,
    });

    return response.data;
  },
};
