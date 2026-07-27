import { Page, expect } from "@playwright/test"
import { UserModel } from "../models/UserModel"

export class AddNewUserPage {

    private readonly page: Page
    constructor(page: Page) {
        this.page = page
    }
    async clickOnAdd() {
        await this.page.getByText('Add').click()
    }
    //metodo que nos permite seleccionar el rol
    async selectUserRole(userRole: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('User Role') })
            .locator('div.oxd-select-text-input')
            .click()
        //y aca en vez de directamente hardcodearle "ESS" le pido el valor que pasa por el método
        //await this.page.getByText(userRole, { exact: true }).click() refactorizado en DIA 18
        await this.page.getByRole('option', {name:userRole}).click()
    }
    async selectEmployeeName(employeeName: string) {
        await this.page.getByRole('textbox', { name: 'Type for hints...' })
            .fill(employeeName)
        await this.page.getByText(employeeName, { exact: true }).click()
    }
    async selectStatus(status: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Status') })
            .locator('div.oxd-select-text-input')
            .click()
        await this.page.getByText(status).click()
    }
    async enterUserName(userName: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Username') })
            .getByRole('textbox')
            .fill(userName)
    }
    async enterPassword(password: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)
    }
    async enterConfirmPassword(password: string) {
        await this.page.locator('div.oxd-grid-item--gutters')
            .filter({ has: this.page.getByText('Confirm Password', { exact: true }) })
            .getByRole('textbox')
            .fill(password)
    }
    async clickOnSave() {
        await this.page.getByRole('button', { name: 'Save' }).click()
    }
    async checkUserWasAddedMessage() {
        //validacion de si se agregó el usuario
        await expect(this.page.locator('p.oxd-text--toast-message'))
            .toHaveText('Successfully Saved')
    }
    //aca agrege el nuevo metodo AddNewUser con las acciones de bajo nivel
    //tambien UserModel que es un Data Transfer Objecto o DTO
    async addNewUser(user: UserModel) {
        await this.clickOnAdd()
        await this.selectUserRole(user.role)
        await this.selectEmployeeName(user.employee)
        await this.selectStatus(user.status)
        await this.enterUserName(user.username)
        await this.enterPassword(user.password)
        await this.enterConfirmPassword(user.confirmPassword)
        await this.clickOnSave()

    }
    /* async addInvalidUser(user: UserModel){
        await this.selectUserRole(user.role)
         await this.selectEmployeeName(user.employee)
         await this.selectStatus(user.status)
         await this.enterUserName(user.username)
         await this.enterPassword(user.password)
         await this.enterConfirmPassword(user.confirmpassword)
         await this.clickOnSave()
     } */

}
