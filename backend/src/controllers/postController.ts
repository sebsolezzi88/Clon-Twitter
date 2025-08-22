import { Request, Response } from "express"

import { validationResult } from "express-validator";
import dotenv from 'dotenv';
import Post from "../models/Post";
import mongoose, { isValidObjectId } from "mongoose";


// Cargar variables de entorno desde .env
dotenv.config();

//Funcion para crear post
export const createPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { text, image } = req.body || {};
        if (!text || text === '') {
            return res.status(400).json({ status: 'error', msg: 'Text is requerid' })
        }

        const newPost = await Post.create({
            author: req.userId,
            text,
            image
        })
        return res.status(201).json({ status: 'success', msg: 'post created', post: newPost })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Actualizar Post
export const updatePost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { text, image } = req.body || {};
        const { postId } = req.params;

        if (!text || text === '') {
            return res.status(400).json({ status: 'error', msg: 'Text is requerid' })
        }

        //Verificar si el post existe
        const postExist = await Post.findById(postId);

        if (!postExist) {
            return res.status(404).json({ status: 'error', msg: 'Post not Found' })
        }

        //Verificar si el post pertence al usuario logueado
        if (req.userId && postExist.author.toString() !== req.userId.toString()) {
            return res.status(403).json({ status: 'error', msg: 'Forbidden' })
        }
        //Actulizar post
        postExist.text = text;
        postExist.image = image;

        await postExist.save();

        return res.status(201).json({ status: 'success', msg: 'Post updated', post: postExist })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Funcion para borrar post
export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { postId } = req.params;

        if (!postId || !isValidObjectId(postId)) {
            return res.status(400).json({ status: 'error', msg: 'Id requeried' });
        }

        //Verificar si el post existe
        const postExist = await Post.findById(postId);

        if (!postExist) {
            return res.status(404).json({ status: 'error', msg: 'Post not Found' })
        }

        //Verificar si el post pertence al usuario logueado
        if (req.userId && postExist.author.toString() !== req.userId.toString()) {
            return res.status(403).json({ status: 'error', msg: 'Forbidden' })
        }

        //Borrar el Post
        await postExist.deleteOne();

        return res.status(201).json({ status: 'success', msg: 'Post deleted' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Obtener los post de un solo usuario por su id
export const getPostByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { userId } = req.params;

        if (!userId || !isValidObjectId(userId)) {
            return res.status(400).json({ status: 'error', msg: 'Id requeried' });
        }

        //Buscar los post del usuario
        const postsExist = await Post.find({ author: userId });


        return res.status(201).json({ status: 'success', msg: 'Post deleted', posts: postsExist })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}
//Obtner los post del user pero por el id que viene en su token
export const getPostByUserTokenId = async (req: Request, res: Response): Promise<Response> => {
    try {

        
        if (!req.userId || !isValidObjectId(req.userId)) {
            return res.status(400).json({ status: 'error', msg: 'Id requeried' });
        }

        //Buscar los post del usuario
        const postsExist = await Post.find({ author: req.userId }).sort({ createdAt: -1 });


        return res.status(201).json({ status: 'success', msg: 'Post deleted', posts: postsExist })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Funcion para comentar Post
export const commentPost = async (req: Request, res: Response): Promise<Response> => {
    try {

        const { text } = req.body || {};

        const { postId } = req.params;

        if (!text || text === '') {
            return res.status(400).json({ status: 'error', msg: 'Text is requerid' })
        }

        if (!postId || !isValidObjectId(postId)) {
            return res.status(400).json({ status: 'error', msg: 'Id requeried' });
        }

        //Verificar si el post existe
        const postExist = await Post.findById(postId);

        if (!postExist) {
            return res.status(404).json({ status: 'error', msg: 'Post not Found' })
        }

        if (req.userId && isValidObjectId(req.userId)) {
            const comment = {
                user: new mongoose.Types.ObjectId(req.userId.toString()),
                text: text,
                createdAt: new Date()
            }
            postExist.comments!.push(comment);
        }

        await postExist.save();

        return res.status(201).json({ status: 'success', msg: 'Post Commented', post: postExist })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Funcion para agregar o quitar likes de un post
export const likePost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { postId } = req.params;

        if (!postId || !isValidObjectId(postId)) {
            return res.status(400).json({ status: 'error', msg: 'Post ID is required' });
        }

        const currentUserId = req.userId;

        if (!currentUserId) {
            return res.status(401).json({ status: 'error', msg: 'User is not authenticated' });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ status: 'error', msg: 'Post not found' });
        }
        /*
            convertir el valor a unknown primero y luego al tipo deseado. 
            Esto le indica al compilador que eres consciente de que la 
            conversión puede ser riesgosa, pero que la estás haciendo de forma intencionada. 
         */
        const currentUserIdValid = currentUserId as unknown as mongoose.Types.ObjectId;

        // Comprueba si el usuario ya le dio like al post
        const hasLiked = post.likes?.some(id => id.toString() === currentUserIdValid.toString());

        if (hasLiked) {
            // Si el usuario ya le dio like, lo elimina
            post.likes = post.likes?.filter(id => id.toString() !== currentUserIdValid.toString());
            await post.save();
            return res.status(200).json({ status: 'success', msg: 'Like removed successfully' });
        } else {
            // Si el usuario no le dio like, lo añade
            post.likes?.push(currentUserIdValid);
            await post.save();
            return res.status(200).json({ status: 'success', msg: 'Post liked successfully' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};

//Funcion para obtner los ultimo 10 post
export const getLastTenPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const posts  = await Post.find().sort({ createdAt: -1 }).limit(10);

         return res.status(200).json({ status: 'error', msg: 'Post found', posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' });
    }
};