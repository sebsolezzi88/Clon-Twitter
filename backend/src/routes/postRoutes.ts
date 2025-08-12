import { Router } from "express";
import { createAccount, loginUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateRegister";
import { createPost } from "../controllers/postController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post('/',verifyToken,createPost); //Ruta protegida para crear post

export default router;