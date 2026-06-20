import { expect, test } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'

test('Check left menu options', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')


    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    const leftMenuItems = page.getByLabel('Sidepanel').getByRole('listitem')
    const currentMenuItemsCount = await leftMenuItems.count()
    console.log('current menu items count', currentMenuItemsCount)

    const currentMenuItems: string[] = []

    for (let i = 0; i < currentMenuItemsCount; i++) {
        const menuText = await leftMenuItems.nth(i).innerText()
        currentMenuItems.push(menuText)
    }
    console.log(currentMenuItems)

    const expectedMenuItems = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];
    expect(currentMenuItems).toEqual(expectedMenuItems)
    expect(await leftMenuItems.nth(0).innerText()).toEqual('Admin') //ejercicio de chequear primera posición
})

test('check all the qualifications link', async ({ page }) => {
    const expectedPages = [
        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        }


    ]
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')


    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click()

    const qualificationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages) {

        const menuOption = qualificationOptions.filter({ hasText: expectedPage.menu })
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click()
    }
})

test('check all the organization link', async ({ page }) => {
    const expectedPages = [
        {
            menu: 'General',
            url: 'web/index.php/admin/viewOrganizationGeneralInformation'
        },
        {
            menu: 'Location',
            url: '/web/index.php/admin/viewLocations'
        },
        {
            menu: 'Structure',
            url: '/web/index.php/admin/viewCompanyStructure'
        }


    ]
    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')


    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()
    await page.getByRole('link', { name: 'Admin' }).click()
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Organization').click()

    const OrganizationOptions = page.getByRole('menu').locator('li')

    for (let expectedPage of expectedPages) {

        const menuOption = OrganizationOptions.filter({ hasText: expectedPage.menu })
        await menuOption.click()
        await expect(page).toHaveURL(new RegExp(expectedPage.url))

        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Organization').click()
    }
})