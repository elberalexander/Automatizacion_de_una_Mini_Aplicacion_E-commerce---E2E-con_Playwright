import { Page, Locator } from '@playwright/test'

export class ProductosPages {

    readonly inventario: Locator
    

    constructor(readonly page: Page) {
        this.page = page
        this.inventario = page.locator('.inventory_item')
        
    }
    async seleccionarProducto(indice:number){
        let productos = await this.inventario.all()
        let producto = productos[indice]
        await producto.getByRole('button',{name:'Add to cart' }).click()
    }
   
    //-----
    async quitarUnProducto(indice:number){
        let productos = await this.inventario.all()
        let producto = productos[indice]
        await producto.getByRole('button',{name:'Remove' }).click()
    }
    async obtenerProductosAgregados(){
        return await this.page.locator('span[data-test="shopping-cart-badge"]').innerText()
    }
    async obtenerCantidadProductosEnCarrito(): Promise<number> {
        const cantidadElementosActual = this.page.locator('span[data-test="shopping-cart-badge"]');    
        if (await cantidadElementosActual.count() > 0) {
            const texto = await cantidadElementosActual.innerText();
            return parseInt(texto);
        } else {
            return 0;
        }
    }
    
    async irAlCarrito(){
        await this.page.locator('a[data-test="shopping-cart-link"]').click()
    }

    
}

