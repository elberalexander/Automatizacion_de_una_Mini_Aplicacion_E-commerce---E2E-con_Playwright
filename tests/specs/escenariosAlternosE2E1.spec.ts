import { test, expect } from "@playwright/test";
import {LoginPages} from '../pages/LoginPages'
import { ProductosPages} from "../pages/ProductosPages";
import {CarritoPages} from "../pages/CarritoPages";
import { CheckoutStepOne } from "../pages/CheckoutStepOne";
import { CheckoutStepTwo } from "../pages/CheckoutStepTwo";
import { CompraExitosPages } from "../pages/CompraExitosPages";



test.describe("", () => {
    
    let loginPage: LoginPages;
    let productoPage: ProductosPages;
    let carritoPages: CarritoPages;
    let checkoutStepOne: CheckoutStepOne;
    let checkoutStepTwo: CheckoutStepTwo;
    let compraExitosPages: CompraExitosPages;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPages(page)
        productoPage = new ProductosPages(page)
        carritoPages = new CarritoPages(page)
        checkoutStepOne = new CheckoutStepOne(page)
        checkoutStepTwo = new CheckoutStepTwo(page)
        compraExitosPages = new CompraExitosPages(page)
        await page.goto('')
    });    
    
    test("Validar que si se elimina un producto del carrito antes del checkout, el total cambia.", async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce')
        await productoPage.seleccionarProducto(0)
        await productoPage.seleccionarProducto(1)        
        expect (await productoPage.obtenerProductosAgregados()).toBe("2")
        const cantidadAntes=parseInt(await productoPage.obtenerProductosAgregados());
        
        await productoPage.irAlCarrito()
        console.log(await carritoPages.obtenerProductosCarrito())
        expect(await carritoPages.obtenerProductosCarrito()).toBe(2)
        let precio1=await carritoPages.precioPruductosCarrito(0);
        let precio2=await carritoPages.precioPruductosCarrito(1);
        await carritoPages.irAlCheckout()
        await checkoutStepOne.llenarFormulario('Elber', 'ponguta','123456')
        let subtotal1=expect((await checkoutStepTwo.mostrarInformacion()).subtotal).toBe("Item total: $39.98")
        expect((await checkoutStepTwo.mostrarInformacion()).impuesto).toBe('Tax: $3.20')
        expect((await checkoutStepTwo.mostrarInformacion()).total).toBe('Total: $43.18')
        await checkoutStepTwo.cancelCompra();   
        await productoPage.quitarUnProducto(1);
        const cantidadDespues = await productoPage.obtenerCantidadProductosEnCarrito();
        expect(cantidadDespues).toBeLessThan(cantidadAntes);
        await productoPage.irAlCarrito()
        await carritoPages.irAlCheckout()
        await checkoutStepOne.llenarFormulario('Elber', 'ponguta','123456')
        let subtotal2=expect((await checkoutStepTwo.mostrarInformacion()).subtotal)
        expect(subtotal2).not.toBe(subtotal1);
        //await page.pause();
        //----------
       // await checkoutStepTwo.finishCompra()
        //expect(await compraExitosPages.mostrarInformacion()).toBe('Thank you for your order!')
    });
    //---------------------------------------------------------
    test("Intentar acceder al checkout sin productos en el carrito.", async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce')              
        await productoPage.irAlCarrito() 
        await carritoPages.irAlCheckout()       
        await checkoutStepOne.llenarFormulario('Elber', 'ponguta','123456')
        await checkoutStepTwo.finishCompra()
        expect(await compraExitosPages.mostrarInformacion()).toBe('Thank you for your order!')
        //await page.pause();
    });
    test("Intentar acceder al checkout sin productos en el carrito y sin completar el formulario.", async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce')              
        await productoPage.irAlCarrito() 
        await carritoPages.irAlCheckout()       
        await checkoutStepOne.llenarFormulario('', 'ponguta','123456')
        await page.locator('[data-test="continue"]').click(); // Simula hacer clic sin llenar datos
        await checkoutStepOne.validarErrorFormularioRequerido();
        //await page.pause();
    }); 
});