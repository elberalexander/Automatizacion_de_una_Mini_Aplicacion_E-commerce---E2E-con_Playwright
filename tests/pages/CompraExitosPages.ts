import { Page, Locator } from "@playwright/test";

export class CompraExitosPages {

    readonly mensaje: Locator


    constructor(readonly page: Page) {
        this.page = page
        this.mensaje = page.locator('h2[data-test="complete-header"]')


    }

    async mostrarInformacion() {

      return await this.mensaje.innerText()
    
    }


}