import { useEffect, useState } from "react";
import type { MainPost } from "../types/types";
import { toast } from "react-toastify";
import { getLast10Post } from "../api/post";

const Main = () => {
  //Estado de carga
  const [loading, setLoading] = useState<boolean>(false);
  //Estado de posts
  const [posts, setPosts] = useState<MainPost[] | null>(null);

  useEffect(() => {
    const get10Post = async () => {
      try {
        setLoading(true);
        const response = await getLast10Post();
        if(response.status==='success'){
          setPosts(response.posts)
          console.log(posts)
        }
      } catch (error) {
        toast.error("Error: No se pudieron obtener los post", {
          theme: "colored",
          autoClose: 4000,
        });
      }finally{
        setLoading(false);
      }
    };
    get10Post();
  }, []);

  if(loading) return <p>Cargando...</p>

  return (
    <div className="px-3">
      <main className="flex flex-col items-center justify-center p-8 text-white rounded-xl shadow-lg bg-gradient-to-br from-sky-500 to-cyan-500 mx-auto mt-6 max-w-4xl">
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
          Únete a la conversación
        </h2>
        <p className="text-md md:text-lg text-center max-w-md">
          Aquí, cada voz importa. Conecta con otros usuarios, comparte tus ideas
          y descubre lo que el mundo está hablando en este momento.
        </p>
      </main>
    </div>
  );
};

export default Main;
