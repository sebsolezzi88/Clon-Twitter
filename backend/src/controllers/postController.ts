import { Request, Response } from "express"

import { validationResult } from "express-validator";
import dotenv from 'dotenv';
import Post from "../models/Post";

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
        const {postId} = req.params;

        if (!text || text === '') {
            return res.status(400).json({ status: 'error', msg: 'Text is requerid' })
        }

        //Verificar si el post existe
        const postExist = await Post.findById(postId);
        
        if(!postExist){
            return res.status(404).json({ status: 'error', msg: 'Post not Found' })
        }

        //Verificar si el post pertence al usuario logueado
        if(req.userId && postExist.author.toString() !== req.userId.toString()){
            return res.status(403).json({ status: 'error', msg: 'Forbidden' })
        }
        //Actulizar post
        postExist.text === req.body.text;
        postExist.text === req.body.image;

        await postExist.save();

        return res.status(201).json({ status: 'success', msg: 'Post updated', post: postExist })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}