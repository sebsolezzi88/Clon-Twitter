import { Router } from "express";
import { activateAccount, changeBio, createAccount, followUser, loginUser, unfollowUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateRegister";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post('/create',validateUserRegister,createAccount); //Ruta para crear cuenta
router.get('/activate',activateAccount); //Ruta para activar cuenta
router.post('/login',loginUser); //Ruta para login y obtener token

//Ruta editar perfil
router.patch('/bio',verifyToken,changeBio); //Ruta para editar biografía

//Rutas para seguir usuario
router.post('/:idUser/follow',verifyToken ,followUser) //Rutas para seguir usuario
router.post('/:idUser/unfollow',verifyToken ,unfollowUser) //Rutas para dejar de seguir usuario




export default router;