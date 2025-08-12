import { Router } from "express";
import { createAccount, loginUser } from "../controllers/userController";
import { validateUserRegister } from "../middlewares/validateRegister";
import { createPost, deletePost, updatePost } from "../controllers/postController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post('/',verifyToken,createPost); //Ruta protegida para crear post
router.put('/:postId',verifyToken,updatePost); //Ruta protegida para actualizar post
router.delete('/:postId',verifyToken,deletePost); //Ruta protegida para borrar post



export default router;