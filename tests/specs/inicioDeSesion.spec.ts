import { test, expect } from "@playwright/test";
import {LoginPages} from '../pages/LoginPages'

test.describe("Login y guarda sesion", () => {    
    let loginPage: LoginPages;    

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPages(page)        
        await page.goto('')

    });
    
    //test.use( { storageState: 'storageState.json'});

   /* test("login, inicio de sesion y almacenar su estado", async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce')
        await page.waitForTimeout(10000);//esperar 5 segundos
        await page.pause;
    });*/
    //---------------------------------------------------------
    test('Login y almacenar su estado', async ({ browser }) => {
        const context = await browser.newContext();    
        const page = await context.newPage();  
    
        const loginPage = new LoginPages(page); //
        await page.goto('https://www.saucedemo.com/'); //
    
        await loginPage.login('standard_user', 'secret_sauce');  
        await context.storageState({ path: 'storageState.json' });    
        await page.waitForTimeout(10000);
        
        await context.close();
    });
    //----------------- 

});