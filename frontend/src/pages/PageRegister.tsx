import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../types/types";
import { toast } from "react-toastify";
import { registerUser } from "../api/user";

export const PageRegister = () => {
  //Navegdor
  const navigate = useNavigate();

  //Estado de carga
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Estado del formulario
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    passwordr: "",
  });

  //Submit Form
  const handletSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //Verificar campos vacios
    if (Object.values(formData).includes("")) {
      return toast.error("Debe Completar todos los campos", {
        theme: "colored",
        autoClose: 2000,
      });
    }
    //Comprobar si coinciden los passwords
    if (formData.password !== formData.passwordr) {
      return toast.error("Los password no coinciden", {
        theme: "colored",
        autoClose: 2000,
      });
    }
    //Registrar usuario
    try {
      setIsLoading(true);
      const response = await registerUser(formData);
      if (response.status === "success") {
        toast.success("User creado. Te enviamos un mail de confirmación", {
          theme: "colored",
          autoClose: 2000,
        });
        //Limpianos los campos
        setFormData({
          username: "",
          email: "",
          password: "",
          passwordr: "",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al registrar", {
        theme: "colored",
        autoClose: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
            ¡Únete a <span className="text-sky-500">Clon Tuiter</span>!
          </h2>
          <p className="text-gray-600">
            Regístrate para opinar y comentar libremente.
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
              placeholder="Elige un nombre de usuario"
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
              Email
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.email}
              type="email"
              id="email"
              name="email"
              placeholder="email@ejemplo.com"
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
              name="password"
              placeholder="Ingresa un password"
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
              Repetir Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              value={formData.passwordr}
              type="password"
              id="passwordr"
              name="passwordr"
              placeholder="Repite tu password"
              className="block w-full px-4 py-2 border border-sky-300 rounded-md shadow-sm 
                           focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading} // desabilitar boton
            className={`w-full font-black flex justify-center py-2 px-4 border border-transparent 
              rounded-md shadow-sm text-sm text-white transition duration-300
              ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed" // Estilos cuando carga
                  : "bg-sky-500 hover:bg-sky-600" // Estilos normales
              }`}
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?&nbsp;
          <Link to={"/login"}>
            <span className="font-medium text-sky-600 hover:text-sky-500">
              Inicia Sesión aquí
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
