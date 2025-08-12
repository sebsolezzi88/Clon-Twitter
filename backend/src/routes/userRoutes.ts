import { Router } from "express";
import { createAccount, loginUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateRegister";

const router = Router();

router.post('/create',validateUserRegister,createAccount); //Ruta para crear cuenta
router.post('/login',loginUser); //Ruta para login y obtener token



export default router;