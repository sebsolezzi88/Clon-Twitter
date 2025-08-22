import axios from "axios";
import type { ApiGetPostsMainResponse } from "../types/types";

const API_URL = import.meta.env.VITE_API_URL;

//Funcion para obtener los ultimos 10 posts
export const getLast10Post = async (): Promise<ApiGetPostsMainResponse> => {
  try {
    const res = await axios.get<ApiGetPostsMainResponse>(`${API_URL}/post/last10`);
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
