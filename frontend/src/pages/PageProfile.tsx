import React, { useState, useEffect } from "react"; // Importa useEffect
import {
  HeartIcon, // Icono me gusta
  ChatBubbleLeftIcon, // Icono Chat
  DocumentTextIcon, // Icono para Posts
  UsersIcon, // Icono para Seguidores
  UserPlusIcon, // Icono para Siguiendo
  PencilSquareIcon, // Icono de edición
} from "@heroicons/react/24/outline";
import { useAuthStore } from "../storage/authStorage";
import type { BioFormData, Post } from "../types/types";
import { editBio, getUserPosts } from "../api/user";
import { toast } from "react-toastify";
import CreatePost from "../components/CreatePost";
import UserProfilePost from "../components/UserProfilePost";

const PageProfile = () => {
  // Obtener datos del usuario
  const { user, login } = useAuthStore();

  // Estados para controlar la edición de la biografía
  const [isEditingBio, setIsEditingBio] = useState(false);
  //Estados para los post
  const [posts, setPosts] = useState<Post[]>([]);
  // Inicializa editedBio con el valor actual de user?.bio
  const [editedBio, setEditedBio] = useState<BioFormData>({
    bio: user?.bio || "",
  });

  // useEffect para actualizar editedBio si user.bio cambia (por ejemplo, al cargar la página)
  useEffect(() => {
    setEditedBio({ bio: user?.bio || "" });
  }, [user?.bio]); // Dependencia en user?.bio

  //useEffect para obtener los post de la base de datos
  useEffect(() => {
    const getPost = async () => {
      if (!user || !user.token || typeof user.token !== "string") {
        toast.error(
          "Error: Token de usuario no disponible. Inténtalo de nuevo.",
          {
            theme: "colored",
            autoClose: 4000,
          }
        );
        return; // Detenemos la función si no hay un token válido.
      }
      try {
        const response = await getUserPosts(user.token);
        if (response.status === "success") {
          console.log(response.posts);
          setPosts(response.posts);
        } else {
          console.error("Error al obtener los posts:", response.msg);
        }
      } catch (error) {
        console.error("Error inesperado al obtener los posts:", error);
      }
    };
    getPost();
  }, []);

  // En tu componente PageProfile.jsx
  const handleSaveBio = async () => {
    // 1. Añadimos un console.log para verificar el usuario antes de la llamada.
    // Esto ya lo hiciste y nos dio la clave del problema.
    console.log("Usuario actual en el store:", user);

    // 2. Verificamos que el token sea una cadena de texto válida y no undefined.
    if (!user || !user.token || typeof user.token !== "string") {
      toast.error(
        "Error: Token de usuario no disponible. Inténtalo de nuevo.",
        {
          theme: "colored",
          autoClose: 4000,
        }
      );
      setIsEditingBio(false);
      return; // Detenemos la función si no hay un token válido.
    }

    try {
      // 3. Pasamos explícitamente el token a la función de la API.
      const response = await editBio(editedBio, user.token);

      if (response.status === "success") {
        login({ ...user, bio: editedBio.bio });
        toast.success("Biografía editada correctamente", {
          theme: "colored",
          autoClose: 4000,
        });
      } else if (response.status === "error") {
        toast.error(response.msg, {
          theme: "colored",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error("Error al guardar la biografía. Inténtalo de nuevo.", {
        theme: "colored",
        autoClose: 4000,
      });
      console.error("Error inesperado al editar la bio:", error);
    } finally {
      setIsEditingBio(false);
    }
  };

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

              {/* Lógica de edición de la biografía */}
              {isEditingBio ? (
                <div className="mt-2">
                  <textarea
                    value={editedBio.bio}
                    onChange={(e) =>
                      setEditedBio({ ...editedBio, bio: e.target.value })
                    } // Cambiado a bio: e.target.value
                    rows={3}
                    name="bio" // Asegúrate de que el name sea 'bio'
                    placeholder="Escribe tu nueva biografía..."
                    className="block w-full px-4 py-2 border border-sky-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  ></textarea>
                  <div className="mt-2 flex space-x-2 justify-end">
                    <button
                      onClick={() => {
                        setIsEditingBio(false);
                        // Restablece editedBio a la bio original del usuario si cancela
                        setEditedBio({ bio: user?.bio || "" });
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveBio}
                      className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-md hover:bg-sky-600 transition"
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-500">
                    {user?.bio || "Este usuario aún no cargó su biografía"}
                  </p>
                  <button
                    onClick={() => setIsEditingBio(true)}
                    className="ml-4 p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-around text-center border-t pt-4 mt-4">
            <div className="flex flex-col items-center">
              <DocumentTextIcon className="h-6 w-6 text-gray-500 mb-1" />
              <p className="font-bold text-gray-800">125</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div className="flex flex-col items-center">
              <UsersIcon className="h-6 w-6 text-gray-500 mb-1" />
              <p className="font-bold text-gray-800">5.2K</p>
              <p className="text-sm text-gray-500">Seguidores</p>
            </div>
            <div className="flex flex-col items-center">
              <UserPlusIcon className="h-6 w-6 text-gray-500 mb-1" />
              <p className="font-bold text-gray-800">800</p>
              <p className="text-sm text-gray-500">Siguiendo</p>
            </div>
          </div>
        </div>

        {/* Sección para crear un nuevo Post */}
        <CreatePost setPosts={setPosts}  />

        {/* Feed de Posts del Usuario */}
        <div className="space-y-6">
          {/* Ejemplo de un Post */}
          {posts.length > 0 ? (
            posts.map((post) => <UserProfilePost key={post._id} post={post} userName={user?.username!} />)
          ) : (
            <p className="text-center text-gray-500">
              Aún no hay posts para mostrar.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageProfile;
