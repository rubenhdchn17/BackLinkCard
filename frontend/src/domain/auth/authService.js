import { loginUser } from "../../api/authApi";

export const authenticateUser = async (email, password) => {
    try {
        const userData = await loginUser(email, password);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
    } catch (error) {
        throw error;
    }
};
