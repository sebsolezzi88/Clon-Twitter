import { Link } from "react-router-dom";

export const Login = () => {
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
        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre de Usuario
            </label>
            <input
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
            type="submit"
            className="w-full font-black flex justify-center py-2 px-4 border border-transparent 
                           rounded-md shadow-sm text-sm text-white 
                           bg-sky-500 hover:bg-sky-600 
                           transition duration-300"
          >
            Registrarse
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
