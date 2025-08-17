import { useState, type FormEvent } from "react";
import type { PostFormData } from "../types/types";
import { toast } from "react-toastify";

const CreatePost = () => {
  //Estado del formulario a enviar
  const [postFormData, setPostFormData] = useState<PostFormData>({
    text: "",
    image: "",
  });

  const handletSubmitPost = async (e: FormEvent) => {
    e.preventDefault();
    if(postFormData.text.trim() ===''){
        return toast.error('El texto de tu post en obligatorio', {
        theme: "colored",
        autoClose: 4000,
      })
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
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent 
                 rounded-md shadow-sm text-sm font-black text-white bg-sky-500 
                 hover:bg-sky-600 transition duration-300"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
