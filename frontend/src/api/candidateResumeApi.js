import { api } from "./http";

const BASE_URL = "/candidates/me/resume";

export const candidateResumeApi = {
  async upload(file) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(BASE_URL, formData);

    return response.data;
  },

  async download() {
    const response = await api.get(BASE_URL, {
      responseType: "blob",
    });

    return response.data;
  },

  async delete() {
    await api.delete(BASE_URL);
  },
};
