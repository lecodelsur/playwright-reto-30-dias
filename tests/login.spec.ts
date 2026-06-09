import {expect, test} from '@playwright/test' //primero se importa test desde playwright

test ('Login to hrm', async({page})=>{    //aca va el nombre del test y ya podemos comenzar con los pasos

    await page.goto('https://opensource-demo.orangehrmlive.com/') //1°Le decimos que navegue a esa URL
    await page.getByRole('textbox', {name:'Username'}).fill('Admin')  //2 Le decimos que en el elemento con el rol texbox que se llama username lo llene con 'Admin'
    await page.getByRole('textbox', {name: 'Password'}).fill('admin123') //3° Le decimos que en password le ponga admin123
    await page.getByRole('button', {name: 'Login'}).click()    //4°Le decimos que haga click en el botón login

    await expect(page.getByRole('link',{name: 'Admin'})).toBeVisible() //5°Le decimos que espere que el elemento link admin sea visible
}

)