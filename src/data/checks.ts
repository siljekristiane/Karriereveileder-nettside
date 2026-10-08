// The "find the detour" round after the results. Each check asks about a fork
// already on the route, but as a concrete situation. Its options map back to the
// fork's own options, so a different answer shows where the route went wrong.

export type CheckOption = { label: string; hint: string; value: string };

export type Check = {
  id: string;
  /** The question on the route this check tests. */
  target: string;
  text: string;
  options: CheckOption[];
};

/** What the user says was wrong with the suggestions. */
export type Complaint = {
  id: string;
  label: string;
  hint: string;
  /** Checks to ask. `reopen` sends the user back to the field's direction step instead. */
  checks: string[];
  reopen?: 'direction';
};

export const CHECKS: Check[] = [
  {
    id: 'felt-dag',
    target: 'felt',
    text: 'Hvilken oppgave ville du helst fått i dag?',
    options: [
      { label: 'Hjelpe en pasient opp av senga', hint: 'og få smilet tilbake', value: 'helse' },
      { label: 'Lære en elev å lese', hint: 'og se at det løsner', value: 'oppvekst' },
      { label: 'Montere et nytt kjøkken', hint: 'fra pakker til ferdig', value: 'bygg' },
      { label: 'Stelle dyr på en gård', hint: 'tidlig om morgenen', value: 'natur' },
      { label: 'Lage en plakat eller en film', hint: 'som folk stopper opp for', value: 'kreativ' },
      { label: 'Ta imot en gruppe turister', hint: 'og gi dem en fin dag', value: 'service' },
      { label: 'Sette opp budsjettet for en bedrift', hint: 'så tallene går opp', value: 'okonomi' },
      { label: 'Finne feilen i en app', hint: 'linje for linje', value: 'it' },
      { label: 'Etterforske et innbrudd', hint: 'og finne ut hva som skjedde', value: 'samfunn' },
      { label: 'Gjøre et forsøk i et laboratorium', hint: 'og se om teorien holder', value: 'forskning' },
    ],
  },
  {
    id: 'arbeidsform-prosjekt',
    target: 'arbeidsform',
    text: 'Du får et stort prosjekt. Hvordan vil du helst løse det?',
    options: [
      { label: 'Sammen med andre', hint: 'Vi deler opp og snakker sammen hver dag', value: 'team' },
      { label: 'På egen hånd', hint: 'Jeg får min del og jobber i fred', value: 'alene' },
    ],
  },
  {
    id: 'storrelse-fem-ar',
    target: 'storrelse',
    text: 'Hvilken arbeidsplass ser du for deg om fem år?',
    options: [
      { label: 'Et stort sted', hint: 'Mange avdelinger og mange veier videre', value: 'stor' },
      { label: 'Et lite sted', hint: 'Der alle kjenner alle', value: 'liten' },
    ],
  },
  {
    id: 'sted-november',
    target: 'sted',
    text: 'Det er en tirsdag i november. Hvor er du klokka ti?',
    options: [
      { label: 'Inne', hint: 'Ved pulten, i klasserommet eller i lokalet', value: 'inne' },
      { label: 'Ute', hint: 'Med gode klær, i regn eller sol', value: 'ute' },
      { label: 'På vei', hint: 'Til neste kunde eller oppdrag', value: 'farten' },
    ],
  },
  {
    id: 'hverdag-mandag',
    target: 'hverdag',
    text: 'Hvordan vil du at mandagen skal se ut?',
    options: [
      { label: 'Kjent', hint: 'Jeg vet hva som skal gjøres, og gjør det godt', value: 'struktur' },
      { label: 'Uforutsigbar', hint: 'Jeg vet ikke hva som venter', value: 'variasjon' },
    ],
  },
  {
    id: 'rolle-fast',
    target: 'rolle',
    text: 'Gruppa di står fast. Hva gjør du?',
    options: [
      { label: 'Tar ordet', hint: 'Fordeler oppgaver og får gruppa videre', value: 'lede' },
      { label: 'Graver meg ned', hint: 'I problemet til jeg finner løsningen', value: 'fag' },
    ],
  },
  {
    id: 'drivkraft-kveld',
    target: 'drivkraft',
    text: 'Hva vil du helst høre etter en lang arbeidsdag?',
    options: [
      { label: '«Takk, du hjalp meg»', hint: 'Noen fikk det bedre', value: 'hjelpe' },
      { label: '«Så fint det ble»', hint: 'Noe nytt finnes fordi du laget det', value: 'skape' },
      { label: '«Hvordan fikk du det til?»', hint: 'Du løste noe vanskelig', value: 'lose' },
      { label: '«Vi sees i morgen»', hint: 'Fast jobb og lønn på konto', value: 'trygghet' },
    ],
  },
  {
    id: 'utdanning-laere',
    target: 'utdanning',
    text: 'Hvordan vil du helst lære yrket ditt?',
    options: [
      { label: 'Mest i praksis', hint: 'Ute i en bedrift, med lønn tidlig', value: 'kort' },
      { label: 'Noen år på skole', hint: 'Så rett ut i jobb', value: 'bachelor' },
      { label: 'Lenge og grundig', hint: 'Fordypning og teori i fem år eller mer', value: 'master' },
    ],
  },
];

const WORKDAY = ['arbeidsform-prosjekt', 'storrelse-fem-ar', 'sted-november', 'hverdag-mandag', 'rolle-fast', 'drivkraft-kveld'];

export const COMPLAINTS: Complaint[] = [
  { id: 'felt', label: 'Feil fagfelt', hint: 'Yrkene er i et felt jeg ikke vil jobbe i', checks: ['felt-dag'] },
  { id: 'retning', label: 'Riktig felt, feil retning', hint: 'Feltet stemmer, men ikke den typen jobb', checks: [], reopen: 'direction' },
  { id: 'hverdag', label: 'Hverdagen passer ikke', hint: 'Arbeidsmåten eller arbeidsplassen virker feil', checks: WORKDAY },
  { id: 'utdanning', label: 'Feil utdanning', hint: 'For lang eller for kort vei dit', checks: ['utdanning-laere'] },
  { id: 'vetikke', label: 'Vet ikke', hint: 'Sjekk alle stegene', checks: ['felt-dag', ...WORKDAY, 'utdanning-laere'] },
];

export const CHECK_BY_ID = new Map(CHECKS.map((c) => [c.id, c]));
