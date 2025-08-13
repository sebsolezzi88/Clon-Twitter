import { Router } from "express";
import { createAccount, followUser, loginUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateRegister";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post('/create',validateUserRegister,createAccount); //Ruta para crear cuenta
router.post('/login',loginUser); //Ruta para login y obtener token

//Rutas para seguir usuario
router.post('/:idUser/follow',verifyToken ,followUser) //Rutas para seguir usuario



export default router;