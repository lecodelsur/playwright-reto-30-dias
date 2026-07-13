import {test as setup, expect}  from '@playwright/test' //importo test pero uso un alias y le llamo setup (funcion de typescript para darle otro nombre a un objeto)
//para hacer el login traigo el objeto loginPage
import { LoginPage } from '../pageobjects/LoginPage'


setup ('authentication as admin', async({page}) =>{ //aca use test como setup (async permite usar la palabra await adentro para esperar que cargen las paginas sin trabar el código)

console.log('Autenticacion iniciada usando el setup')

    //iniciar sesion
const loginPage = new LoginPage(page)
await loginPage.loginAsAdmin()

//nos aseguramos que el inicio de sesion es exitoso
await expect(page.getByRole('link', {name:'Admin'})).toBeVisible()

//Guardar el estado en la carpeta .auth en la raiz del proyecto
await page.context().storageState({path: '.auth/admin.json'})


console.log('Atenticación completada usando el setup')
})

/*
setup ('authentication as employee', async({page}) =>{ 

console.log('Autenticacion de employee iniciada usando el setup')

    //iniciar sesion
const loginPage = new LoginPage(page)
await loginPage.loginAsEmployee()

//nos aseguramos que el inicio de sesion es exitoso
await expect(page.getByRole('link', {name:'Leave'})).toBeVisible()

//Guardar el estado en la carpeta .auth en la raiz del proyecto
await page.context().storageState({path: '.auth/employee.json'})


console.log('Atenticación de employee completada usando el setup')
})
*/
