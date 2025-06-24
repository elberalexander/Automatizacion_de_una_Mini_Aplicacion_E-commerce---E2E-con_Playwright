import {Page, Locator}from '@playwright/test'

export class CarritoPages {

    readonly productosCarrito: Locator

    constructor(readonly page: Page) {
        this.page = page
        this.productosCarrito = page.locator('.cart_item')
        
    }
    async obtenerProductosCarrito(){
        let productos = await this.productosCarrito.all()
        return productos.length

    }
    async precioPruductosCarrito(indice:number){
        let productos = await this.productosCarrito.all()
        let producto = productos[indice]
        let precio = producto.locator('div[data-test="inventory-item-price"]').innerText()
        return precio
    }
    async irAlCheckout(){
        await this.page.getByRole('button', {name: "Checkout"}).click()
    }

}