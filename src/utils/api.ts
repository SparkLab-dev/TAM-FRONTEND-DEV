import axios from "axios";
import { backendURL } from "./backend";

const localStorageToken = localStorage.getItem("token");

export const privApi = axios.create({
  baseURL: backendURL,
  headers: {
    common: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageToken}`,
    },
  },
});
