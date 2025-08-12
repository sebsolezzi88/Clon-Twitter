import mongoose, { Schema, Document } from "mongoose";

export type Rol = "admin" | "user";

export interface IUser extends Document {
    username: string;
    bio?: string;
    email: string;
    password: string;
    role: Rol;
    isActive: boolean;             // Se activa tras validar el email
    activationToken?: string;      // Token para el enlace de activación
    createdAt: Date;

    // Relaciones
    followers?: mongoose.Types.ObjectId[]; // Usuarios que lo siguen
    following?: mongoose.Types.ObjectId[]; // Usuarios a los que sigue
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: false },
    activationToken: { type: String },
    createdAt: { type: Date, default: Date.now },

    // Relaciones de seguidores/seguidos
    followers: [{ type: Schema.Types.ObjectId, ref: "User" ,default:[]}],
    following: [{ type: Schema.Types.ObjectId, ref: "User" ,default:[]}]
})

const User = mongoose.model<IUser>("User", UserSchema);
export default User;