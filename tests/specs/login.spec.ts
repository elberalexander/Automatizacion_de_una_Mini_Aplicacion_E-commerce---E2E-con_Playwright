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
    
    //test.use( { storageState: 'storageState.json'});

    test("login, inicio de sesion", async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce')
        await productoPage.seleccionarProducto(0)
        await productoPage.seleccionarProducto(1)
        expect (await productoPage.obtenerProductosAgregados()).toBe("2")
        await productoPage.irAlCarrito()
        console.log(await carritoPages.obtenerProductosCarrito())
        expect(await carritoPages.obtenerProductosCarrito()).toBe(2)
        expect(await carritoPages.precioPruductosCarrito(0)).toBe('$29.99')
        expect(await carritoPages.precioPruductosCarrito(1)).toBe('$9.99')
        await carritoPages.irAlCheckout()
        await checkoutStepOne.llenarFormulario('Elber', 'ponguta','80724')
        expect((await checkoutStepTwo.mostrarInformacion()).subtotal).toBe("Item total: $39.98")
        expect((await checkoutStepTwo.mostrarInformacion()).impuesto).toBe('Tax: $3.20')
        expect((await checkoutStepTwo.mostrarInformacion()).total).toBe('Total: $43.18')
        await checkoutStepTwo.finishCompra()
        expect(await compraExitosPages.mostrarInformacion()).toBe('Thank you for your order!')
        await page.screenshot({ path: 'login, inicio de sesion.png', fullPage: true });

    });
    //---------------------------------------------------------
    test("Inicio de sesion", async ({ browser }) => {
               
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.waitForTimeout(10000);//esperar 5 segundos
    await page.pause;   
    await loginPage.login('standard_user', 'secret_sauce')
    await page.pause;
    await context.storageState( { path: 'storageState.json' } );
    await page.screenshot({ path: 'Inicio de sesion.png', fullPage: true });
    await context.close();
    });
    //-----------------
    test.use( { storageState: 'storageState.json'}); 
    test("Agregar productos al carrito", async ({ page }) => {           
        await productoPage.seleccionarProducto(0)
        await productoPage.seleccionarProducto(1)
        expect (await productoPage.obtenerProductosAgregados()).toBe("2")
        await productoPage.irAlCarrito()
        await page.screenshot({ path: 'Agregar productos al carrito.png', fullPage: true });
    });

});