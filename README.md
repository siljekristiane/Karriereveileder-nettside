# Veikartet – gratis karriereveileder

En gratis karriereveileder på nett. Du velger først et fagfelt og en konkret
retning i det, og går så resten av veikartet ett veiskille om gangen (team
eller alene? stor eller liten bedrift? inne eller ute? …). Til slutt ser du
hvilke yrker som passer, og du kan når som helst trykke på et punkt på
kartet og velge en annen vei. Passer ikke forslagene, finner «Finn avviket»
ut hvor veien tok av, med nye kontrollspørsmål, uten at du mister valgene dine.

Ingen innlogging, ingen server: alt kjører i nettleseren, og svarene lagres
bare lokalt hos brukeren.

## Kom i gang

```bash
npm install
npm run dev      # http://localhost:5173
npm run check    # lint + typesjekk + tester + bygg
```

## Publisering

Hver push til `main` bygges og publiseres til GitHub Pages
(`.github/workflows/ci.yml`). Første gang: Settings → Pages → Source:
**GitHub Actions**.

## Innhold

- `src/data/questions.ts` – veiskillene (spørsmål og valg, sideveier med `showIf`)
- `src/data/careers.ts` – yrkene, og hvilke valg som passer hvert yrke
- `src/logic/route.ts` – hvilke veiskiller som er på ruten, og rangering av yrker
