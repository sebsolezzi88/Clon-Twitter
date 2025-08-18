import { useState, type FormEvent } from "react";
import type { Post, PostFormData } from "../types/types";
import { toast } from "react-toastify";
import { useAuthStore } from "../storage/authStorage";
import { createPost } from "../api/user";

interface CreatePostProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const CreatePost = ({ posts, setPosts }: CreatePostProps) => {
  //Estado de saving para bloquer el boton
  const [saving, setSaving] = useState<boolean>(false);
  // Obtener datos del usuario
  const { user } = useAuthStore();
  //Estado del formulario a enviar
  const [postFormData, setPostFormData] = useState<PostFormData>({
    text: "",
    image: "",
  });

  const handletSubmitPost = async (e: FormEvent) => {
    e.preventDefault();
    if (postFormData.text.trim() === "") {
      return toast.error("El texto de tu post en obligatorio", {
        theme: "colored",
        autoClose: 4000,
      });
    }
    if (postFormData.text.length === 200) {
      return toast.error("El texto no puede superar los 200 caracteres", {
        theme: "colored",
        autoClose: 4000,
      });
    }
    //Verificar user y token
    if (!user || !user.token || typeof user.token !== "string") {
      toast.error(
        "Error: Token de usuario no disponible. Inténtalo de nuevo.",
        {
          theme: "colored",
          autoClose: 4000,
        }
      );
    }
    try {
      setSaving(true);
      // 3. Pasamos explícitamente el token a la función de la API.
      const response = await createPost(postFormData, user!.token);

      if (response.status === "success") {
        toast.success("Post Creado", {
          theme: "colored",
          autoClose: 4000,
        });
        //Agregando al estado el nuevo post
        setPosts([response.post, ...posts]);
      } else if (response.status === "error") {
        toast.error(response.msg, {
          theme: "colored",
          autoClose: 4000,
        });
      }
    } catch (error) {
      toast.error("Error al crear Post. Inténtalo de nuevo.", {
        theme: "colored",
        autoClose: 4000,
      });
      console.error("Error inesperado al editar la bio:", error);
    } finally {
      setSaving(false);
      setPostFormData({
        text: "",
        image: "",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        ¿Qué estás pensando?
      </h3>
      <form onSubmit={handletSubmitPost} className="space-y-4">
        <textarea
          onChange={(e) =>
            setPostFormData({
              ...postFormData,
              [e.target.name]: e.target.value,
            })
          }
          name="text"
          id="text"
          value={postFormData.text}
          placeholder="Escribe tu nuevo post..."
          rows={3}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md 
                 focus:ring-sky-500 focus:border-sky-500  placeholder-gray-500"
        ></textarea>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Url de imagen (opcional)
          </label>
          <input
            onChange={(e) =>
              setPostFormData({
                ...postFormData,
                [e.target.name]: e.target.value,
              })
            }
            value={postFormData.image}
            type="url"
            id="image"
            name="image"
            placeholder="Url de imagen"
            className="block w-full px-4 py-2 border border-sky-300 rounded-md shadow-sm 
                           focus:ring-sky-500 focus:border-sky-500 sm:text-sm  placeholder-gray-500"
          />
        </div>
        <button
          disabled={saving}
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent 
                 rounded-md shadow-sm text-sm font-black text-white 
                  transition duration-300
                 ${
                   saving
                     ? "bg-gray-400 cursor-not-allowed"
                     : "bg-sky-500 hover:bg-sky-600 "
                 }
                 `}
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
