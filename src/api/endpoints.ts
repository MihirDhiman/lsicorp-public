export const API_ENDPOINTS = {

  publicCms: {
    getAll: '/cms/list-cms-pages',
    getById: (id: number) => `/cms/get-cms-page/${id}`,
  },

};

export const buildEndpoint = (endpoint: string | Function, ...params: any[]): string => {
  if (typeof endpoint === 'function') {
    return endpoint(...params);
  }
  return endpoint;
};


