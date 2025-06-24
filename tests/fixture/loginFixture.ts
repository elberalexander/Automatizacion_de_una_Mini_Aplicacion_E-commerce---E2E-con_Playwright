// loginFixture.spec.ts
import { test as base, Page,expect } from '@playwright/test';
//import { LoginValidacionRestricciones } from '../pages/LoginValidacionRestricciones';
import { LoginValidacionRestricciones } from '../pages/LoginValidacionRestricciones';




const test = base.extend<{
  loginValidacionRestricciones: LoginValidacionRestricciones;
}>({
  loginValidacionRestricciones: async ({ page }, use) => {
    const loginValidacionRestricciones = new LoginValidacionRestricciones(page);
    await page.goto('https://www.saucedemo.com/'); // asegúrate de ir a la ruta de login
    await use(loginValidacionRestricciones);
  },
});

export { test,expect };