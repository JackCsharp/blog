import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7299",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Server error: 401. Clearing token...");
      localStorage.removeItem("jwtToken");
    }
    return Promise.reject(error);
  }
);
export default apiClient;
