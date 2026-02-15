import axios from "axios";

const api = axios.create({
  baseURL: "https://well-analytics.onrender.com",
});

export default api;
