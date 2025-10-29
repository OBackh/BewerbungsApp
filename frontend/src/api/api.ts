import axios from "axios";

const baseURL =
    import.meta.env.VITE_API_URL ??
    (window.location.hostname === "localhost"
        ? "http://localhost:8080/api"
        : "https://bemo-backend.onrender.com/api");

const api = axios.create({ baseURL });

export default api;