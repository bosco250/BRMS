const backendUrl = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

const api = axios.create({
  baseURL: backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
