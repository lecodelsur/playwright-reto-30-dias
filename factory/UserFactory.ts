import { UserModel } from "../models/UserModel";

//Esto es el patrón factory para definir y usar distintos tipos de usuarios
export class UserFactory{

    private static defaultPassword = "Password123!"
    //overrides me permite sobreescribir las propiedades, se usa el utilitario llamado Partial por si alguno de las propiedades viene definida.
    private static base(overrides?: Partial<UserModel>): UserModel{

        const defaults: UserModel = {
            username: 'user-' + crypto.randomUUID().slice(0, 30),
            employee: 'Default employee',
            password: this.defaultPassword,
            confirmPassword: this.defaultPassword,
            role :'ESS',
            status:'Enabled'
    };
//aca usuarmos el spread operator u operador de propagacion que explande elementos de un arreglo
    return{...defaults, ...(overrides || {}) }
}
static createEmployeeESS (overrides?: Partial<UserModel>){
    return this.base({role:'ESS', ...(overrides ||{})})
}
//aca le especifico que el rol de creación para el AdminUser ya viene definido en este método
static createAdmin (overrides?: Partial<UserModel>){
    return this.base({role:'Admin', ...(overrides ||{})})
}
static createDisableAdmin(overrides?: Partial<UserModel>){
    return this.base({role: 'Admin', status: 'Disabled',...(overrides ||{})})

}
}