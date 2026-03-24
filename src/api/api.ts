import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    const publicRoutes = ["/auth/login", "/auth/forgot-password", "/auth/reset-password"];
    if (publicRoutes.some((route) => config.url?.includes(route))) {
      return config;
    }

    const isPublicPage = window.location.pathname.startsWith("/home") || 
                        window.location.pathname.startsWith("/about-lsi") ||
                        window.location.pathname === "/";

    if (!token) {
      if (isPublicPage) {
        console.error("No token found for public page API call:", config.url);
        return Promise.reject("No token found");
      } else {
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
        return Promise.reject("No token found");
      }
    }

    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    const url = response.config?.url || "";
    if (url.includes("/auth/change-password")) {
      const newToken = response.data?.token || response.data?.data?.token;
      if (newToken) {
        Cookies.set("token", newToken);
      }
    }
    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Network error or backend unreachable");
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      const url = error.config?.url || "";
      const skipRedirectRoutes = ["/auth/change-password"];
      const shouldSkip = skipRedirectRoutes.some((route) => url.includes(route));

      if (!shouldSkip) {
        Cookies.remove("token");
        Cookies.remove("user");

        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
    }

    return Promise.reject(error);
  }
);


const apiBaseUrl = import.meta.env.VITE_API_URL || "";
if (!apiBaseUrl) {
  console.error("VITE_API_URL is not set — publicApi will fail");
}

export const publicApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
  withCredentials: false, 
});

// Add request interceptor for debugging publicApi
publicApi.interceptors.request.use(
  (config) => {
    console.log("publicApi Request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullUrl: `${config.baseURL}${config.url}`
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for debugging publicApi
publicApi.interceptors.response.use(
  (response) => {
    console.log("publicApi Response:", {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error("publicApi Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

export default api;