import { Request, Response } from "express"

import { validationResult } from "express-validator";
import dotenv from 'dotenv';
import Post from "../models/Post";
import { isValidObjectId } from "mongoose";

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