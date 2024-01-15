const axios = require("axios");

const API_URL = "http://localhost/admin";
const swal = require("sweetalert2");

const AdminaxiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

AdminaxiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("jwtToken");

        config.headers.Authorization = `Bearer ${token}`;

        // 토큰 유효성 검사
        try {
            await axios.get(API_URL + '/checkAdmin', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
        } catch (error) {
            swal.fire({
                text: '로그인 정보가 만료되었습니다. 다시 로그인 해주세요.',
                icon: 'warning',
                confirmButtonColor: '#41b882',
                confirmButtonText: '확인'
            })
                .then(() => {
                    window.location.href = '/service/login';
                });
            window.localStorage.removeItem('jwtToken');
            window.localStorage.removeItem('role');
            window.localStorage.removeItem('name');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

module.exports = AdminaxiosInstance;