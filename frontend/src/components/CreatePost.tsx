const CreatePost = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        ¿Qué estás pensando?
      </h3>
      <form className="space-y-4">
        <textarea
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
