import {expect, test} from '@playwright/test' //primero se importa test desde playwright
import { LoginPage } from '../pageobjects/LoginPage'

test ('Login to hrm' , async({page})=>{    //aca va el nombre del test y ya podemos comenzar con los pasos

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')
     

    await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible()//5°Le decimos que espere que el elemento link admin sea visible

})

test ('Empty fields @login', async({page})=>{   

    await page.goto('https://opensource-demo.orangehrmlive.com/') //1°Le decimos que navegue a esa URL
    await page.getByRole('button', {name: 'Login'}).click()       //2°Le decimos que haga click en el botón login sin haber completado usuario ni contraseña

    await expect(page.getByText('Required').first()).toBeVisible  //3°Le decimos que espere que el texto 'Required' sea visible
    await expect(page.getByText('Required').nth(1)).toBeVisible   //4°Le decimos que en la posición nth 1 aparezca el texto 'Required'

})

test ('Invalid credentials @login', async({page})=> {

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')
         //4°Le decimos que haga click en el botón login

    await expect(page.getByRole('alert')).toBeVisible               //5°Le decimos que espere el rol alert
    await expect(page.getByRole('alert')).toHaveText('Invalid credentials')//6°Le decimos que espero el rol alert y el el texto "invalid credentials"
})

