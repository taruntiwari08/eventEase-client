import axios from "axios";
import { baseURL } from "./baseURL.js";

const API = axios.create({
    baseURL: baseURL
})

// Add token to request headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${baseURL}/api/v1/users/refresh//refresh-token`, { refreshToken });

        localStorage.setItem("accessToken", res.data.accessToken);
        API.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;

        return API(originalRequest); // retry request with new token
      } catch (err) {
        console.error("Refresh token expired. Redirecting to login...");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default API;

