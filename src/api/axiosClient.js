import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://localhost:7001/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000
});

export default axiosClient;