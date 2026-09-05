import { api } from "./http";

const BASE = "/candidates/me/employment-verification/documents";

export const candidateEmploymentVerificationDocumentApi = {
  async upload(documentType, file) {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(`${BASE}/${documentType}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async download(documentType) {
    const response = await api.get(`${BASE}/${documentType}`, {
      responseType: "blob",
    });

    return response.data;
  },

  async delete(documentType) {
    await api.delete(`${BASE}/${documentType}`);
  },
};
