import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// 🔐 Request Interceptor → only attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Response Interceptor → handle invalid token
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
if (error.response?.status === 401) {
  sessionStorage.clear();
  window.location.replace("/login");
}

    return Promise.reject(error);
  }
);

export default axiosInstance;
