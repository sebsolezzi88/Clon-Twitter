import { Router } from "express";
import { commentPost, createPost, deletePost, getLastTenPost, getPostByUserId, getPostByUserTokenId, updatePost } from "../controllers/postController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get('/last10',getLastTenPost); //Ruta para obtener los ultimo 10 post si los hay
router.post('/',verifyToken,createPost); //Ruta protegida para crear post
router.get('/:userId',getPostByUserId); //Ruta para obtener los post de un usuario
router.get('/',verifyToken,getPostByUserTokenId); //Ruta para obtener los post de un usuario usando su token
router.put('/:postId',verifyToken,updatePost); //Ruta protegida para actualizar post
router.delete('/:postId',verifyToken,deletePost); //Ruta protegida para borrar post

router.post('/:postId/comment',verifyToken,commentPost); //Ruta protegida para comentar un post



export default router;