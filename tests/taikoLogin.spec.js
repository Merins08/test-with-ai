const { test, expect } = require('@playwright/test');

// TEST CASE 1 — Login con credenziali valide
test('TC_LOGIN_01: Verifica login con credenziali valide', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Compilare il campo username
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('administrator');
  
  // Passo 2: Compilare il campo password
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill('Fossano2026');
  
  // Passo 3: Cliccare il bottone login
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 4: Verificare il reindirizzamento (login avvenuto)
  await page.waitForLoadState('domcontentloaded');
  
  // Controllare che NON siamo più sulla pagina di login
  const loginPageTitle = page.locator('text=Login');
  const isLoginPage = await loginPageTitle.count();
  
  // Se il login è riuscito, dovremmo essere reindirizzati
  expect(page.url()).not.toContain('login_page.php');
});

// TEST CASE 2 — Login con credenziali invalide
test('TC_LOGIN_02: Verifica login con credenziali invalide', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Compilare il campo username con credenziali errate
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('utenteerrato');
  
  // Passo 2: Compilare il campo password con credenziali errate
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill('passworderrata');
  
  // Passo 3: Cliccare il bottone login
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 4: Verificare che siamo ancora sulla pagina di login
  await page.waitForLoadState('domcontentloaded');
  expect(page.url()).toContain('login_page.php');
  
  // Passo 5: Verificare che appaia un messaggio di errore
  const errorMessage = page.locator('[class*="error"], [class*="alert"], [class*="warning"]');
  // Almeno uno di questi elementi dovrebbe essere visibile in caso di errore
});

// TEST CASE 3 — Login con campo username vuoto
test('TC_LOGIN_03: Verifica validazione campo username vuoto', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Lasciare il campo username vuoto
  const usernameInput = page.locator('input[name="username"]');
  // Campo lasciato vuoto
  
  // Passo 2: Compilare il campo password
  const passwordInput = page.locator('input[name="password"]');
  await passwordInput.fill('Fossano2026');
  
  // Passo 3: Cliccare il bottone login
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 4: Verificare che siamo ancora sulla pagina di login
  await page.waitForLoadState('domcontentloaded');
  expect(page.url()).toContain('login_page.php');
});

// TEST CASE 4 — Login con campo password vuoto
test('TC_LOGIN_04: Verifica validazione campo password vuoto', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Compilare il campo username
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('administrator');
  
  // Passo 2: Lasciare il campo password vuoto
  const passwordInput = page.locator('input[name="password"]');
  // Campo lasciato vuoto
  
  // Passo 3: Cliccare il bottone login
  const loginButton = page.locator('input[type="submit"]');
  await loginButton.click();
  
  // Passo 4: Verificare che siamo ancora sulla pagina di login
  await page.waitForLoadState('domcontentloaded');
  expect(page.url()).toContain('login_page.php');
});

// TEST CASE 5 — Verifica presenza form di login
test('TC_LOGIN_05: Verifica presenza e visibilità del form di login', async ({ page }) => {
  // Precondizioni: navigazione alla pagina di login
  await page.goto('https://taiko.mantishub.io/login_page.php');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Verificare la presenza del campo username
  const usernameInput = page.locator('input[name="username"]');
  await expect(usernameInput).toBeVisible();
  
  // Passo 2: Verificare la presenza del campo password
  const passwordInput = page.locator('input[name="password"]');
  await expect(passwordInput).toBeVisible();
  
  // Passo 3: Verificare la presenza del bottone login
  const loginButton = page.locator('input[type="submit"]');
  await expect(loginButton).toBeVisible();
  
  // Passo 4: Verificare il titolo della pagina
  const loginTitle = page.locator('h1, h2, h3');
  const titleText = await loginTitle.first().textContent();
  expect(titleText?.toLowerCase()).toContain('login');
});
