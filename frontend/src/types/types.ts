type Status= 'success' | 'error';
type Rol= 'user' | 'admin';


export interface ApiResponse{
    status: Status;
    msg:string;
}

//Interface para usuario
export interface User{
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
type UserFormDataBase = Pick<User, 'username' | 'password' | 'email'>;
//Tipo para el campo adicional (passwordr)
type PasswordConfirmation = {
    passwordr: string;
};
//Usar el tipo de intersección '&' para combinarlos en un nuevo tipo
export type RegisterFormData = UserFormDataBase & PasswordConfirmation;

//Type loginform
export type LoginFormData = Pick<User, 'username' | 'password'>