// The crossroads on the map. Each question is one fork; `showIf` makes a
// question a side path that only appears after a given earlier choice.

export type Option = {
  id: string;
  label: string;
  hint: string;
  /** "Both / don't know": the answer is kept on the map but never scores. */
  neutral?: boolean;
};

export type Field = {
  id: string;
  label: string;
  hint: string;
  /** The more concrete directions within the field (second step). */
  directions: Option[];
};

export type Question = {
  id: string;
  /** Short name for the waypoint on the map. */
  waypoint: string;
  text: string;
  /** How much this fork counts when careers are ranked. */
  weight: number;
  options: Option[];
  showIf?: { question: string; option: string };
};

const NEUTRAL: Option = {
  id: 'begge',
  label: 'Begge deler',
  hint: 'Det spiller ingen stor rolle for meg',
  neutral: true,
};

// Step one and two: a broad field, then a concrete direction inside it.
export const FIELDS: Field[] = [
  {
    id: 'helse',
    label: 'Helse og omsorg',
    hint: 'Ta vare på, behandle og hjelpe folk som er syke',
    directions: [
      { id: 'pleie', label: 'Pleie og omsorg', hint: 'Være tett på pasienter og eldre hver dag' },
      { id: 'behandling', label: 'Behandling og terapi', hint: 'Finne ut hva som er galt og gjøre folk friske' },
      { id: 'akutt', label: 'Akutt og redning', hint: 'Rykke ut når det haster' },
      { id: 'lab', label: 'Laboratorium og bilder', hint: 'Prøver, analyser og røntgen' },
    ],
  },
  {
    id: 'oppvekst',
    label: 'Oppvekst og undervisning',
    hint: 'Barn, unge, skole og veiledning',
    directions: [
      { id: 'barn', label: 'Barnehage og fritid', hint: 'Lek, omsorg og læring for de minste' },
      { id: 'skole', label: 'Skole og undervisning', hint: 'Lære bort fag og følge opp elever' },
      { id: 'veiledning', label: 'Veiledning og sosialt arbeid', hint: 'Hjelpe folk videre i livet' },
    ],
  },
  {
    id: 'bygg',
    label: 'Bygg, teknikk og industri',
    hint: 'Hus, strøm, maskiner og ingeniørarbeid',
    directions: [
      { id: 'hus', label: 'Hus og anlegg', hint: 'Bygge hus, veier og uteområder' },
      { id: 'elektro', label: 'Strøm og rør', hint: 'Elektro, vann og varme i bygg' },
      { id: 'maskin', label: 'Maskiner og kjøretøy', hint: 'Reparere og kjøre motorer, biler og fly' },
      { id: 'ingenior', label: 'Ingeniørarbeid', hint: 'Beregne, planlegge og konstruere' },
    ],
  },
  {
    id: 'natur',
    label: 'Natur, dyr og mat',
    hint: 'Jord, skog, hav, dyr og matlaging',
    directions: [
      { id: 'jord', label: 'Jord, skog og hage', hint: 'Dyrke, plante og ta vare på naturen' },
      { id: 'dyr', label: 'Dyr', hint: 'Stell og behandling av dyr' },
      { id: 'hav', label: 'Hav og fisk', hint: 'Fiske og fiskeoppdrett langs kysten' },
      { id: 'mat', label: 'Mat og drikke', hint: 'Lage mat fra bunnen' },
    ],
  },
  {
    id: 'kreativ',
    label: 'Kreativt og medier',
    hint: 'Design, skriving, kunst og håndverk',
    directions: [
      { id: 'design', label: 'Design og arkitektur', hint: 'Bilder, rom, produkter og skjermer' },
      { id: 'media', label: 'Skriving og medier', hint: 'Fortelle, formidle og oversette' },
      { id: 'kunst', label: 'Kunst, musikk og foto', hint: 'Skape og vise fram eget uttrykk' },
      { id: 'handverk', label: 'Håndverk', hint: 'Lage vakre ting med hendene' },
    ],
  },
  {
    id: 'service',
    label: 'Service, salg og reiseliv',
    hint: 'Kunder, gjester og gode opplevelser',
    directions: [
      { id: 'salg', label: 'Salg', hint: 'Finne kunder og få en avtale i havn' },
      { id: 'reiseliv', label: 'Reiseliv og hotell', hint: 'Ta imot gjester og reisende' },
      { id: 'velvaere', label: 'Hår og velvære', hint: 'Frisør, hud og skjønnhet' },
    ],
  },
  {
    id: 'okonomi',
    label: 'Økonomi og ledelse',
    hint: 'Penger, regnskap, bedrifter og ledelse',
    directions: [
      { id: 'regnskap', label: 'Regnskap og revisjon', hint: 'Holde orden på tallene' },
      { id: 'finans', label: 'Bank og finans', hint: 'Lån, sparing og investeringer' },
      { id: 'ledelse', label: 'Ledelse og prosjekter', hint: 'Lede folk, prosjekter og egen bedrift' },
    ],
  },
  {
    id: 'it',
    label: 'IT og teknologi',
    hint: 'Programmering, drift, sikkerhet og data',
    directions: [
      { id: 'utvikling', label: 'Programmering', hint: 'Lage apper, nettsider og spill' },
      { id: 'drift', label: 'Drift og sikkerhet', hint: 'Holde systemer trygge og i gang' },
      { id: 'data', label: 'Data og analyse', hint: 'Finne mønstre i store datamengder' },
    ],
  },
  {
    id: 'samfunn',
    label: 'Samfunn, juss og sikkerhet',
    hint: 'Politi, rett, forsvar og offentlig forvaltning',
    directions: [
      { id: 'beredskap', label: 'Politi og beredskap', hint: 'Passe på og rykke ut' },
      { id: 'juss', label: 'Juss', hint: 'Lover, rettigheter og rettssaker' },
      { id: 'forsvar', label: 'Forsvaret', hint: 'Til lands, til sjøs og i lufta' },
      { id: 'forvaltning', label: 'Offentlig forvaltning', hint: 'Saksbehandling og planlegging i kommune og stat' },
    ],
  },
  {
    id: 'forskning',
    label: 'Forskning og vitenskap',
    hint: 'Finne ut hvordan verden henger sammen',
    directions: [
      { id: 'realfag', label: 'Naturfag og teknologi', hint: 'Fysikk, kjemi, geologi og biologi' },
      { id: 'miljo', label: 'Natur og miljø', hint: 'Klima, vilt, fisk og naturvern' },
      { id: 'mennesket', label: 'Helse og mennesket', hint: 'Kropp, sinn og sykdom' },
      { id: 'samfunnsdata', label: 'Samfunn og tall', hint: 'Statistikk og hvordan samfunnet fungerer' },
    ],
  },
];

