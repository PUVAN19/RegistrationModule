const API_BASE_URL = "https://localhost:7001/api";

export async function createRegistration(registrationData) {
    const response = await fetch(
        `${API_BASE_URL}/Registration`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registrationData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Registration failed"
        );
    }

    return data;
}