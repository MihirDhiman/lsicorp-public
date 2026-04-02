import axios from "axios";
import Cookies from "js-cookie";

/* =========================
   BASE API INSTANCE
========================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://192.168.0.134:3009",
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

  updateProfile: (data: any) =>
    api.put("/user/profile", data),

  // 🔥 NEW APIs
  forgotPassword: (email: string) =>
    api.post("/auth/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
  api.post("/auth/reset-password", {
    token,
   newPassword, // 🔥 FIX HERE
  }),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.post("/auth/change-password", { currentPassword, newPassword }),
};

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    // ✅ Public routes (NO TOKEN)
    const publicRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
      "/auth/reset-password",
    ];

    const isPublic = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

  if (!isPublic && token) {
  config.headers?.set("Authorization", `Bearer ${token}`);
}

    return config;
  },
  (error) => Promise.reject(error)
);
export const orderService = {
  createOrder: (data: any) =>
    api.post("/user/orders", data),

  getOrders: (page = 1, limit = 10) =>
    api.get(`/order/my-orders?page=1&limit=10`),

  getOrderById: (id: number) =>
    api.get(`/order/my-orders/${id}`),
};
/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => {
    const url = response.config?.url || "";

    // ✅ Update token after password change
    if (url.includes("/auth/change-password")) {
      const newToken =
        response.data?.token || response.data?.data?.token;

      if (newToken) {
        Cookies.set("token", newToken);
      }
    }

    return response;
  },
  (error) => {
    if (!error.response) {
      console.error("Network error");
      return Promise.reject(error);
    }

    // 🔐 Handle Unauthorized
    if (error.response.status === 401) {
      const url = error.config?.url || "";

      const skipRoutes = ["/auth/login", "/auth/register"];
      const shouldSkip = skipRoutes.some((r) => url.includes(r));

      if (!shouldSkip) {
        Cookies.remove("token");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

/* =========================
   PUBLIC API (NO AUTH)
========================= */
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://192.168.0.134:3009",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/* =========================
   DEBUG (OPTIONAL)
========================= */
publicApi.interceptors.request.use((config) => {
  console.log("publicApi Request:", config.url);
  return config;
});

publicApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("publicApi Error:", err.response?.data);
    return Promise.reject(err);
  }
);

export default api;