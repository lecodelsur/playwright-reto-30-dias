import { expect, test } from "@playwright/test"//importo test de playwright test
import { LoginPage } from "../pageobjects/LoginPage"
import { SideMenuOption, SidePanel } from "../components/SidePanel"
import { TopBarMenu } from "../components/Top-Bar-Menu/TopBarMenu"
import { Navigate } from "../pageobjects/Navigate"
import { AddNewUserPage } from "../pageobjects/AddNewUserPage"
test('Get all the usernames registered', async ({ page }) => {  //creo mi test y le doy un nombre


    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')

    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible() //aca se espera que cuando se loguee se vea este Admin. 

    await page.getByRole('link', { name: 'Admin' }).click() //aca hago click en Admin de la izquierda. 

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()//aca le digo que en la grilla haga click en User Management
    await page.getByRole('menuitem', { name: 'Users' }).click() //aca le digo que en el menuitem haga click en User para cargar la grilla.

    const rows = page.getByRole('table').getByRole('row') //aca le pido que me guarde en la constante rows 
    const usernames: string[] = [] //aca digo que cree un arreglo y con '= []' lo inicializo a vacio

    const rowCount = await rows.count() //aca quiero contar cuantas filas hay excluyendo el header

    for (let i = 1; i < rowCount; i++) {//que empiece en uno y que sea menor al conteo, y que aumente en cada iteración
        const cell = rows.nth(i).getByRole('cell').nth(1) //para acceder a la celda específica nth es el indice y se le pone 1 porque quiero la segunda columna
        const username = await cell.textContent() //capture elusername la celda y el metodo que uso es textContent

        if (username) {    //textContent puede devolver un nulo por eso uso este if
            usernames.push(username)
        }
    }
    console.log(usernames) //que imprima todos los usuarios que estan en la inferfaz gráfica.
})

test('Select specific user for edition', async ({ page }) => {



    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin', 'admin123')



    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible()

    await page.getByRole('link', { name: 'Admin' }).click()

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()
    await page.getByRole('menuitem', { name: 'Users' }).click()

    const rows = page.getByRole('table').getByRole('row') //aca le pido que me guarde en la constante rows 
    const rowCount = await rows.count() //aca quiero contar cuantas filas hay excluyendo el header
    const indiceAleatorio: number = Math.floor(Math.random() * (rowCount - 1)) + 1 //aca obtengo un aleatorio menos el primero mas uno
    const cell = rows.nth(indiceAleatorio).getByRole('cell').nth(1) //para acceder a la celda específica nth es el indice y se le pone 1 porque quiero la segunda columna
    const userForEdition = await cell.innerText()


    const pencilToEdit = page
        .getByRole('table') //Con este filtro obtenemos la tabla (el elemento mas grande que contiene todos)
        .getByRole('row')  //Con este obtenemos todas las filas o rows
        .filter({ hasText: userForEdition }) //aca le pido que filtre por el elemento especifico que definí
        .locator('button') //aca que me devuelva un botón (hay dos asique tengo que especificar cual)
        .filter({ has: page.locator('i.bi-pencil-fill') }) //aca  le digo que de los dos, me devuelva el que tenga la clase (bi-pencil-fill)
    await pencilToEdit.click()
    const currentUsername = await page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")
        .inputValue()
    //esta forma de localizar solo funciona cuando hay un div parent con dos divs, uno con un label y uno con un input.
    expect(currentUsername).toEqual(userForEdition)
    expect(page.locator("//label[contains(.,'Username')]/parent::div/following-sibling::div/input")).toHaveValue(currentUsername)
    console.log(userForEdition)

})

test('Check user role options', async ({ page }) => {

    const expectedRoleOptions = ['-- Select --', 'Admin', 'ESS'] //aca tomo de los resultado lo que quiero que me traiga 

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN) //aca le digo que clickee en el botón de admin definido en SideMenuOption

    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click() //aca encuentra el sisguiente elemento por path
    const currentUserRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentUserRoleOptions)
    expect(currentUserRoleOptions, 'The options displayed in the User Role Dropdown do not match the expected options.').toEqual(expectedRoleOptions)

})

