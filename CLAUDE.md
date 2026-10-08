# CLAUDE.md — Veikartet (karriereveileder)

Gratis karriereveileder på nett, på norsk (bokmål). Brukeren går et «veikart»:
ett veiskille (spørsmål) om gangen, og ser underveis hvilke yrker som passer.

## Kommandoer

```bash
npm run dev     # utviklingsserver
npm run check   # lint + typecheck + test + build (skal være grønt før push)
```

## Struktur

- `src/data/questions.ts`: veiskillene. Først fagfelt (`FIELDS`, overordnet),
  så en konkret retning i feltet (spørsmålet har feltets id), så resten.
  `weight` styrer hvor mye et svar teller; `neutral` («Begge deler», «Vet ikke»)
  teller aldri; `showIf` gjør et spørsmål til en sidevei etter et bestemt valg.
- `src/data/checks.ts` + `src/logic/check.ts`: «Finn avviket» etter resultatet.
  Brukeren sier hva som var feil, får konkrete kontrollspørsmål om de samme
  veiskillene, og der svaret spriker, byttes svaret (kan angres).
- `src/data/careers.ts`: yrker med `fits` (spørsmål → valg som passer). Et spørsmål
  yrket ikke nevner, regnes som ikke-treff.
- `src/logic/route.ts` (ren, testet): ruten, neste veiskille, rangering.
- `src/logic/storage.ts`: svarene lagres i `localStorage` (try/catch).
- `src/components/`: `RouteMap` (kartet), `Crossroad` (spørsmålet), `Destinations`
  (nærmeste yrker og resultat).

## Regler

- Statisk side uten server og uten sporing; ingen persondata forlater nettleseren.
- Fonter er selvhostet via `@fontsource` (ikke Google Fonts, av personvernhensyn).
- Farger er tokens i `:root` i `src/styles.css`, med lys og mørk variant:
  13-0442 TCX (Green Glow) og 1810 burgunder, pluss én lys farge per fagfelt (`data-tint`).
- Yrkesdata er forenklet; legg til yrker ved å legge til en oppføring i `careers.ts`
  (testen sjekker at alle spørsmål/valg finnes).
- Kommentarer i koden på engelsk, tekst i UI på norsk.
