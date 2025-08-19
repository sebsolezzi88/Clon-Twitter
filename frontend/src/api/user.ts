import axios from "axios";
import type {
  ApiCreatePostResponse,
  ApiGetPostsResponse,
  ApiGetUserDataResponse,
  ApiResponse,
  BioFormData,
  LoginApiPostResponse,
  LoginFormData,
  PostFormData,
  RegisterFormData,
} from "../types/types";
import { useAuthStore } from "../storage/authStorage";

const API_URL = import.meta.env.VITE_API_URL;

//Funcion para registrar usuarios
export const registerUser = async (data: RegisterFormData) => {
  try {
    const res = await axios.post<ApiResponse>(`${API_URL}/user/create`, data);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error al registrar usuario:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || "Error deconocido al registrar"
      );
    } else {
      console.error("Error inesperado:", error);
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};

//Funcion para loguearse
export const loginUser = async (
  data: LoginFormData
): Promise<LoginApiPostResponse> => {
  try {
    const res = await axios.post<LoginApiPostResponse>(
      `${API_URL}/user/login`,
      data
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Devuelve el objeto de error completo para que sea manejado por quien llama a la función
      return error.response?.data;
    } else {
      // Lanza un error genérico para errores inesperados
      throw new Error("Ocurrió un error inesperado.");
    }
  }
};

// Funcion para editar la bio
export const editBio = async (data: BioFormData, token: string): Promise<ApiResponse> => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Recibe el token como argumento
        };

        console.log(`Formato del authorization: ${headers.Authorization}`)

        const res = await axios.patch<ApiResponse>(
            `${API_URL}/user/bio`,
            data,
            { headers }
        );
        return res.data;
    } catch (error) {
        // Esta línea relanza el error para que el componente que llama lo capture.
        throw error;
    }
};

// Funcion crearPost
export const createPost = async (data: PostFormData, token: string): Promise<ApiCreatePostResponse> => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
        };

        const res = await axios.post<ApiCreatePostResponse>(
            `${API_URL}/post`,
            data,
            { headers }
        );
        return res.data;
    } catch (error) {
        // Esta línea relanza el error para que el componente que llama lo capture.
        throw error;
    }
};

//Funcion para obtener los post de un usuario por su id
export const getUserPosts = async (token: string): Promise<ApiGetPostsResponse> => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
        };
        const res = await axios.get<ApiGetPostsResponse>(`${API_URL}/post`, { headers });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            throw new Error('Ocurrió un error inesperado al obtener los posts.');
        }
    }
};

//Funcion para obtener los datos de username,bio,followings , followergs
export const getUserDataById = async (userId: string): Promise<ApiGetUserDataResponse> => {
    try {
      
        const res = await axios.get<ApiGetUserDataResponse>(`${API_URL}/user/userdata/${userId}`);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return error.response?.data;
        } else {
            throw new Error('Ocurrió un error inesperado al obtener los datos de usuario.');
        }
    }
};
