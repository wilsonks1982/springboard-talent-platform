import { api } from "./http";

const BASE_URL = "/candidates/me/professional-snapshot";

export const professionalSnapshotApi = {
  async get() {
    const response = await api.get(BASE_URL);

    return response.data;
  },
};
