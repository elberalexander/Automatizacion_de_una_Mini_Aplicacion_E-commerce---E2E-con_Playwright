import { Page, Locator } from '@playwright/test'

export class LoginPages {

    readonly inputUsername: Locator;
    readonly inputPassword: Locator;
    readonly btnLogin: Locator;

    constructor(readonly page: Page) {
        this.page = page
        this.inputUsername = page.getByRole('textbox', { name: 'Username' })
        this.inputPassword = page.getByRole('textbox', { name: 'Password' })
        this.btnLogin = page.getByRole('button', { name: 'Login' })

    }
    async login(username: string, password: string) {

        await this.inputUsername.fill(username)
        await this.inputPassword.fill(password)
        await this.btnLogin.click()
    }
    

}