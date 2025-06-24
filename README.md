
# Automatización de una Mini Aplicación E-commerce - E2E con Playwright

## Descripción del Proyecto

Este proyecto tiene como objetivo automatizar los flujos End-to-End (E2E) de la aplicación SauceDemo utilizando Playwright.  
Se aplican buenas prácticas de automatización, incluyendo el uso de Page Object Model (POM), fixtures, hooks y generación de reportes.

---

## ¿Qué es Playwright?

Playwright es un framework de automatización de pruebas desarrollado por Microsoft que permite la prueba de aplicaciones web en múltiples navegadores como Chrome, Firefox y Safari.  
Soporta pruebas en paralelo, ejecución en modo headless y generación de trazas para depuración.

---

## Configuración del Proyecto

### Primeros pasos e instalación de dependencias

Para ejecutar este proyecto:

1. Descarga la carpeta del repositorio y ábrela en **Visual Studio Code**.
2. Abre la consola y ejecuta:

   ```bash
   npm init playwright@latest
   ```

3. Selecciona **TypeScript** cuando se te pregunte el tipo de proyecto.
4. Escribe `test` como nombre de la carpeta donde están las pruebas (según la estructura del proyecto).
5. A la pregunta sobre agregarlo a GitHub, responde `false`.
6. A la pregunta sobre instalar navegadores, responde `true`.
7. Cuando pregunte si deseas sobrescribir la carpeta, responde `no`.
8. Se instalarán los paquetes necesarios y el entorno estará listo.

---

## Uso

### Ejecutar todas las pruebas:

```bash
npx playwright test
```

### Ejecutar una prueba específica (por ejemplo, login):

```bash
npx playwright test tests/specs/login.spec.ts
```

---

## Características

- Automatización E2E
- Validaciones dinámicas
- Uso de fixtures personalizados
- Hooks `beforeEach` y `afterEach`
- Soporte para múltiples navegadores (Chromium, Firefox)
- Capturas automáticas al fallar
- Generación de reportes HTML

---

## Estructura del Proyecto

```
RETOFINAL/
├── node_modules/
├── playwright-report/
│   └── index.html
├── test-results/
├── tests/
│   ├── fixture/
│   │   └── loginFixture.ts
│   ├── pages/
│   │   ├── CarritoPages.ts
│   │   ├── CheckoutStepOne.ts
│   │   ├── CheckoutStepTwo.ts
│   │   ├── CompraExitosPages.ts
│   │   ├── LoginPages.ts
│   │   ├── LoginValidacionRestricciones.ts
│   │   └── ProductosPages.ts
│   └── specs/
│       ├── escenariosAlternosE2E1.spec.ts
│       ├── inicioDeSesion.spec.ts
│       ├── login.spec.ts
│       └── LoginValidaciónDeRestriccionesDeUsuario.spec.ts
├── tests-examples/
│   └── demo-todo-app.spec.ts
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── storageState.json
<<<<<<< HEAD
```

---

## Reportes HTML

Se genera un reporte en la carpeta `playwright-report/` accesible desde el navegador abriendo `index.html`.

---

## Autor

**Ing. Elber Alexander Ponguta Fernandez**
=======
Reportes HTML

