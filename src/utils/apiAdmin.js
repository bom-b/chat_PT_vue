const axios = require("axios");

const API_URL = "http://localhost/admin";

const AdminaxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


AdminaxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

module.exports = AdminaxiosInstance;


