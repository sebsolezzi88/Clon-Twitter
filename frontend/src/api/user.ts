import axios from "axios";
import type { ApiResponse, LoginApiPostResponse, LoginFormData, RegisterFormData } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

//Funcion para registrar usuarios
export const registerUser = async (data:RegisterFormData) =>{
    try {
        const res = await axios.post<ApiResponse>(`${API_URL}/user/create`,data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error al registrar usuario:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error deconocido al registrar");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}

//Funcion para loguearse 
export const login = async (data:LoginFormData) =>{
    try {
        const res = await axios.post<LoginApiPostResponse>(`${API_URL}/user/login`,data);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error al loguear usuarip:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Error deconocido al loguearse");
        } else {
            console.error("Error inesperado:", error);
            throw new Error("Ocurrió un error inesperado.");
        }
    }
}