// axios 요청을 할 때 헤더에 토큰을 실어서 보내도록 함
// 토큰의 유효성 검사를 진행하지 않음
const axios = require("axios");

const API_URL = "http://www.chatpt.shop:8888/springpt";
// const API_URL = "http://localhost/springpt";

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
