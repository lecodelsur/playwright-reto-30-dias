import {test} from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage'
//page = fixture
test('login sauce demo', async({page})=>{

    const loginPage = new LoginPage(page)
    await loginPage.doLogin('Admin','admin123')

})