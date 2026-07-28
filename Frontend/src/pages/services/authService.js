import api from "../../api/axios";

export const login = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};