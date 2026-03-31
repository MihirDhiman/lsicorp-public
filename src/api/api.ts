import axios from "axios";
import Cookies from "js-cookie";

/* =========================
   BASE API INSTANCE
========================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/* =========================
   AUTH SERVICE
========================= */
export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  register: (data: any) =>
    api.post("/auth/register", data),
  getProfile: () =>
    api.get("/user/profile"),
};

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    // ✅ Public routes (NO TOKEN NEEDED)
    if (
      config.url?.includes("auth/login") ||
      config.url?.includes("auth/register") ||
      config.url?.includes("auth/forgot-password") ||
      config.url?.includes("auth/reset-password")
    ) {
      return config;
    }

    // ✅ Attach token if exists
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => {
    const url = response.config?.url || "";

    // ✅ Update token after password change (if API returns new token)
    if (url.includes("/auth/change-password")) {
      const newToken = response.data?.token || response.data?.data?.token;
      if (newToken) {
        Cookies.set("token", newToken);
      }
    }

    return response;
  },
  (error) => {
    // ❌ Network error
    if (!error.response) {
      console.error("Network error or backend unreachable");
      return Promise.reject(error);
    }

    // ❌ Unauthorized (token expired / invalid)
    if (error.response?.status === 401) {
      const url = error.config?.url || "";

      const skipRedirectRoutes = ["auth/login", "auth/register"];
      const shouldSkip = skipRedirectRoutes.some((route) =>
        url.includes(route)
      );

      if (!shouldSkip) {
        Cookies.remove("token");
        Cookies.remove("user");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

/* =========================
   PUBLIC API (NO INTERCEPTOR)
========================= */
const apiBaseUrl = import.meta.env.VITE_API_URL || "";

if (!apiBaseUrl) {
  console.error("VITE_API_URL is not set — publicApi may fail");
}

export const publicApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: false,
});

/* =========================
   DEBUG (OPTIONAL)
========================= */
publicApi.interceptors.request.use((config) => {
  console.log("publicApi Request:", {
    method: config.method,
    url: config.url,
    fullUrl: `${config.baseURL}${config.url}`,
  });
  return config;
});

publicApi.interceptors.response.use(
  (response) => {
    console.log("publicApi Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("publicApi Error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default api;