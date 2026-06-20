import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
test('Navigate thruoght the left panel and click', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')


    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()

    for (let i =0; i <currentMenuItemsCount; i++){
        const menuItem = leftMenuItems.nth(i)
        const menuText = await menuItem.innerText()

        console.log('current menu item', menuText)
        await menuItem.click()
        if (menuText == 'Maintenance'){
            await page.goBack()
        }
    }

})