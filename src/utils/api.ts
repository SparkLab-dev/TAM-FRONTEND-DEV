import axios from "axios";
import { backendURL } from "./backend";

export const privApi = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
