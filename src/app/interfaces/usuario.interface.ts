export interface LoginForm {
    usuario: string;
    password: string;
}

export interface Login {
    usuario:Usuario;
    token: string;
}


export interface Usuario{
    nombre: string;
    username: string;
    rol: string;
    activo: boolean;
    uid: string;
}

export interface RegistroUsuario{
    nombre: string;
    username: string;
    password: string;
    rol: string;
}