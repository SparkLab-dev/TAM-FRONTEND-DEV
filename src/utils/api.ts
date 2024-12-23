import axios from "axios";
import { backendURL } from "./backend";


export const privApi = axios.create({
    baseURL: backendURL
  });
  

  privApi.defaults.headers.common['Authorization'] = `Bearer add auth token here`;
  privApi.defaults.headers.common['ngrok-skip-browser-warning'] = '69420';