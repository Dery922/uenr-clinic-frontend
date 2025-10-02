import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // comes from .env
  withCredentials: true, // if you’re using cookies/JWT
});

export default api;
