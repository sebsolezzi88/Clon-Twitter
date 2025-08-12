import express from 'express';
import { getMongoConnection } from './config/db';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';

import User from './models/User';
import Post from './models/Post';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json()); //Para leer los json

//Conexion a la base de datos
getMongoConnection();

app.use('/api/user',userRoutes); //Rutas usuarios
app.use('/api/post',postRoutes); //Rutas post

app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})

