import {Page, Locator,expect } from "@playwright/test";

export class CheckoutStepOne {

    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continuar: Locator
    readonly errorMensaje: Locator;

    constructor(readonly page: Page) {
        this.page = page
        this.firstName = page.getByRole('textbox',{name: "First Name"})
        this.lastName = page.getByRole('textbox',{name: "Last Name"})
        this.postalCode = page.getByRole('textbox',{name: "Zip/Postal Code"})
        this.continuar = page.getByRole("button",{name: "Continue"})
        this.errorMensaje = page.locator('[data-test="error"]');
    }
    
    async llenarFormulario(name: string, last: string, postal:string) {

        await this.firstName.fill(name)
        await this.lastName.fill(last)
        await this.postalCode.fill(postal)
        await this.continuar.click()
    }
    async validarErrorFormularioRequerido() {
        await expect(this.errorMensaje).toBeVisible();
        await expect(this.errorMensaje).toContainText('Error:'); // Valida que hay un error sin importar cuál sea
      }

}