import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api",
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("logintoken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;