
export interface IUser {
    id: string;
    full_name: string;
    cpf: string;
    email: string;
    password: string; 
    confirm_password: string;
}


export interface IupdateUser {
    id: string;
    full_name: string;
    cpf: string;
    email: string;
    password: string; 
    new_password: string;
    confirm_password: string;
}