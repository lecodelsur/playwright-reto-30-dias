import { Locator, Page } from "@playwright/test";
import { Environment } from "../config/Environment";
export class LoginPage {

    readonly page: Page
    readonly usernameInput: Locator //definimos los localizadores vacios en ese momento
    readonly passwordInput: Locator
    readonly loginButton: Locator
    // una vez que el constructor cree esos objetos esos valores no van a poder ser cambiados por seguridad
    constructor(page: Page) {
        //aca cuando se crea el page object le asignamos valor a los localizadores con los cuales nuestra pagina
        //va a identificar los elementos. 
        this.page = page
        this.usernameInput = page.getByRole('textbox', { name: 'Username' })
        this.passwordInput = page.getByRole('textbox', { name: 'Password' })
        this.loginButton = page.getByRole('button', { name: 'Login' })

    }

    async doLogin(username: string, password: string) {
        await this.page.goto('web/index.php/auth/login')    //aca va a la URL base primero definida en la linea 30 de playwright.config.ts
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
    async loginAsAdmin(){
        await this.doLogin(Environment.ADMIN_USERNAME, Environment.ADMIN_PASSWORD)
    }
    async loginAsEmployee(){ //aca creo el método login como un empleado
       await this.doLogin(Environment.USER_USERNAME, Environment.USER_PASSWORD)
    }
}