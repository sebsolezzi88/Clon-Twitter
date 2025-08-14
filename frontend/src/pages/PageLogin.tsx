import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { LoginFormData } from "../types/types";
import { toast } from "react-toastify";

import { useAuthStore } from "../storage/authStorage";
import { loginUser } from "../api/user";

export const PageLogin = () => {

  const navigate = useNavigate();//Para redireccionar
  const { login } = useAuthStore(); //Funcion del storage

  //Estado del form
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  //Estado del Loading
  const [loading, setLoading] = useState<boolean>(false);

  //Submit form
  const handletSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).includes("")) {
      return toast.error("Username y password obligatorios", {
        theme: "colored",
        autoClose: 4000,
      });
    }

    try {
      setLoading(true);
      const response = await loginUser(formData);

      // Verifica si la respuesta contiene un mensaje de error del backend
      if (response && response.status === "error") {
        toast.error(response.msg, {
          theme: "colored",
          autoClose: 4000,
        });
      } else if (response && response.status === "success") {
        toast.success("Login correcto", {
          theme: "colored",
          autoClose: 4000,
        });
        
        login(response.userData!);//Guardando en el storage
        navigate('/'); //Redireccionar
        
      } else {
        // Maneja casos donde la respuesta no es la esperada
        toast.error("Error inesperado en la respuesta del servidor", {
          theme: "colored",
          autoClose: 4000,
        });
      }
    } catch (error) {
      // Este catch solo se ejecutará para errores inesperados, como fallos de red.
      toast.error("Login Error", {
        theme: "colored",
        autoClose: 4000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            Bienvenido de nuevo
          </h2>
          <p className="text-gray-600">
            Logueate para opinar y comentar libremente.
          </p>
        </div>
        <form onSubmit={handletSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre de Usuario
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.username}
              type="text"
              id="username"
              name="username"
              placeholder="Tu nombre de usuario"
              className="block w-full px-4 py-2 border border-sky-300 rounded-md shadow-sm 
                           focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.password}
              type="password"
              id="password"
              placeholder="Tu password"
              name="password"
              className="block w-full px-4 py-2 border border-sky-300 rounded-md shadow-sm 
                           focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full font-black flex justify-center py-2 px-4 border border-transparent 
                           rounded-md shadow-sm text-sm text-white 
                           bg-sky-500 hover:bg-sky-600 
                           transition duration-300"
          >
            {loading ? "Cargando" : "Login"}
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          ¿No tiene cuenta?&nbsp;
          <Link to={"/registro"}>
            <span className="font-medium text-sky-600 hover:text-sky-500">
              Registrate primero
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
