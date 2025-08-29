import axios from "axios";

const baseUrl = "http://localhost:3000/api";

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
