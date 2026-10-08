# CLAUDE.md — Veikartet (karriereveileder)

Gratis karriereveileder på nett, på norsk (bokmål). Brukeren går et «veikart»:
ett veiskille (spørsmål) om gangen, og ser til slutt hvilke yrker som passer.
Ingen forhåndsvisning av yrker underveis: den påvirker svarene (brukerens ønske).

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
- `src/data/guides.ts` + `src/logic/guidance.ts`: «Veien videre» per yrke (åpnes fra
  resultatet): konkrete roller, egne rollekombinasjoner, veien dit etter utdanning,
  skille seg ut, studielenker, hvem man bør kontakte (etter stilling) med meldingsmal,
  bedrifter og forslag til LinkedIn-innlegg. Ingenting sendes til LinkedIn: bare søk,
  tekst å kopiere og en knapp til LinkedIn. Ingen sjekklister (brukerens ønske).
- `src/components/Landing.tsx`: forsiden; `icons.tsx`: ikonene i kartet (lucide-react).
- `src/data/careers.ts`: yrker med `fits` (spørsmål → valg som passer). Et spørsmål
  yrket ikke nevner, regnes som ikke-treff.
- `src/logic/route.ts` (ren, testet): ruten, neste veiskille, rangering.
- `src/logic/storage.ts`: svarene lagres i `localStorage` (try/catch).
- `src/components/`: `RouteMap` (kartet), `Crossroad` (spørsmålet), `Destinations`
  (yrkene i resultatet).

## Regler

- Statisk side uten server og uten sporing; ingen persondata forlater nettleseren.
- Fonter er selvhostet via `@fontsource` (ikke Google Fonts, av personvernhensyn).
- Farger: KUN hvit, Pantone 15-4030 TCX Chambray Blue (#9eb4d3) og 19-2118 TCX
  Winetasting (#492a34), pluss aksentfargen `--sky` (#bbcae0), én nyanse lysere
  enn Chambray: tekst på knapper, ikoner, merkelapper og overskrifter i mørk modus.
  Linjer og dempet tekst er blandinger av disse, aldri nye farger. Tokens i `:root` i `src/styles.css`; mørk variant bytter om de samme tre.
- Yrkesdata er forenklet; legg til yrker ved å legge til en oppføring i `careers.ts`
  (testen sjekker at alle spørsmål/valg finnes).
- Kommentarer i koden på engelsk, tekst i UI på norsk.
