import { publicApi } from './api';
import { API_ENDPOINTS } from './endpoints';

export const publicCmsService = {
  getAll: () => {
    return publicApi.get(API_ENDPOINTS.publicCms.getAll);
  },
  getById: (id: number) => {
    return publicApi.get(API_ENDPOINTS.publicCms.getById(id));
  },
};

// Export all services
export default {
    publicCms: publicCmsService,
};
  