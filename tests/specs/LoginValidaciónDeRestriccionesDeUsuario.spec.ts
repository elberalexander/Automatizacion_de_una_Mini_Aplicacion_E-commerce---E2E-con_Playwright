import { test,expect} from '../fixture/loginFixture';


test.describe("Login con validacion de restricciones", () => {

    test('intentar login sin ingresar usuario', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.login('', 'secret_sauce');              
        // puedes validar con expect si estás en la página de productos
        await loginValidacionRestricciones.validarErrorUsuarioNoIngresado();
        await page.screenshot({ path: 'intentar login sin ingresar usuario.png', fullPage: true });
      });

    test('intentar login sin ingresar password', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.login('standard_user', ''); 
        await loginValidacionRestricciones.validarErrorPasswordNoIngresado();
        await page.screenshot({ path: 'intentar login sin ingresar password.png', fullPage: true });
      });
    test('intentar login sin completar campos', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.login('',''); 
        await loginValidacionRestricciones.validarErrorcamposNoIngresados();
        await page.screenshot({ path: 'intentar login sin completar campos.png', fullPage: true });
      });
    test('Login con usuario válido (standard_user) y validar redirección a la lista de productos.', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.login('standard_user','secret_sauce');              
        await loginValidacionRestricciones.ValidarAccesoListaDeProductos();
        await page.screenshot({ path: 'Login con usuario válido (standard_user) y validar redirección a la lista de productos.png', fullPage: true });
      });
    test('Hacer logout y validar redirección al login.', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.login('standard_user','secret_sauce');              
        await loginValidacionRestricciones.ValidarAccesoListaDeProductos();
        await loginValidacionRestricciones.AccederMenu();
        await loginValidacionRestricciones.HacerLogout();
        await loginValidacionRestricciones.ReDireccionAlLogin();
        await page.screenshot({ path: 'Hacer logout y validar redirección al login.png', fullPage: true });
        //await page.pause();
      }); 
 //------------Escenarios alternos E2E2-----------------      
    test('Validar comportamiento si se ingresan credenciales incorrectas', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.login('usuarioNoExistente).','secret_sauce');              
        await loginValidacionRestricciones.UsuarioInexistente();
        await page.screenshot({ path: 'Validar comportamiento si se ingresan credenciales incorrectas.png', fullPage: true });
        //await page.pause();
      });    
    test('Validar que no se puede acceder a rutas internas, sin autenticacion', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.IntentarAccederSinLogin(page);
        await page.screenshot({ path: 'Validar que no se puede acceder a rutas internas, sin autenticacion.png', fullPage: true });
        //await page.pause();
      }); 

    test('Intentar ir a una URL, sin autenticacion, la url va como argumento', async ({ loginValidacionRestricciones,page }) => {
        await loginValidacionRestricciones.Sinlogin(page,'https://www.saucedemo.com/cart.html '); 
        await page.screenshot({ path: 'Intentar ir a una URL, sin autenticacion, la url va como argumento.png', fullPage: true });
        
       // await page.pause();
      });     
    
});




