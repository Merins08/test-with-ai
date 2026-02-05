Test RandomUser.me

1) Test dei pulsanti di navigazione?
    - Bottone avanti funziona
    - Bottone indietro funziona
    Cliccando sui diversi bottoni si aggiorna l'utente, i bottoni al raggiungomento della fine o del inizio si diasabilitano e non permettono di non andare avanti

2) Selezione delle nazioni?
    Andadno a selezionare più e diverse nazioni notiamo che sono stati generati utenti delle nazioni selezionate, inoltre andando a scegliere piu volte una nazione mi permette di selezionarla ?

3) Selezione del genere?
    La selezione di un genere mi va a generare utenti che rientrano nelle mie specifiche inoltre e possibile andare a selezionare più generi quindi andare a selezioanre tutti oppure no?

test scritti da Copilot (basandosi sul seguente sito -> https://vitolavecchia.altervista.org/testing-software-regole-e-criteri-per-progettare-test-case/)

TEST CASE 1 — Navigazione tra gli utenti
ID: TC_NAV_01
Titolo: Verifica funzionamento pulsanti di navigazione (Avanti/Indietro)
Obiettivo: Assicurarsi che i pulsanti consentano di scorrere correttamente gli utenti caricati e che vengano disabilitati ai limiti della lista.
Precondizioni:
- È stato effettuato un caricamento di N utenti tramite slider.
- La pagina mostra il primo utente della lista.
Passi operativi:
- Cliccare sul pulsante Avanti.
- Osservare se viene mostrato l’utente successivo.
- Ripetere fino a raggiungere l’ultimo utente.
- Verificare che il pulsante Avanti si disabiliti all’ultimo elemento.
- Cliccare sul pulsante Indietro.
- Osservare se viene mostrato l’utente precedente.
- Ripetere fino a tornare al primo utente.
- Verificare che il pulsante Indietro si disabiliti al primo elemento.
Risultato atteso:
- Ogni click aggiorna correttamente l’utente visualizzato.
- I pulsanti vengono disabilitati quando non è possibile proseguire oltre.
- Nessun errore o comportamento anomalo.

TEST CASE 2 — Selezione delle nazioni
ID: TC_NAT_01
Titolo: Verifica filtro per nazionalità tramite checkbox
Obiettivo: Controllare che la selezione di una o più nazioni generi utenti appartenenti esclusivamente alle nazionalità scelte.
Precondizioni:
- La pagina è caricata correttamente.
- Sono presenti almeno 5–6 nazioni selezionabili.
Passi operativi:
- Selezionare una singola nazione (es. Italia).
- Caricare gli utenti.
- Verificare che ogni utente generato abbia la nazionalità selezionata.
- Selezionare più nazioni contemporaneamente (es. Italia + Germania + Brasile).
- Caricare nuovamente gli utenti.
- Controllare che ogni utente appartenga a una delle nazioni selezionate.
- Tentare di selezionare più volte la stessa nazione e verificare che il comportamento sia coerente (checkbox non duplicabili).
Risultato atteso:
- Gli utenti generati appartengono solo alle nazioni selezionate.
- La selezione multipla funziona correttamente.
- Non è possibile selezionare due volte la stessa nazione.
- Nessun utente fuori filtro.

TEST CASE 3 — Selezione del genere
ID: TC_GEN_01
Titolo: Verifica filtro per genere (male / female / all)
Obiettivo: Assicurarsi che il filtro radio button generi utenti coerenti con il genere selezionato.
Precondizioni:
- La pagina è caricata correttamente.
- Sono presenti i radio button: male, female, all.
Passi operativi:
- Selezionare male.
- Caricare gli utenti.
- Verificare che tutti gli utenti generati siano di genere maschile.
- Selezionare female.
- Caricare gli utenti.
- Verificare che tutti gli utenti generati siano di genere femminile.
- Selezionare all.
- Caricare gli utenti.
- Verificare che vengano generati utenti di entrambi i generi.
Risultato atteso:
- Il filtro male restituisce solo utenti maschi.
- Il filtro female restituisce solo utenti femmine.
- Il filtro all restituisce utenti misti.
- Non è possibile selezionare più generi contemporaneamente (radio button → scelta esclusiva).
