import { expect, test } from '@playwright/test'
test('Navigate thruoght the left panel and click', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()

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