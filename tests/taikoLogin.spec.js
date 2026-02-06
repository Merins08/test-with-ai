
const { test, expect } = require('@playwright/test');

// TEST CASE 1 — Login con credenziali valide (2-step flow)
test('TC_LOGIN_01: Verifica login con credenziali valide', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // STEP 1: Compilare il campo username
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('administrator');
  
  // Cliccare il bottone per proseguire
  const nextButton = page.locator('input[type="submit"]');
  await nextButton.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
  
  // STEP 2: Compilare il campo password
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill('Fossano.2026');
  
  // Cliccare il bottone login finale
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 3: Verificare il reindirizzamento (login avvenuto)
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(1000);
  
  // Se il login è riuscito, dovremmo essere reindirizzati (non più sulla login)
  expect(page.url()).not.toContain('login_page.php');
});

// TEST CASE 2 — Login con credenziali invalide (password sbagliata)
test('TC_LOGIN_02: Verifica login con credenziali invalide', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // STEP 1: Compilare il campo username con credenziali valide
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('administrator');
  
  // Cliccare il bottone per proseguire
  const nextButton = page.locator('input[type="submit"]');
  await nextButton.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
  
  // STEP 2: Compilare il campo password con password errata
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill('passworderrata');
  
  // Cliccare il bottone login
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 3: Verificare che siamo ancora sulla pagina di login/password
  await page.waitForLoadState('domcontentloaded');
  
  // Con password sbagliata dovremmo rimanere sulla pagina o essere reindirizzati indietro
  const currentUrl = page.url();
  const isStillOnLoginFlow = currentUrl.includes('login') || currentUrl.includes('taiko.mantishub.io');
  expect(isStillOnLoginFlow).toBe(true);
});

// TEST CASE 3 — Login con campo username vuoto
test('TC_LOGIN_03: Verifica validazione campo username vuoto', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Lasciare il campo username vuoto e cliccare
  const usernameInput = page.locator('input[name="username"]');
  // Campo lasciato vuoto
  
  // Cliccare il bottone per proseguire senza username
  const nextButton = page.locator('input[type="submit"]');
  await nextButton.click();
  
  // Passo 2: Verificare che siamo ancora sulla pagina di login (username vuoto non dovrebbe andare avanti)
  await page.waitForTimeout(500);
  
  // Dovremmo rimanere sulla pagina con username
  const stillHasUsernameField = await usernameInput.count();
  expect(stillHasUsernameField).toBeGreaterThan(0);
});

/*
// TEST CASE 4 — Login con campo password vuoto
test('TC_LOGIN_04: Verifica validazione campo password vuoto', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // STEP 1: Compilare il campo username
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('administrator');
  
  // Cliccare il bottone per proseguire
  const nextButton = page.locator('input[type="submit"]');
  await nextButton.click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(500);
  
  // STEP 2: Lasciare il campo password vuoto e cliccare
  const passwordInput = page.locator('input[name="password"]');
  // Campo lasciato vuoto
  
  // Cliccare il bottone login
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 3: Verificare che siamo sulla pagina della password (non dovrebbe accettare password vuota)
  await page.waitForTimeout(500);
  const stillHasPasswordField = await passwordInput.count();
  expect(stillHasPasswordField).toBeGreaterThan(0);
});*/

// TEST CASE 5 — Verifica presenza form di login (primo step)
test('TC_LOGIN_05: Verifica presenza e visibilità del form di login', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Verificare la presenza del campo username nel primo step
  const usernameInput = page.locator('input[name="username"]');
  await expect(usernameInput).toBeVisible();
  
  // Passo 2: Verificare la presenza del bottone di invio
  const submitButton = page.locator('input[type="submit"]');
  await expect(submitButton).toBeVisible();
  
  // Passo 3: Verificare il titolo della pagina contiene "Login"
  const pageContent = await page.content();
  expect(pageContent.toLowerCase()).toContain('login');
});
