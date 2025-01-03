import axios from "axios";
// const BACKEND_API = "https://api.infoera.in";  
const BACKEND_API = "http://localhost:5454";

export const API_BASE_URL = BACKEND_API;

const api = axios.create({
  baseURL: API_BASE_URL,
});

const token = sessionStorage.getItem("jwt");

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
// export default API_BASE_URL;
