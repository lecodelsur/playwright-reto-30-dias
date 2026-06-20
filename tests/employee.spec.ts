import { expect, test } from "@playwright/test"//importo test de playwright test
import { LoginPage } from "../pageobjects/LoginPage"
test('Get all the employee names', async ({ page }) => {  //creo mi test y le doy un nombre

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

    
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible() //aca se espera que cuando se loguee se vea este Admin. 

    await page.getByRole('link', { name: 'Admin' }).click() //aca hago click en Admin de la izquierda. 

    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click()//aca le digo que en la grilla haga click en User Management
    await page.getByRole('menuitem', { name: 'Users' }).click() //aca le digo que en el menuitem haga click en User para cargar la grilla.

    const rows = page.getByRole('table').getByRole('row') //aca le pido que me guarde en la constante rows 
    const employeeNames: string[] = [] //aca digo que cree un arreglo y con '= []' lo inicializo a vacio

    const rowCount = await rows.count() //aca quiero contar cuantas filas hay excluyendo el header

    for (let i = 1; i < rowCount; i++) {//que empiece en uno y que sea menor al conteo, y que aumente en cada iteración
        const cell = rows.nth(i).getByRole('cell').nth(3) //para acceder a la celda específica nth es el indice y se le pone 1 porque quiero la segunda columna
        const employeename = await cell.textContent() //capture el employee la celda y el metodo que uso es textContent

        if (employeename) {    //textContent puede devolver un nulo por eso uso este if
            employeeNames.push(employeename)
        }
    }
    console.log(employeeNames) //que imprima todos los usuarios que estan en la inferfaz gráfica.
})