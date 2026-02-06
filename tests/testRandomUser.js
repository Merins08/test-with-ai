const { test, expect } = require('@playwright/test');

// TEST CASE 1 — Navigazione tra gli utenti
test('TC_NAV_01: Verifica funzionamento pulsanti di navigazione (Avanti/Indietro)', async ({ page }) => {
  // Precondizioni: caricamento di N utenti tramite slider
  await page.goto('/'); // Navigare alla pagina
  
  // Caricare un numero di utenti tramite slider
  const slider = await page.locator('[data-testid="user-slider"]'); // Adatta il selettore
  await slider.fill('5'); // Caricare 5 utenti
  
  // Paso 1: Cliccare sul pulsante Avanti
  const nextButton = page.locator('button:has-text("Avanti")');
  const userDisplay = page.locator('[data-testid="user-display"]'); // Selettore dell'utente visualizzato
  const initialUser = await userDisplay.textContent();
  
  await nextButton.click();
  const secondUser = await userDisplay.textContent();
  expect(secondUser).not.toBe(initialUser); // Verifica che l'utente sia cambiato
  
  // Passo 2: Ripetere fino a raggiungere l'ultimo utente
  let clickCount = 1;
  while (await nextButton.isEnabled()) {
    await nextButton.click();
    clickCount++;
  }
  
  // Passo 3: Verificare che il pulsante Avanti si disabiliti all'ultimo elemento
  await expect(nextButton).toBeDisabled();
  
  // Passo 4: Cliccare sul pulsante Indietro
  const backButton = page.locator('button:has-text("Indietro")');
  const lastUser = await userDisplay.textContent();
  
  await backButton.click();
  const previousUser = await userDisplay.textContent();
  expect(previousUser).not.toBe(lastUser); // Verifica che l'utente sia cambiato
  
  // Passo 5: Ripetere fino a tornare al primo utente
  while (await backButton.isEnabled()) {
    await backButton.click();
  }
  
  // Passo 6: Verificare che il pulsante Indietro si disabiliti al primo elemento
  await expect(backButton).toBeDisabled();
});

// TEST CASE 2 — Selezione delle nazioni
test('TC_NAT_01: Verifica filtro per nazionalità tramite checkbox', async ({ page }) => {
  // Precondizioni: caricamento della pagina
  await page.goto('/');
  
  // Passo 1: Selezionare una singola nazione (es. Italia)
  const italyCheckbox = page.locator('input[value="it"]'); // Adatta il selettore
  await italyCheckbox.check();
  
  // Caricare gli utenti
  const loadButton = page.locator('button:has-text("Carica")'); // Adatta il selettore
  await loadButton.click();
  
  // Passo 2: Verificare che ogni utente generato abbia la nazionalità selezionata
  const userNationality = page.locator('[data-testid="user-nationality"]'); // Selettore della nazionalità
  const nationality = await userNationality.textContent();
  expect(nationality).toContain('Italy'); // Adatta secondo il formato
  
  // Passo 3: Selezionare più nazioni contemporaneamente (es. Italia + Germania + Brasile)
  await italyCheckbox.uncheck();
  const germanyCheckbox = page.locator('input[value="de"]');
  const brazilCheckbox = page.locator('input[value="br"]');
  
  await italyCheckbox.check();
  await germanyCheckbox.check();
  await brazilCheckbox.check();
  
  await loadButton.click();
  
  // Passo 4: Controllare che ogni utente appartenga a una delle nazioni selezionate
  const userNationals = await page.locator('[data-testid="user-nationality"]').allTextContents();
  userNationals.forEach(nat => {
    expect(['Italy', 'Germany', 'Brazil']).toContain(nat); // Adatta secondo il formato
  });
  
  // Passo 5: Tentare di selezionare più volte la stessa nazione
  await italyCheckbox.check(); // Già selezionata
  const isChecked = await italyCheckbox.isChecked();
  expect(isChecked).toBe(true); // Verifica che il comportamento sia coerente
});

// TEST CASE 3 — Selezione del genere
test('TC_GEN_01: Verifica filtro per genere (male / female / all)', async ({ page }) => {
  // Precondizioni: caricamento della pagina
  await page.goto('/');
  
  // Passo 1: Selezionare male
  const maleRadio = page.locator('input[value="male"]');
  await maleRadio.click();
  
  // Caricare gli utenti
  const loadButton = page.locator('button:has-text("Carica")'); // Adatta il selettore
  await loadButton.click();
  
  // Passo 2: Verificare che tutti gli utenti generati siano di genere maschile
  const userGender = page.locator('[data-testid="user-gender"]'); // Selettore del genere
  const genders = await userGender.allTextContents();
  genders.forEach(gender => {
    expect(gender.toLowerCase()).toContain('male'); // Adatta secondo il formato
  });
  
  // Passo 3: Selezionare female
  const femaleRadio = page.locator('input[value="female"]');
  await femaleRadio.click();
  await loadButton.click();
  
  // Passo 4: Verificare che tutti gli utenti generati siano di genere femminile
  const femaleGenders = await userGender.allTextContents();
  femaleGenders.forEach(gender => {
    expect(gender.toLowerCase()).toContain('female'); // Adatta secondo il formato
  });
  
  // Passo 5: Selezionare all
  const allRadio = page.locator('input[value="all"]');
  await allRadio.click();
  await loadButton.click();
  
  // Passo 6: Verificare che vengano generati utenti di entrambi i generi
  const mixedGenders = await userGender.allTextContents();
  const hasMale = mixedGenders.some(gender => gender.toLowerCase().includes('male'));
  const hasFemale = mixedGenders.some(gender => gender.toLowerCase().includes('female'));
  expect(hasMale && hasFemale).toBe(true);
  
  // Verificare che sia un radio button (scelta esclusiva)
  expect(await maleRadio.isChecked()).toBe(false);
  expect(await femaleRadio.isChecked()).toBe(false);
  expect(await allRadio.isChecked()).toBe(true);
});
