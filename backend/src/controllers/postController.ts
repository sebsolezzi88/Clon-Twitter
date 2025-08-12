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