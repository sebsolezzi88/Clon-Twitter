import { Request, Response } from "express"

import { validationResult } from "express-validator";
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        console.log(req.userId);
        return res.status(200).json({ status: 'success', msg: 'post send' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}