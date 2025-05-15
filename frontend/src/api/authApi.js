import httpClient from "../infrastructure/httpClient";

export const loginUser = async (email, password) => {
    try {
        const response = await httpClient.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error en la autenticación");
    }
};
