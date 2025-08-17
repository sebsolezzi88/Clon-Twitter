import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuthStore } from "../storage/authStorage";
import { toast } from "react-toastify";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Obtener el estado y las funciones del store
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  // Función para manejar el logout
  const handleLogout = () => {
    logout(); // Llama a la función de logout del store
    toast.info("Haz cerrado seción", {
                theme: "colored",
                autoClose: 4000,
            });
    navigate("/login"); // Redirige a la página de login después de cerrar la sesión
  };

  return (
    <header className="bg-sky-500 p-4 mb-6 text-white shadow-md">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold">Clon Tuiter</h1>
        </Link>

        {/* Menú en escritorio */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className="hover:text-sky-200 font-bold transition-colors"
          >
            Inicio
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/perfil"
                className="hover:text-sky-200 font-bold transition-colors"
              >
                Perfil
              </Link>
              {/* Cambiado a botón para ejecutar la función */}
              <button
                onClick={handleLogout}
                className="hover:text-sky-200 font-bold transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/registro"
                className="hover:text-sky-200 font-bold transition-colors"
              >
                Registro
              </Link>
              <Link
                to="/login"
                className="hover:text-sky-200 font-bold transition-colors"
              >
                Login
              </Link>
            </>
          )}
        </nav>

        {/* Botón hamburguesa en móviles */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="p-2 rounded hover:bg-sky-600">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 text-white" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      {isOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
              >
                Inicio
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/perfil"
                    onClick={toggleMenu}
                    className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Perfil
                  </Link>
                </li>
                <li>
                  {/* Botón para móviles */}
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="block w-full text-left bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/registro"
                    onClick={toggleMenu}
                    className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Registro
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;