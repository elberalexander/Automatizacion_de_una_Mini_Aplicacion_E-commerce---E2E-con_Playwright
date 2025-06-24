import { Page, Locator,expect } from '@playwright/test'

export class LoginValidacionRestricciones {

    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;
    readonly errorMensaje: Locator;
    readonly menulogout: Locator;
    readonly logout: Locator;

    constructor(readonly page: Page) {
        this.page = page
        this.inputUsername = page.getByRole('textbox', { name: 'Username' })
        this.inputPassword = page.getByRole('textbox', { name: 'Password' })
        this.btnLogin = page.getByRole('button', { name: 'Login' })
        this.errorMensaje = page.locator('[data-test="error"]');
        this.menulogout=page.getByRole('button', { name: 'Open Menu' })
        this.logout=page.getByRole('link', { name: 'Logout' })
        

    }
    async login(username: string, password: string) {

        await this.inputUsername.fill(username)
        await this.inputPassword.fill(password)
        await this.btnLogin.click()
    }
    async validarErrorUsuarioNoIngresado() {
            await expect (this.errorMensaje).toBeVisible();
            await expect (this.errorMensaje).toContainText('Epic sadface: Username is required'); // Valida que hay un error sin importar cuál sea
          }
    async validarErrorPasswordNoIngresado() {
        await expect (this.errorMensaje).toBeVisible();
        await expect (this.errorMensaje).toContainText('Epic sadface: Password is required'); // Valida que hay un error sin importar cuál sea
      } 
    async validarErrorcamposNoIngresados() {
        await expect (this.errorMensaje).toBeVisible();
        await expect (this.errorMensaje).toContainText('Epic sadface: Username is required'); // Valida que hay un error sin importar cuál sea
      }
    async UsuarioBloqueado() {
        await expect (this.errorMensaje).toBeVisible();
        await expect (this.errorMensaje).toContainText('Epic sadface: Sorry, this user has been locked out.'); // Valida que hay un error sin importar cuál sea
      } 
    async ValidarAccesoListaDeProductos() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
      }             
    async AccederMenu() {
        await this.menulogout.click();
      } 
    async HacerLogout() {
        await this.logout.click();
      }  
    async ReDireccionAlLogin() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
      } 
    async UsuarioInexistente() {
        await expect (this.errorMensaje).toBeVisible();
        await expect (this.errorMensaje).toContainText('Epic sadface: Username and password do not match any user in this service');       
      }
    async IntentarAccederSinLogin(page) {
        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect (this.errorMensaje).toBeVisible();
        await expect (this.errorMensaje).toContainText("Epic sadface: You can only access '/inventory.html' when you are logged in.");       
      }    
 //------------------
 async Sinlogin(page,url: string) {
    await page.goto(url); 
    await expect(page).toHaveURL('https://www.saucedemo.com/'); 
    await expect (this.errorMensaje).toBeVisible();
    await expect (this.errorMensaje).toContainText("Epic sadface: You can only access '/cart.html' when you are logged in.");   
}   
    
}