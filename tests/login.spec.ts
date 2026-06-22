import { expect, test } from '@playwright/test' //primero se importa test desde playwright
import { LoginPage } from '../pageobjects/LoginPage'
import { SideMenuOption, SidePanel } from '../components/SidePanels'

test('Login to hrm', async ({ page }) => {    //aca va el nombre del test y ya podemos comenzar con los pasos
    //aca creamos el componente para interactual loginPage
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')
    //aca creamos el otro componente sidePanel
    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    await sidePanel.clickOnOption(SideMenuOption.PIM)
    await sidePanel.clickOnOption(SideMenuOption.LEAVE)
    await sidePanel.clickOnOption(SideMenuOption.TIME)
    await sidePanel.clickOnOption(SideMenuOption.RECRUITMENT)
    await sidePanel.clickOnOption(SideMenuOption.MY_INFO)
    await sidePanel.clickOnOption(SideMenuOption.PERFORMANCE)
    await sidePanel.clickOnOption(SideMenuOption.DASHBOARD)
    await sidePanel.clickOnOption(SideMenuOption.DIRECTORY)
    await sidePanel.clickOnOption(SideMenuOption.CLAIM)
    await sidePanel.clickOnOption(SideMenuOption.BUZZ)


})

test('search admin in search box', async ({ page }) => {//aca se resuelve el ejercicio de buscar en la searchbox
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    const searchBox = await page.getByRole('textbox', { name: 'Search' }).fill('Admin')
    await expect(page.getByText('Admin')).toBeVisible  


})


test('Empty fields @login', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/') //1°Le decimos que navegue a esa URL
    await page.getByRole('button', { name: 'Login' }).click()       //2°Le decimos que haga click en el botón login sin haber completado usuario ni contraseña

    await expect(page.getByText('Required').first()).toBeVisible  //3°Le decimos que espere que el texto 'Required' sea visible
    await expect(page.getByText('Required').nth(1)).toBeVisible   //4°Le decimos que en la posición nth 1 aparezca el texto 'Required'

})

test('Invalid credentials @login', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')
    //4°Le decimos que haga click en el botón login

    await expect(page.getByRole('alert')).toBeVisible               //5°Le decimos que espere el rol alert
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials')//6°Le decimos que espero el rol alert y el el texto "invalid credentials"
})

