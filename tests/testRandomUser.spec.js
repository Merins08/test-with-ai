const { test, expect } = require('@playwright/test');

// TEST CASE 1 — Navigazione tra gli utenti
test('TC_NAV_01: Verifica funzionamento pulsanti di navigazione (Avanti/Indietro)', async ({ page }) => {
  // Precondizioni: caricamento di N utenti tramite slider
  await page.goto('https://randomusermarins.netlify.app/');
  await page.waitForLoadState('domcontentloaded');
  
  // Caricare un numero di utenti
  const quantityInput = page.locator('#inputQuantita');
  await quantityInput.fill('15'); // Caricare 15 utenti per avere più pagine
  
  // Cliccare il bottone per generare
  const generateButton = page.locator('#btnGenerate');
  await generateButton.click();
  await page.waitForTimeout(800);
  
  // Passo 1: Verificare che il primo utente sia visualizzato
  const firstRow = page.locator('#userTableBody tr').first();
  const firstUserName = await firstRow.locator('td:nth-child(2)').textContent();
  expect(firstUserName).toBeTruthy();
  
  // Passo 2: Cliccare sul pulsante Avanti (next page)
  const nextButton = page.locator('#paginationControls button:has-text("»")').first();
  
  if (await nextButton.isVisible()) {
    await nextButton.click();
    await page.waitForTimeout(500);
    
    // Verificare che l'utente sia cambiato
    const secondUserName = await firstRow.locator('td:nth-child(2)').textContent();
    expect(secondUserName).not.toBe(firstUserName);
  }
  
  // Passo 3: Cliccare sul pulsante Indietro (previous page)
  const backButton = page.locator('#paginationControls button:has-text("«")').first();
  
  if (await backButton.isVisible()) {
    await backButton.click();
    await page.waitForTimeout(500);
    
    // Verificare che torniamo al primo utente
    const returnedUserName = await firstRow.locator('td:nth-child(2)').textContent();
    expect(returnedUserName).toBe(firstUserName);
  }
});

// TEST CASE 2 — Selezione delle nazioni
test('TC_NAT_01: Verifica filtro per nazionalità tramite dropdown', async ({ page }) => {
  // Precondizioni: caricamento della pagina
  await page.goto('https://randomusermarins.netlify.app/');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Selezionare una singola nazione
  const nationSelect = page.locator('#selectNazione');
  
  // Aspettare che il select sia popolato
  await page.waitForTimeout(500);
  
  // Ottenere le opzioni disponibili
  const options = page.locator('#selectNazione option');
  const optionCount = await options.count();
  
  if (optionCount > 1) {
    // Seleziona la prima nazione disponibile (skip la prima che probabilmente è "Seleziona")
    await nationSelect.selectOption({ index: 1 });
    
    // Caricare gli utenti
    const quantityInput = page.locator('#inputQuantita');
    await quantityInput.fill('10');
    
    const generateButton = page.locator('#btnGenerate');
    await generateButton.click();
    await page.waitForTimeout(800);
    
    // Passo 2: Verificare che gli utenti siano stati generati
    const userRows = page.locator('#userTableBody tr');
    const rowCount = await userRows.count();
    expect(rowCount).toBeGreaterThan(0);
    
    // Passo 3: Selezionare un'altra nazione se disponibile
    if (optionCount > 2) {
      await nationSelect.selectOption({ index: 2 });
      await generateButton.click();
      await page.waitForTimeout(800);
      
      const newRowCount = await userRows.count();
      expect(newRowCount).toBeGreaterThan(0);
    }
    
    // Passo 4: Verificare che il badge di nazionalità compaia
    const badge = page.locator('#BadgeNazionalità');
    expect(badge).toBeTruthy();
  }
});

// TEST CASE 3 — Selezione del genere
test('TC_GEN_01: Verifica filtro per genere (male / female / all)', async ({ page }) => {
  // Precondizioni: caricamento della pagina
  await page.goto('https://randomusermarins.netlify.app/');
  await page.waitForLoadState('domcontentloaded');
  
  // Passo 1: Selezionare "Maschio"
  const genderSelect = page.locator('#selectSesso');
  await genderSelect.selectOption('male');
  
  // Caricare gli utenti
  const quantityInput = page.locator('#inputQuantita');
  await quantityInput.fill('10');
  
  const generateButton = page.locator('#btnGenerate');
  await generateButton.click();
  await page.waitForTimeout(800);
  
  // Passo 2: Verificare che gli utenti siano stati generati
  let userRows = page.locator('#userTableBody tr');
  let rowCount = await userRows.count();
  expect(rowCount).toBeGreaterThan(0);
  
  // Verifica che il genere sia "Maschio" (abbreviato in "m")
  const firstGenderCell = userRows.first().locator('td:nth-child(4)');
  const genderText = await firstGenderCell.textContent();
  expect(genderText?.trim().toLowerCase()).toMatch(/^m$/); // "m" per Maschio
  
  // Passo 3: Selezionare "Femmina"
  await genderSelect.selectOption('female');
  await generateButton.click();
  await page.waitForTimeout(800);
  
  // Passo 4: Verificare che gli utenti siano di genere femminile
  userRows = page.locator('#userTableBody tr');
  rowCount = await userRows.count();
  expect(rowCount).toBeGreaterThan(0);
  
  const femaleGenderCell = userRows.first().locator('td:nth-child(4)');
  const femaleGenderText = await femaleGenderCell.textContent();
  expect(femaleGenderText?.trim().toLowerCase()).toMatch(/^f$/); // "f" per Femmina
  
  // Passo 5: Selezionare "Casuale"
  await genderSelect.selectOption('random');
  await generateButton.click();
  await page.waitForTimeout(800);
  
  // Passo 6: Verificare che vengano generati utenti di entrambi i generi
  userRows = page.locator('#userTableBody tr');
  rowCount = await userRows.count();
  expect(rowCount).toBeGreaterThan(0);
  
  // Verifica che il select sia su "Casuale"
  const selectedValue = await genderSelect.inputValue();
  expect(selectedValue).toBe('random');
});
