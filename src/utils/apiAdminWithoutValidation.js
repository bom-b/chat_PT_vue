const axios = require("axios");

const API_URL = process.env.VUE_APP_ADMIN_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("jwtToken");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

module.exports = axiosInstance;
