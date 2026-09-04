import axiosClient from "./axiosClient";

export async function createRegistration(registrationData) {

    const response = await axiosClient.post(
        "/Registration",
        registrationData
    );

    return response.data;
}