test('Check Status options', async ({ page }) => {

    const expectedStatusOptions = ['-- Select --', 'Enabled', 'Disabled'] //aca tomo de los resultado lo que quiero que me traiga 

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN) //aca le digo que clickee en el botón de admin definido en SideMenuOption

    await page.locator("//label[contains(.,'Status')]/parent::div/following-sibling::div").click() //aca encuentra el sisguiente elemento por path
    const currentSatusOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts()

    console.log(currentSatusOptions)
    expect(currentSatusOptions, 'The options displayed in the Status Dropdown do not match the expected options.').toEqual(expectedStatusOptions)

})

test('Filter by user admin', async ({ page }) => {

    const loginPage = new LoginPage(page)
    await loginPage.loginAsAdmin()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)
    //aca le digo que de la tabla traiga la fila a partir de la 2°
    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')

    //aca trae todas filas que contienen el role admin
    const currentAdminRows = allBodyRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')

    })
    //aca cuenta el número de los administradores
    const expectedAdminCount = await currentAdminRows.count()
    console.log('Admin users before filtering: ', expectedAdminCount)

    //aca se aplica el filtro
    await page.locator("//label[contains(.,'User Role')]/parent::div/following-sibling::div").click()
    await page.getByRole("listbox").getByRole('option', { name: 'Admin' }).click()
    await page.getByRole('button', { name: 'Search' }).click()

    //La tabla filtrada deberia tener exactamente la misma cantidad que encontramos

    await expect(allBodyRows).toHaveCount(expectedAdminCount)


    for (let i = 0; i < expectedAdminCount; i++) {

        await expect(allBodyRows.nth(i).getByRole('cell').nth(2)).toContainText('Admin')
    }


})

test('Capture all amounts', async ({ page }) => {

    await page.goto('/web/index.php/claim/viewAssignClaim')

    const allBodyRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row')
    // allbodyrows guarda toooooda la table
    const amounts: number[] = []
    //amounts guarda un array de números
    const rowCount = await allBodyRows.count()
    // rowCount cuenta cuantas rows hay
    console.log('number of rows', rowCount)

    for (let i = 0; i < rowCount; i++) {

        const amountCell = allBodyRows.nth(i).getByRole('cell').nth(7)
        const amountText = await amountCell.textContent()
        console.log("This is the amount in text format: ", amountText)
        if (amountText === null) {
            continue
        }
        const convertedNumber = parseFloat(amountText?.replace(/,/g, '').trim())
        amounts.push(convertedNumber)
    }
    console.log(amounts)


    let total = 0
    let valorMaximo = 0
    let valorMinimo = 0
    let valorPromedio = 0

    for (let amount of amounts) {
        valorMinimo = Math.min(valorMinimo, amount) // Me quedo con el valor minimo entre el minimo anterior y el valor actual
        valorMaximo = Math.max(valorMaximo, amount) // Me quedo con el valor máximo entre el minimo anterior y el valor actual    
        total += amount
    }
    console.log("total is", total)

    if (amounts.length > 0) { //se fija que no sea cero porque no se puede dividir por cero
        valorPromedio = total / amounts.length //asi se saca el promedio
    }

    console.log("Este es el valor máximo", valorMaximo)
    console.log("Este es el valor mínimo", valorMinimo)
    console.log("Este es el valor promedio", valorPromedio)
})

test('Add new user', async ({ page }) => {

    const randomUsername = 'Leco' + crypto.randomUUID()
    const password = 'R4mdom45..*'
    const employeeToSearch = 'Qwerty LName'
    /* await page.goto('/web/index.php/dashboard/index') 
    se reemplaza por el const navigate */
    const navigate = new Navigate(page)
    await navigate.toDashboard()

    const sidePanel = new SidePanel(page)
    await sidePanel.clickOnOption(SideMenuOption.ADMIN)

    const topBarMenu = new TopBarMenu(page)
    await topBarMenu.userManagement.clickOnUsers()

    const addNewUserPage = new AddNewUserPage(page)
    await addNewUserPage.clickOnAdd()
//aca movimos el seleccionar el role
    await addNewUserPage.selectUserRole('ESS')
    await addNewUserPage.selectEmployeeName(employeeToSearch)
    await addNewUserPage.selectStatus('Enabled')
    await addNewUserPage.enterUserName(randomUsername)
    await addNewUserPage.enterPassword(password)
    await addNewUserPage.enterConfirmPassword(password)
//Le doy al botón save (deprecado, esta en addNewUserPAge.ts)
})