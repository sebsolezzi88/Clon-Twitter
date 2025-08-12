import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import User from "../models/User";
import dotenv from 'dotenv';


// Cargar variables de entorno desde .env
dotenv.config();

export const createAccount = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Comprobar errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //Si hay errores los enviamos
        }

        const { username, password, email } = req.body;

        //hasheamos el password
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        //Si no hay errores registramos al usuario
        const newUser = await User.create({
            username,
            email,
            password: passwordHash
        });

        //Generar Token Para activar su cuenta
        const activationToken = jwt.sign({ id: newUser._id },
            process.env.SECRET_KEY!,
            { expiresIn: '1d' }
        );

        newUser.activationToken = activationToken;

        await newUser.save(); //Guardar el token de activación

        return res.status(200).json({ status: 'success', msg: 'User created' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Funcion para logear usuario y generar token
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        //Comprobar errores
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //Si hay errores los enviamos
        }

        const { username, password } = req.body;

        //hasheamos el password
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        //Buscamos si existe el usuario
        const userExist = await User.findOne({ username });

        if (!userExist) {
            return res.status(404).json({ status: 'error', msg: 'User not found' })
        }

        //Verificar si la cuenta esta activada
        if(!userExist.isActive){
            return res.status(404).json({ status: 'error', msg: 'Your acount is not active' })
        }
        const passwordCorrent = await bcrypt.compare(password,userExist.password);
        
        //Comparar contraseña
        if(!passwordCorrent){
            return res.status(401).json({ status: 'error', msg: 'Invalid credentials'});
        }

        const payload = {
            id: userExist._id,
            username: userExist.username
        }

        //Generar Token Para activar su cuenta
        const token = jwt.sign(payload,
            process.env.SECRET_KEY!,
            { expiresIn: '3d' }
        );

        return res.status(200).json({ status: 'success', msg: 'User Loged', token })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}