const FIELD_QUESTION: Question = {
  id: 'felt',
  waypoint: 'Fagfelt',
  text: 'Hvilket fagfelt frister deg mest?',
  weight: 3,
  options: [
    ...FIELDS.map(({ id, label, hint }) => ({ id, label, hint })),
    { id: 'vetikke', label: 'Vet ikke ennå', hint: 'Vis meg alle feltene', neutral: true },
  ],
};

/** The direction question for a field has the field's id as its question id. */
const DIRECTION_QUESTIONS: Question[] = FIELDS.map((f) => ({
  id: f.id,
  waypoint: f.label,
  text: `Hva innen ${f.label.toLowerCase()} frister mest?`,
  weight: 3,
  showIf: { question: 'felt', option: f.id },
  options: f.directions,
}));

export const QUESTIONS: Question[] = [
  FIELD_QUESTION,
  ...DIRECTION_QUESTIONS,
  {
    id: 'arbeidsform',
    waypoint: 'Team eller alene',
    text: 'Liker du å jobbe i team eller alene?',
    weight: 1,
    options: [
      { id: 'team', label: 'I team', hint: 'Jeg får energi av å løse ting sammen med andre' },
      { id: 'alene', label: 'Alene', hint: 'Jeg jobber best når jeg kan konsentrere meg selv' },
      NEUTRAL,
    ],
  },
  {
    id: 'storrelse',
    waypoint: 'Stor eller liten',
    text: 'Vil du helst jobbe i en større eller mindre bedrift?',
    weight: 1,
    options: [
      { id: 'stor', label: 'Større', hint: 'Mange kolleger, faste rammer, f.eks. sykehus, kommune eller konsern' },
      { id: 'liten', label: 'Mindre', hint: 'Få kolleger, korte beslutningsveier, kanskje egen bedrift' },
      NEUTRAL,
    ],
  },
  {
    id: 'sted',
    waypoint: 'Inne eller ute',
    text: 'Hvor vil du helst være i arbeidsdagen?',
    weight: 1,
    options: [
      { id: 'inne', label: 'Inne', hint: 'På kontor, i et lokale eller et klasserom' },
      { id: 'ute', label: 'Ute', hint: 'I frisk luft, i all slags vær' },
      { id: 'farten', label: 'På farten', hint: 'Nye steder, kunder og oppdrag hver uke' },
      NEUTRAL,
    ],
  },
  {
    id: 'hverdag',
    waypoint: 'Rutine eller variasjon',
    text: 'Liker du faste rutiner eller stadig nye oppgaver?',
    weight: 1,
    options: [
      { id: 'struktur', label: 'Faste rutiner', hint: 'Jeg liker å vite hva dagen inneholder' },
      { id: 'variasjon', label: 'Variasjon', hint: 'Ingen dager skal være like' },
      NEUTRAL,
    ],
  },
  {
    id: 'rolle',
    waypoint: 'Lede eller fordype',
    text: 'Vil du lede andre eller bli ekspert i faget ditt?',
    weight: 1,
    options: [
      { id: 'lede', label: 'Lede', hint: 'Ta ansvar for folk, mål og beslutninger' },
      { id: 'fag', label: 'Fordype meg', hint: 'Bli riktig god på noe bestemt' },
      NEUTRAL,
    ],
  },
  {
    id: 'utdanning',
    waypoint: 'Utdanning',
    text: 'Hvor lang utdanning er du klar for?',
    weight: 2,
    options: [
      { id: 'kort', label: 'Fagbrev eller kort', hint: 'Videregående med læretid, ca. 4 år' },
      { id: 'bachelor', label: 'Bachelor', hint: 'Ca. 3 år på høyskole eller universitet' },
      { id: 'master', label: 'Master eller mer', hint: '5 år eller lenger' },
      { id: 'vetikke', label: 'Vet ikke ennå', hint: 'Vis meg alle veier', neutral: true },
    ],
  },
  {
    id: 'drivkraft',
    waypoint: 'Drivkraft',
    text: 'Hva gir deg mest energi i en jobb?',
    weight: 1,
    options: [
      { id: 'hjelpe', label: 'Å hjelpe', hint: 'At noen får det bedre fordi jeg var der' },
      { id: 'skape', label: 'Å skape', hint: 'Å se noe jeg har laget bli ferdig' },
      { id: 'lose', label: 'Å løse problemer', hint: 'Å knekke en vanskelig nøtt' },
      { id: 'trygghet', label: 'Trygghet', hint: 'Stabil jobb og god lønn' },
    ],
  },
];

export const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));
