export class Environment {
//Environment es una clase de ayuda que estoy creando para la configuración
//aca leo las variables username y password del archivo playwright.config.ts
    static readonly ADMIN_USERNAME = Environment.getRequired('ADMIN_USERNAME')
    static readonly ADMIN_PASSWORD = Environment.getRequired('ADMIN_PASSWORD')

    static readonly USER_USERNAME = Environment.getRequired('USER_USERNAME')
    static readonly USER_PASSWORD = Environment.getRequired('USER_PASSWORD')
    //creo un método estático getRequired y le paso el key al mismo
    private static getRequired(key: string): string{
        const value = process.env[key]

        //si alguien pasa un key que no existe muestro error
        if(!value){
            throw new Error ('Environment variable '+ key + 'does not exist')
        }
        return value
    }
}