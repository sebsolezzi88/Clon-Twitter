import { Router } from "express";
import { createPost, deletePost, getPostByUserId, updatePost } from "../controllers/postController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post('/',verifyToken,createPost); //Ruta protegida para crear post
router.get('/:userId',getPostByUserId); //Ruta para obtener los post de un usuario
router.put('/:postId',verifyToken,updatePost); //Ruta protegida para actualizar post
router.delete('/:postId',verifyToken,deletePost); //Ruta protegida para borrar post



export default router;