// The crossroads on the map. Each question is one fork; `showIf` makes a
// question a side path that only appears after a given earlier choice.

export type Option = {
  id: string;
  label: string;
  hint: string;
  /** "Both / don't know": the answer is kept on the map but never scores. */
  neutral?: boolean;
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

export const QUESTIONS: Question[] = [
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
    id: 'fokus',
    waypoint: 'Hva du jobber med',
    text: 'Hva jobber du helst med?',
    weight: 3,
    options: [
      { id: 'mennesker', label: 'Mennesker', hint: 'Hjelpe, lære bort, betjene eller beskytte andre' },
      { id: 'ting', label: 'Ting og natur', hint: 'Bruke hendene, verktøy, maskiner, dyr eller planter' },
      { id: 'ideer', label: 'Ideer', hint: 'Skape, skrive, designe eller forske' },
      { id: 'tall', label: 'Tall og systemer', hint: 'Økonomi, data, teknologi og planlegging' },
    ],
  },
  {
    id: 'mennesker',
    waypoint: 'Arbeid med mennesker',
    text: 'Hvilken vei inn mot mennesker frister mest?',
    weight: 3,
    showIf: { question: 'fokus', option: 'mennesker' },
    options: [
      { id: 'helse', label: 'Helse og omsorg', hint: 'Pleie, behandle og ta vare på folk' },
      { id: 'oppvekst', label: 'Oppvekst og læring', hint: 'Barn, unge, skole og veiledning' },
      { id: 'service', label: 'Service og salg', hint: 'Kunder, gjester og gode opplevelser' },
      { id: 'samfunn', label: 'Sikkerhet og rettferd', hint: 'Politi, beredskap, juss og forsvar' },
    ],
  },
  {
    id: 'ting',
    waypoint: 'Ting og natur',
    text: 'Hva vil du helst ha mellom hendene?',
    weight: 3,
    showIf: { question: 'fokus', option: 'ting' },
    options: [
      { id: 'bygg', label: 'Bygg og anlegg', hint: 'Hus, veier, strøm og rør' },
      { id: 'natur', label: 'Natur og dyr', hint: 'Jord, skog, hav og dyr' },
      { id: 'teknikk', label: 'Teknikk og maskiner', hint: 'Motorer, industri og automatisering' },
      { id: 'mat', label: 'Mat og håndverk', hint: 'Lage noe godt eller vakkert fra bunnen' },
    ],
  },
  {
    id: 'ideer',
    waypoint: 'Ideer',
    text: 'Hvordan vil du helst jobbe med ideer?',
    weight: 3,
    showIf: { question: 'fokus', option: 'ideer' },
    options: [
      { id: 'design', label: 'Design og form', hint: 'Bilder, rom, produkter og skjermer' },
      { id: 'ord', label: 'Ord og medier', hint: 'Skrive, fortelle og formidle' },
      { id: 'forskning', label: 'Forskning', hint: 'Finne ut hvordan verden henger sammen' },
    ],
  },
  {
    id: 'tall',
    waypoint: 'Tall og systemer',
    text: 'Hvilke tall og systemer vil du jobbe med?',
    weight: 3,
    showIf: { question: 'fokus', option: 'tall' },
    options: [
      { id: 'okonomi', label: 'Økonomi', hint: 'Penger, regnskap og investeringer' },
      { id: 'it', label: 'IT og programmering', hint: 'Bygge og drifte digitale løsninger' },
      { id: 'analyse', label: 'Analyse og planlegging', hint: 'Finne mønstre og få ting til å gå opp' },
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
