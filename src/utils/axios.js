import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AXIOS_API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

