# Veikartet – gratis karriereveileder

En gratis karriereveileder på nett. Du går et veikart ett veiskille om gangen
(team eller alene? stor eller liten bedrift? inne eller ute? …), og underveis
ser du hvilke yrker du nærmer deg. Noen valg åpner en sidevei med mer
presise spørsmål. Du kan når som helst trykke på et punkt på kartet og velge
en annen vei.

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
