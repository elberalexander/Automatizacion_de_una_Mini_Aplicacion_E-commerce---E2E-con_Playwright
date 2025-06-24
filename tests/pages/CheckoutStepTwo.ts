import { Page, Locator } from "@playwright/test";

export class CheckoutStepTwo {

    readonly subtotal: Locator
    readonly impuesto: Locator
    readonly total: Locator


    constructor(readonly page: Page) {
        this.page = page
        this.subtotal = page.locator('div[data-test="subtotal-label"]')
        this.impuesto = page.locator('div[data-test="tax-label"]')
        this.total = page.locator('div[data-test="total-label"]')

    }

    async mostrarInformacion() {

        let subtotal = await this.subtotal.innerText()
        let impuesto = await this.impuesto.innerText()
        let total = await this.total.innerText()

        return {
            subtotal, impuesto, total
        }
    }
    async finishCompra(){
        await this.page.getByRole('button', {name: "Finish"}).click()
    }
    async cancelCompra(){
        await this.page.getByRole('button', {name: "Go back Cancel"}).click()
    }

}