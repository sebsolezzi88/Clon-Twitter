import {
  HeartIcon, //Icono me gusta
  ChatBubbleLeftIcon, //Icono Chat
  DocumentTextIcon, // Icono para Posts
  UsersIcon, // Icono para Seguidores
  UserPlusIcon, // Icono para Siguiendo
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../storage/authStorage";

const PageProfile = () => {

  //Obtener datos del usuarioç
  const {user} = useAuthStore();
  return (
    <div className="flex items-start justify-center p-4 min-h-screen bg-gray-200">
      <div className="max-w-xl w-full space-y-6">
        {/* Sección del Perfil del Usuario */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {user?.username}
              </h1>
              <p className="text-gray-500">
                {user?.bio ? 'Aquí va la biografía del usuario. ¡Bienvenido a mi perfil de Clon Tuiter!' 
                  : 'Este usuario aún no cargó su biografía'
                }
              </p>
            </div>
          </div>
          <div className="flex justify-around text-center border-t pt-4 mt-4">
            <div className="flex flex-col items-center">
              <DocumentTextIcon className="h-6 w-6 text-gray-500 mb-1" />{" "}
              {/* Icono de Posts */}
              <p className="font-bold text-gray-800">125</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <UsersIcon className="h-6 w-6 text-gray-500 mb-1" />{" "}
              {/* Icono de Seguidores */}
              <p className="font-bold text-gray-800">5.2K</p>
              <p className="text-sm text-gray-500">Seguidores</p>
            </div>
            <div className="flex flex-col items-center">
              <UserPlusIcon className="h-6 w-6 text-gray-500 mb-1" />{" "}
              {/* Icono de Siguiendo */}
              <p className="font-bold text-gray-800">800</p>
              <p className="text-sm text-gray-500">Siguiendo</p>
            </div>
          </div>
        </div>

        {/* Sección para crear un nuevo Post */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            ¿Qué estás pensando, @NombreDeUsuario?
          </h3>
          <form className="space-y-4">
            <textarea
              placeholder="Escribe tu nuevo post..."
              rows={3}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md 
                 focus:ring-sky-500 focus:border-sky-500"
            ></textarea>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
                 rounded-md shadow-sm text-sm font-black text-white bg-sky-500 
                 hover:bg-sky-600 transition duration-300"
            >
              Publicar
            </button>
          </form>
        </div>

        {/* Feed de Posts del Usuario */}
        <div className="space-y-6">
          {/* Ejemplo de un Post */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <span className="font-bold text-gray-800">
                  @NombreDeUsuario
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  hace 5 minutos
                </span>
              </div>
            </div>
            <p className="text-gray-700">
              ¡Hola a todos! Este es mi primer post en mi Clon de Tuiter.
            </p>
            <div className="flex items-center space-x-6 mt-4 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
                <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500 hover:text-sky-500" />
                <span>5</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
                <HeartIcon className="h-6 w-6 text-gray-500 hover:text-sky-500" />
                <span>12</span>
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default PageProfile;