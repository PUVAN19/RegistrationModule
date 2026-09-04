import axios from "axios";

const API_BASE_URL = "https://localhost:7001/api";

export async function completePayment(paymentData) {

    try {

        const response = await axios.post(
            `${API_BASE_URL}/Payment/complete`,
            paymentData
        );

        return response.data;

    } catch (error) {

        throw new Error(
            error.response?.data?.message ||
            "Payment failed."
        );
    }
}