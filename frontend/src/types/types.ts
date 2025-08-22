type Status = "success" | "error";
type Rol = "user" | "admin";

export interface ApiResponse {
  status: Status;
  msg: string;
}

//Interface para usuario
export interface User {
  _id?:string,
  username: string;
  bio?: string;
  email: string;
  password: string;
  role: Rol;
  isActive: boolean;
  activationToken?: string;
  createdAt: Date;

  // Relaciones
  followers?: string[];
  following?: string[];
}
//Tipo base para el formulario, seleccionando campos existentes
type UserFormDataBase = Pick<User, "username" | "password" | "email">;
//Tipo para el campo adicional (passwordr)
type PasswordConfirmation = {
  passwordr: string;
};
//Usar el tipo de intersección '&' para combinarlos en un nuevo tipo
export type RegisterFormData = UserFormDataBase & PasswordConfirmation;

//Type loginform
export type LoginFormData = Pick<User, "username" | "password">;

export interface UserLoginData {
  id:string;
  username: string;
  bio?: string;
  token: string;
}

export interface LoginApiPostResponse extends ApiResponse {
  userData?: UserLoginData;
}
//TypeEdit bio
export type BioFormData = Pick<User, "bio">;

//Interfaces para los post
export interface Comment {
  _id?:string,
  user: User;
  text: string;
  createdAt: Date;
}
export interface Post {
  _id: string;
  author: string;
  text: string;
  image?: string;
  likes?: string[];
  comments?: Comment[];
  createdAt: Date;
}
export type PostFormData = Pick<Post, "text" | "image">

export interface ApiCreatePostResponse extends ApiResponse{
  post:Post;
}

export interface ApiGetPostsResponse extends ApiResponse{
  posts:Post[];
}

//Para obtener datos del usuario sin token
type UserData = Pick<User, 'followers' | 'following' | 'username' | 'bio'>
export interface ApiGetUserDataResponse extends ApiResponse{
  userData: UserData
}

//Interfaces para obtener post y mostrarlos en el main
export interface ApiGetPostsMainResponse {
    status: string;
    msg:    string;
    posts:  MainPost[];
}
export interface MainPost {
    _id:       string;
    author:    Author;
    text:      string;
    image?:    string;
    likes:     string[];
    comments:  Comment[];
    createdAt: Date;
}
export interface Author {
    _id:      string;
    username: string;
}
