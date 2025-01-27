import axios from "axios";
import { backendURL } from "./backend";

export const privApi = axios.create({
  baseURL: backendURL,
});

privApi.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

privApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("Interceptor axios errors", error);

    if (error.response.status === 401) {
      // handle unauthorized error
    }
    if (error.response.status === 403) {
      // handle forbidden error
    }
    if (error.response.status === 404) {
      // handle not found error
    }
  },
);
