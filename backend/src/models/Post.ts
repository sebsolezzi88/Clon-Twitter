import mongoose, { Schema, Document } from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId; // Usuario que comenta
  text: string;
  createdAt: Date;
}

export interface IPost extends Document {
  author: mongoose.Types.ObjectId; // Usuario que creó el post
  text: string;
  image?: string;                   // URL o path de imagen
  likes?: mongoose.Types.ObjectId[]; // Usuarios que dieron like
  comments?: IComment[];             // Comentarios de usuarios
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;