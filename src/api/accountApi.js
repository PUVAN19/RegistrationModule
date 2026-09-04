import axios from "axios";

const API_BASE_URL = "https://localhost:7001/api";

export const createStudentAccount = async ({
    studentId,
    email,
    password,
    confirmPassword
}) => {

    const response = await axios.post(
        `${API_BASE_URL}/StudentAccount/create`,
        {
            studentId,
            email,
            password,
            confirmPassword
        }
    );

    return response.data;
};