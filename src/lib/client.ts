import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import JSCookie from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        // const response = await axios.post(
        //   `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
        //   {},
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //     },
        //   },
        // );
        // const { accessToken } = response.data;
        // // Store new token
        // if (typeof window !== "undefined") {
        //   localStorage.setItem("accessToken", accessToken);
        // }
        // // Retry original request with new token
        // if (originalRequest.headers) {
        //   originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        // }
        // return apiClient(originalRequest);
      } catch (refreshError) {
        // Token refresh failed, clear storage and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
