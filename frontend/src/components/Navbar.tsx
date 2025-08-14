import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-sky-500 p-4 mb-6 text-white shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo / título */}
        <Link to="/">
          <h1 className="text-2xl font-bold">Clon Tuiter</h1>
        </Link>

        {/* Menú en escritorio */}
        {/* El menú de escritorio está oculto por defecto (hidden) y se muestra como flex en pantallas 'md' o más grandes */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className="hover:text-sky-200 font-bold transition-colors"
          >
            Inicio
          </Link>
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
        </nav>

        {/* Botón hamburguesa en móviles */}
        {/* El botón de la hamburguesa se muestra por defecto (flex) y se oculta en pantallas 'md' o más grandes */}
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
      {/* Se muestra si isOpen es true y se oculta en pantallas 'md' o más grandes */}
      {isOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/registro"
                onClick={toggleMenu}
                className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
              >
                Registro
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={toggleMenu}
                className="block bg-sky-600 p-2 rounded-md hover:bg-sky-700 transition-colors"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
