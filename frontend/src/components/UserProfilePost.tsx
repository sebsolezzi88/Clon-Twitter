import {
  ChatBubbleLeftIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import type { Post } from "../types/types";

interface UserProfilePostProps {
  userName: string;
  post: Post;
}

//Confirm Delete
const handleConfirmDelete = () => {
  Swal.fire({
    title: "¿Deseas eliminar el post?",
    text: "Esta acción no puede revertirse",
    icon: "warning",
    iconColor: "#d08700",
    showCancelButton: true,
    cancelButtonText:"Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar ahora",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
};

const UserProfilePost = ({ post, userName }: UserProfilePostProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div>
            <span className="font-bold text-gray-800">{userName}</span>
            <span className="text-sm text-gray-500 ml-2">hace 5 minutos</span>
          </div>
        </div>
        {/* Aquí está el icono de la papelera */}
        <button
          onClick={handleConfirmDelete}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
      <p className="text-gray-700">{post.text}</p>
      {post.image && <img src={post.image} />}
      <div className="flex items-center space-x-6 mt-4 text-gray-500">
        <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
          <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500 hover:text-sky-500" />
          <span>{post.comments?.length}</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-sky-500 transition-colors">
          <HeartIcon className="h-6 w-6 text-gray-500 hover:text-sky-500" />
          <span>{post.likes?.length}</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfilePost;
