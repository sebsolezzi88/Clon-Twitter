import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import User from "../models/User";
import dotenv from 'dotenv';
import mongoose, { isValidObjectId, ObjectId } from "mongoose";
import { transporter } from "../config/mail";


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
        const passwordHash = await bcrypt.hash(password, 10);

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

        const activationUrl = `http://localhost:3000/api/user/activate?token=${activationToken}`;

        //Mandar mail
        await transporter.sendMail({
            from: '"Clon Tuiter" <no-reply@clontuiter.com>',
            to: newUser.email,
            subject: "Activa tu cuenta",
            html: `<p>Hola ${newUser.username}, activa tu cuenta dando clic en el siguiente enlace:</p>
                <a href="${activationUrl}">Activar cuenta</a>`
        });

        return res.status(200).json({ status: 'success', msg: "User created. We send a confirmation email " });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

//Funcion para activar cuenta de usuario
export const activateAccount = async (req: Request, res: Response): Promise<Response> => {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
        return res.status(400).json({ status: "error", msg: "Token is missing or invalid." });
    }

    try {
        // Verificar el token
        const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

        // Buscar usuario por ID
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: "error", msg: "User not found." });
        }

        // Verificar que el token coincida
        if (user.activationToken !== token) {
            return res.status(403).json({ status: "error", msg: "Invalid activation token." });
        }

        // Activar usuario
        user.isActive = true;
        user.activationToken = undefined;
        await user.save();

        return res.status(200).json({ status: "success", msg: "Account activated successfully." });

    } catch (error) {
        // Manejo específico del error de token expirado
        if (error instanceof jwt.TokenExpiredError) {
            console.error("Activation token has expired.");
            return res.status(401).json({ status: "error", msg: "Activation token has expired. Please request a new one." });
        }
        //Manejo de token invalido
        if (error instanceof jwt.JsonWebTokenError) {
            console.log(error);
            return res.status(401).json({ status: 'error', msg: 'invalid token' });
        }

        // Manejo de otros errores
        console.error("An error occurred:", error);
        return res.status(401).json({ status: "error", msg: "Token is invalid." });
    }
};

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
        if (!userExist.isActive) {
            return res.status(404).json({ status: 'error', msg: 'Your acount is not active' })
        }
        const passwordCorrent = await bcrypt.compare(password, userExist.password);

        //Comparar contraseña
        if (!passwordCorrent) {
            return res.status(401).json({ status: 'error', msg: 'Invalid credentials' });
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
        const userData = {
            userId: userExist._id,
            username: userExist.username,
            token
        }

        return res.status(200).json({ status: 'success', msg: 'User Loged', userData })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Server Error' })
    }
}

// Funcion para seguir usuario
export const followUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idUser } = req.params;

        if (!idUser || !isValidObjectId(idUser)) {
            return res.status(400).json({ status: 'error', msg: 'Id requerido' });
        }

        const currentUserId = req.userId;

        if (currentUserId && currentUserId.toString() === idUser.toString()) {
            return res.status(400).json({ status: 'error', msg: "No puedes seguirte a ti mismo" });
        }

        const userToFollow = await User.findById(idUser);
        const currentUser = await User.findById(currentUserId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ status: 'error', msg: 'Usuario no encontrado' });
        }

        // --- Solución del error ---
        // Se corrige la asignación de tipos de forma explícita.
        // `_id` es de tipo `mongoose.Types.ObjectId`
        const userToFollowId = userToFollow._id as mongoose.Types.ObjectId;
        const currentUserIdValid = currentUser._id as mongoose.Types.ObjectId;

        //Verificar si ya seguimos al usuario
        const isFollowing = currentUser.following?.some(id => id.toString() === userToFollowId.toString());
        if (isFollowing) {
            return res.status(400).json({ status: 'error', msg: 'Ya sigues a este usuario' });
        }

        currentUser.following?.push(userToFollowId);
        userToFollow.followers?.push(currentUserIdValid);

        await currentUser.save();
        await userToFollow.save();

        return res.status(200).json({ status: 'success', msg: 'Seguidor añadido con éxito' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Error del servidor' });
    }
};


//Funcion para dejar de seguir a usuario
export const unfollowUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { idUser } = req.params;

        if (!idUser || !isValidObjectId(idUser)) {
            return res.status(400).json({ status: 'error', msg: 'Id requerido' });
        }

        const currentUserId = req.userId;

        if (currentUserId && currentUserId.toString() === idUser.toString()) {
            return res.status(400).json({ status: 'error', msg: "No puedes dejar de seguirte a ti mismo" });
        }

        const userToUnfollow = await User.findById(idUser);
        const currentUser = await User.findById(currentUserId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ status: 'error', msg: 'Usuario no encontrado' });
        }

        const userToUnfollowId = userToUnfollow._id as mongoose.Types.ObjectId;
        const currentUserIdValid = currentUser._id as mongoose.Types.ObjectId;

        // Verificar si el usuario actual sigue al usuario que quiere dejar de seguir
        const isFollowing = currentUser.following?.some(id => id.toString() === userToUnfollowId.toString());
        if (!isFollowing) {
            return res.status(400).json({ status: 'error', msg: 'No sigues a este usuario' });
        }

        // Eliminar al usuario de la lista 'following'
        currentUser.following = currentUser.following?.filter(
            (id) => id.toString() !== userToUnfollowId.toString()
        );

        // Eliminar al usuario actual de la lista 'followers' del otro usuario
        userToUnfollow.followers = userToUnfollow.followers?.filter(
            (id) => id.toString() !== currentUserIdValid.toString()
        );

        await currentUser.save();
        await userToUnfollow.save();

        return res.status(200).json({ status: 'success', msg: 'Dejaste de seguir al usuario con éxito' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'error', msg: 'Error del servidor' });
    }
};