import { expect, test } from "@playwright/test"//importo test de playwright test
test('Get all the usernames registered', async ({ page }) => {  //creo mi test y le doy un nombre

    await page.goto('https://opensource-demo.orangehrmlive.com')    //voy a la URl
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin') //en texbox usuario le pido que complete con Admin
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')//en texbox password le pido que complete admin123
    await page.getByRole('button', { name: 'Login' }).click()//en button login le pido que haga click


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



    await page.goto('https://opensource-demo.orangehrmlive.com')
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin')
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123')
    await page.getByRole('button', { name: 'Login' }).click()


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
