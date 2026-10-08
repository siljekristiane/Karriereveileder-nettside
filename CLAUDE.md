# CLAUDE.md — Veikartet (karriereveileder)

Gratis karriereveileder på nett, på norsk (bokmål). Brukeren går et «veikart»:
ett veiskille (spørsmål) om gangen, og ser underveis hvilke yrker som passer.

## Kommandoer

```bash
npm run dev     # utviklingsserver
npm run check   # lint + typecheck + test + build (skal være grønt før push)
```

## Struktur

- `src/data/questions.ts`: veiskillene. `weight` styrer hvor mye et svar teller;
  `neutral` («Begge deler», «Vet ikke») teller aldri; `showIf` gjør et spørsmål
  til en sidevei som bare vises etter et bestemt valg.
- `src/data/careers.ts`: yrker med `fits` (spørsmål → valg som passer). Et spørsmål
  yrket ikke nevner, regnes som ikke-treff.
- `src/logic/route.ts` (ren, testet): ruten, neste veiskille, rangering.
- `src/logic/storage.ts`: svarene lagres i `localStorage` (try/catch).
- `src/components/`: `RouteMap` (kartet), `Crossroad` (spørsmålet), `Destinations`
  (nærmeste yrker og resultat).

## Regler

- Statisk side uten server og uten sporing; ingen persondata forlater nettleseren.
- Fonter er selvhostet via `@fontsource` (ikke Google Fonts, av personvernhensyn).
- Farger er tokens i `:root` i `src/styles.css`, med lys og mørk variant.
- Yrkesdata er forenklet; legg til yrker ved å legge til en oppføring i `careers.ts`
  (testen sjekker at alle spørsmål/valg finnes).
- Kommentarer i koden på engelsk, tekst i UI på norsk.
