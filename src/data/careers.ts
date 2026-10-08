// The destinations on the map. `fits` lists, per question, the answers that
// suit the career. A question the career leaves out does not count either way.

export type Career = {
  id: string;
  name: string;
  summary: string;
  /** The usual way into the job in Norway. */
  education: string;
  fits: Record<string, string[]>;
};

export const CAREERS: Career[] = [
  // Mennesker · helse
  {
    id: 'sykepleier',
    name: 'Sykepleier',
    summary: 'Pleier og følger opp pasienter på sykehus, sykehjem eller i hjemmetjenesten.',
    education: 'Bachelor i sykepleie (3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['helse'], hverdag: ['variasjon', 'struktur'], rolle: ['fag', 'lede'], utdanning: ['bachelor'], drivkraft: ['hjelpe', 'trygghet'] },
  },
  {
    id: 'helsefagarbeider',
    name: 'Helsefagarbeider',
    summary: 'Hjelper eldre, syke og funksjonshemmede med stell og daglige gjøremål.',
    education: 'Fagbrev i helsearbeiderfaget (vg2 + 2 år lære)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne', 'farten'], fokus: ['mennesker'], mennesker: ['helse'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['hjelpe', 'trygghet'] },
  },
  {
    id: 'lege',
    name: 'Lege',
    summary: 'Undersøker, stiller diagnoser og behandler sykdom, som fastlege eller på sykehus.',
    education: 'Medisinstudiet (6 år) og spesialisering',
    fits: { arbeidsform: ['team', 'alene'], storrelse: ['stor', 'liten'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['helse'], hverdag: ['variasjon'], rolle: ['fag', 'lede'], utdanning: ['master'], drivkraft: ['hjelpe', 'lose'] },
  },
  {
    id: 'fysioterapeut',
    name: 'Fysioterapeut',
    summary: 'Hjelper folk å komme i form igjen etter skader, sykdom og belastninger.',
    education: 'Bachelor i fysioterapi (3 år)',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['helse'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['bachelor'], drivkraft: ['hjelpe'] },
  },
  {
    id: 'psykolog',
    name: 'Psykolog',
    summary: 'Samtaler med og behandler mennesker med psykiske plager.',
    education: 'Profesjonsstudiet i psykologi (6 år)',
    fits: { arbeidsform: ['alene'], storrelse: ['stor', 'liten'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['helse'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['master'], drivkraft: ['hjelpe', 'lose'] },
  },
  {
    id: 'ambulansearbeider',
    name: 'Ambulansearbeider',
    summary: 'Rykker ut til ulykker og akutt sykdom og gir hjelp på stedet og under transport.',
    education: 'Fagbrev i ambulansefaget, eller bachelor i paramedisin',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['farten', 'ute'], fokus: ['mennesker'], mennesker: ['helse', 'samfunn'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort', 'bachelor'], drivkraft: ['hjelpe'] },
  },

  // Mennesker · oppvekst
  {
    id: 'laerer',
    name: 'Lærer',
    summary: 'Planlegger og holder undervisning, og følger opp elevene faglig og sosialt.',
    education: 'Grunnskolelærer (5 år, master) eller lektor',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['oppvekst'], hverdag: ['struktur'], rolle: ['lede', 'fag'], utdanning: ['master'], drivkraft: ['hjelpe', 'trygghet'] },
  },
  {
    id: 'barnehagelaerer',
    name: 'Barnehagelærer',
    summary: 'Leder det pedagogiske arbeidet i en barnehage, med lek, læring og omsorg.',
    education: 'Bachelor i barnehagelærerutdanning (3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['liten'], sted: ['inne', 'ute'], fokus: ['mennesker'], mennesker: ['oppvekst'], hverdag: ['variasjon'], rolle: ['lede'], utdanning: ['bachelor'], drivkraft: ['hjelpe', 'skape'] },
  },
  {
    id: 'barne-ungdomsarbeider',
    name: 'Barne- og ungdomsarbeider',
    summary: 'Jobber med barn og unge i barnehage, SFO, skole eller fritidsklubb.',
    education: 'Fagbrev i barne- og ungdomsarbeiderfaget',
    fits: { arbeidsform: ['team'], storrelse: ['liten', 'stor'], sted: ['inne', 'ute'], fokus: ['mennesker'], mennesker: ['oppvekst'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['hjelpe'] },
  },
  {
    id: 'sosionom',
    name: 'Sosionom',
    summary: 'Hjelper folk som står i vanskelige livssituasjoner, f.eks. i NAV eller barnevernet.',
    education: 'Bachelor i sosialt arbeid (3 år)',
    fits: { arbeidsform: ['team', 'alene'], storrelse: ['stor'], sted: ['inne', 'farten'], fokus: ['mennesker'], mennesker: ['oppvekst', 'samfunn'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor'], drivkraft: ['hjelpe'] },
  },
  {
    id: 'radgiver-skole',
    name: 'Karriereveileder',
    summary: 'Hjelper elever og voksne å finne utdanning og jobb som passer.',
    education: 'Bachelor og videreutdanning, ofte master i karriereveiledning',
    fits: { arbeidsform: ['alene'], storrelse: ['stor'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['oppvekst'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['hjelpe'] },
  },

  // Mennesker · service
  {
    id: 'frisor',
    name: 'Frisør',
    summary: 'Klipper, farger og styler hår, ofte i en liten salong eller egen bedrift.',
    education: 'Fagbrev i frisørfaget',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['mennesker', 'ideer'], mennesker: ['service'], ideer: ['design'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['skape'] },
  },
  {
    id: 'selger',
    name: 'Selger',
    summary: 'Finner kunder, gir råd og selger varer eller tjenester.',
    education: 'Fagbrev i salgsfaget, eller ingen krav',
    fits: { arbeidsform: ['team', 'alene'], storrelse: ['stor', 'liten'], sted: ['farten', 'inne'], fokus: ['mennesker'], mennesker: ['service'], hverdag: ['variasjon'], rolle: ['lede'], utdanning: ['kort'], drivkraft: ['trygghet', 'lose'] },
  },
  {
    id: 'eiendomsmegler',
    name: 'Eiendomsmegler',
    summary: 'Selger boliger: verdivurderer, holder visninger og leder budrunder.',
    education: 'Bachelor i eiendomsmegling (3 år)',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['farten'], fokus: ['mennesker', 'tall'], mennesker: ['service'], tall: ['okonomi'], hverdag: ['variasjon'], rolle: ['lede'], utdanning: ['bachelor'], drivkraft: ['trygghet'] },
  },
  {
    id: 'resepsjonist',
    name: 'Resepsjonist og reiselivsmedarbeider',
    summary: 'Tar imot gjester på hotell, i reiseliv og opplevelser.',
    education: 'Fagbrev i reiselivsfaget',
    fits: { arbeidsform: ['team'], storrelse: ['stor', 'liten'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['service'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['hjelpe'] },
  },
  {
    id: 'hr-radgiver',
    name: 'HR-rådgiver',
    summary: 'Rekrutterer, følger opp ansatte og jobber med arbeidsmiljø.',
    education: 'Bachelor eller master i HR, ledelse eller samfunnsfag',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['mennesker'], mennesker: ['service', 'samfunn'], hverdag: ['variasjon'], rolle: ['lede'], utdanning: ['bachelor', 'master'], drivkraft: ['hjelpe', 'trygghet'] },
  },

  // Mennesker · samfunn
  {
    id: 'politi',
    name: 'Politi',
    summary: 'Forebygger og etterforsker kriminalitet og hjelper folk i nød.',
    education: 'Bachelor ved Politihøgskolen (3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['farten', 'ute'], fokus: ['mennesker'], mennesker: ['samfunn'], hverdag: ['variasjon'], rolle: ['fag', 'lede'], utdanning: ['bachelor'], drivkraft: ['hjelpe', 'trygghet'] },
  },
  {
    id: 'advokat',
    name: 'Advokat',
    summary: 'Gir juridiske råd og fører saker for klienter, også i retten.',
    education: 'Master i rettsvitenskap (5 år) og advokatbevilling',
    fits: { arbeidsform: ['alene'], storrelse: ['liten', 'stor'], sted: ['inne'], fokus: ['mennesker', 'ideer'], mennesker: ['samfunn'], ideer: ['ord'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['master'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'brannkonstabel',
    name: 'Brannkonstabel',
    summary: 'Slukker brann, redder liv ved ulykker og jobber med forebygging.',
    education: 'Fagskole for brann og redning (2 år), fagbrev en fordel',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['ute', 'farten'], fokus: ['mennesker', 'ting'], mennesker: ['samfunn'], ting: ['teknikk'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['hjelpe'] },
  },
  {
    id: 'offiser',
    name: 'Offiser i Forsvaret',
    summary: 'Leder soldater og operasjoner til lands, til sjøs eller i lufta.',
    education: 'Krigsskolen (bachelor, 3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['ute', 'farten'], fokus: ['mennesker'], mennesker: ['samfunn'], hverdag: ['struktur'], rolle: ['lede'], utdanning: ['bachelor'], drivkraft: ['trygghet', 'lose'] },
  },

  // Ting · bygg
  {
    id: 'tomrer',
    name: 'Tømrer',
    summary: 'Bygger og pusser opp hus i tre, fra grunnmur til tak.',
    education: 'Fagbrev i tømrerfaget',
    fits: { arbeidsform: ['team'], storrelse: ['liten'], sted: ['ute'], fokus: ['ting'], ting: ['bygg'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['skape'] },
  },
  {
    id: 'elektriker',
    name: 'Elektriker',
    summary: 'Legger opp og reparerer strøm i boliger, bygg og industri.',
    education: 'Fagbrev i elektrikerfaget',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['liten', 'stor'], sted: ['farten'], fokus: ['ting'], ting: ['bygg', 'teknikk'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'rorlegger',
    name: 'Rørlegger',
    summary: 'Monterer og reparerer vann, avløp og varme i bygg.',
    education: 'Fagbrev i rørleggerfaget',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['farten'], fokus: ['ting'], ting: ['bygg'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'anleggsmaskinforer',
    name: 'Anleggsmaskinfører',
    summary: 'Kjører gravemaskin, hjullaster og andre store maskiner på veier og byggeplasser.',
    education: 'Fagbrev i anleggsmaskinførerfaget',
    fits: { arbeidsform: ['alene'], storrelse: ['stor', 'liten'], sted: ['ute'], fokus: ['ting'], ting: ['bygg', 'teknikk'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['skape', 'trygghet'] },
  },
  {
    id: 'byggingenior',
    name: 'Byggingeniør',
    summary: 'Planlegger og beregner bygg, broer og veier, og følger opp byggeprosjekter.',
    education: 'Bachelor i bygg (3 år), eller master',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne', 'ute'], fokus: ['ting', 'tall'], ting: ['bygg'], tall: ['analyse'], hverdag: ['variasjon'], rolle: ['lede', 'fag'], utdanning: ['bachelor', 'master'], drivkraft: ['lose', 'skape'] },
  },

  // Ting · natur
  {
    id: 'bonde',
    name: 'Bonde',
    summary: 'Driver gård med dyr, korn eller grønnsaker, ofte som egen bedrift.',
    education: 'Fagbrev i landbruk, eller agronomutdanning',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['ute'], fokus: ['ting'], ting: ['natur'], hverdag: ['struktur'], rolle: ['lede'], utdanning: ['kort'], drivkraft: ['skape'] },
  },
  {
    id: 'veterinar',
    name: 'Veterinær',
    summary: 'Undersøker og behandler syke dyr, og passer på trygg mat.',
    education: 'Veterinærstudiet (6 år)',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['liten'], sted: ['inne', 'farten'], fokus: ['ting'], ting: ['natur'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['master'], drivkraft: ['hjelpe', 'lose'] },
  },
  {
    id: 'dyrepleier',
    name: 'Dyrepleier',
    summary: 'Steller dyr og assisterer veterinæren på klinikk eller dyresykehus.',
    education: 'Fagbrev i dyrefaget, eller bachelor i dyrepleie',
    fits: { arbeidsform: ['team'], storrelse: ['liten'], sted: ['inne'], fokus: ['ting'], ting: ['natur'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort', 'bachelor'], drivkraft: ['hjelpe'] },
  },
  {
    id: 'anleggsgartner',
    name: 'Anleggsgartner',
    summary: 'Lager parker, hager, lekeplasser og uteområder.',
    education: 'Fagbrev i anleggsgartnerfaget',
    fits: { arbeidsform: ['team'], storrelse: ['liten'], sted: ['ute'], fokus: ['ting'], ting: ['natur', 'bygg'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['skape'] },
  },
  {
    id: 'naturforvalter',
    name: 'Naturforvalter',
    summary: 'Kartlegger og tar vare på natur, vilt og fisk for stat og kommune.',
    education: 'Bachelor eller master i naturforvaltning',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['stor'], sted: ['ute', 'inne'], fokus: ['ting', 'ideer'], ting: ['natur'], ideer: ['forskning'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'fiskeoppdretter',
    name: 'Akvakulturoperatør',
    summary: 'Driver fiskeoppdrett: fôring, helse og stell av fisken i merdene.',
    education: 'Fagbrev i akvakulturfaget',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['ute'], fokus: ['ting'], ting: ['natur', 'teknikk'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['trygghet'] },
  },

  // Ting · teknikk
  {
    id: 'bilmekaniker',
    name: 'Bilmekaniker',
    summary: 'Feilsøker, reparerer og vedlikeholder biler, også el-biler.',
    education: 'Fagbrev i bilfaget, lette kjøretøy',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['ting'], ting: ['teknikk'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['lose'] },
  },
  {
    id: 'industrimekaniker',
    name: 'Industrimekaniker',
    summary: 'Monterer og holder maskiner i gang i industri, olje og energi.',
    education: 'Fagbrev i industrimekanikerfaget',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['ting'], ting: ['teknikk'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'maskiningenior',
    name: 'Maskiningeniør',
    summary: 'Utvikler og forbedrer maskiner, produkter og produksjon.',
    education: 'Bachelor i maskin (3 år), eller master',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['ting', 'tall'], ting: ['teknikk'], tall: ['analyse'], hverdag: ['variasjon'], rolle: ['fag', 'lede'], utdanning: ['bachelor', 'master'], drivkraft: ['lose', 'skape'] },
  },
  {
    id: 'flyger',
    name: 'Flyger',
    summary: 'Flyr passasjerer, last eller helikopter, med ansvar for sikkerheten om bord.',
    education: 'Flygerutdanning (ca. 2–3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['farten'], fokus: ['ting'], ting: ['teknikk'], hverdag: ['struktur'], rolle: ['lede'], utdanning: ['bachelor'], drivkraft: ['trygghet'] },
  },

  // Ting · mat og håndverk
  {
    id: 'kokk',
    name: 'Kokk',
    summary: 'Lager mat på restaurant, kantine eller hotell, ofte med høyt tempo.',
    education: 'Fagbrev i kokkfaget',
    fits: { arbeidsform: ['team'], storrelse: ['liten', 'stor'], sted: ['inne'], fokus: ['ting', 'ideer'], ting: ['mat'], ideer: ['design'], hverdag: ['struktur'], rolle: ['fag', 'lede'], utdanning: ['kort'], drivkraft: ['skape'] },
  },
  {
    id: 'baker',
    name: 'Baker og konditor',
    summary: 'Baker brød, kaker og bakverk, ofte tidlig om morgenen.',
    education: 'Fagbrev i baker- eller konditorfaget',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['liten'], sted: ['inne'], fokus: ['ting'], ting: ['mat'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['skape'] },
  },
  {
    id: 'mobelsnekker',
    name: 'Møbelsnekker',
    summary: 'Lager og restaurerer møbler og innredning i tre.',
    education: 'Fagbrev eller svennebrev i møbelsnekkerfaget',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['ting', 'ideer'], ting: ['mat', 'bygg'], ideer: ['design'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['skape'] },
  },

  // Ideer · design
  {
    id: 'grafisk-designer',
    name: 'Grafisk designer',
    summary: 'Lager logoer, plakater, emballasje og visuell profil.',
    education: 'Bachelor i grafisk design (3 år)',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['ideer'], ideer: ['design'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor'], drivkraft: ['skape'] },
  },
  {
    id: 'arkitekt',
    name: 'Arkitekt',
    summary: 'Tegner bygg og byrom som skal være vakre, praktiske og bærekraftige.',
    education: 'Master i arkitektur (5 år)',
    fits: { arbeidsform: ['team'], storrelse: ['liten'], sted: ['inne'], fokus: ['ideer', 'ting'], ideer: ['design'], ting: ['bygg'], hverdag: ['variasjon'], rolle: ['fag', 'lede'], utdanning: ['master'], drivkraft: ['skape'] },
  },
  {
    id: 'ux-designer',
    name: 'UX-designer',
    summary: 'Designer apper og nettsider som er enkle og hyggelige å bruke.',
    education: 'Bachelor i interaksjonsdesign eller lignende',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['ideer', 'tall'], ideer: ['design'], tall: ['it'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['skape', 'lose'] },
  },
  {
    id: 'musiker',
    name: 'Musiker eller kunstner',
    summary: 'Skaper og fremfører musikk eller kunst, ofte som frilanser med flere oppdrag.',
    education: 'Ingen krav; ofte bachelor fra kunst- eller musikkhøgskole',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['liten'], sted: ['farten', 'inne'], fokus: ['ideer'], ideer: ['design', 'ord'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor', 'kort'], drivkraft: ['skape'] },
  },

  // Ideer · ord og medier
  {
    id: 'journalist',
    name: 'Journalist',
    summary: 'Finner, sjekker og forteller nyheter i avis, radio, TV eller på nett.',
    education: 'Bachelor i journalistikk (3 år), eller annen utdanning',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['stor', 'liten'], sted: ['farten'], fokus: ['ideer'], ideer: ['ord'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor'], drivkraft: ['skape', 'lose'] },
  },
  {
    id: 'kommunikasjonsradgiver',
    name: 'Kommunikasjonsrådgiver',
    summary: 'Skriver tekster, planlegger kampanjer og hjelper virksomheter å nå ut.',
    education: 'Bachelor eller master i kommunikasjon eller medievitenskap',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['ideer', 'mennesker'], ideer: ['ord'], mennesker: ['service'], hverdag: ['variasjon'], rolle: ['fag', 'lede'], utdanning: ['bachelor', 'master'], drivkraft: ['skape'] },
  },
  {
    id: 'oversetter',
    name: 'Oversetter',
    summary: 'Oversetter bøker, filmer, dokumenter og nettsider mellom språk.',
    education: 'Bachelor eller master i språk og oversettelse',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['ideer'], ideer: ['ord'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['skape'] },
  },

  // Ideer · forskning
  {
    id: 'forsker',
    name: 'Forsker',
    summary: 'Utforsker spørsmål ingen har svaret på ennå, ved universitet eller institutt.',
    education: 'Master og doktorgrad (ca. 8 år)',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['stor'], sted: ['inne'], fokus: ['ideer'], ideer: ['forskning'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['master'], drivkraft: ['lose'] },
  },
  {
    id: 'bioingenior',
    name: 'Bioingeniør',
    summary: 'Analyserer blod og vevsprøver i laboratoriet, så legene kan stille riktig diagnose.',
    education: 'Bachelor i bioingeniørfag (3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['ideer', 'mennesker'], ideer: ['forskning'], mennesker: ['helse'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['bachelor'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'geolog',
    name: 'Geolog',
    summary: 'Undersøker berggrunn, jord og skred, ofte i felt.',
    education: 'Master i geologi (5 år)',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['stor'], sted: ['ute', 'farten'], fokus: ['ideer', 'ting'], ideer: ['forskning'], ting: ['natur'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['master'], drivkraft: ['lose'] },
  },

  // Tall · økonomi
  {
    id: 'regnskapsforer',
    name: 'Regnskapsfører',
    summary: 'Fører regnskap, lønn og MVA for bedrifter.',
    education: 'Bachelor i regnskap, eller fagbrev i regnskapsfaget',
    fits: { arbeidsform: ['alene'], storrelse: ['liten'], sted: ['inne'], fokus: ['tall'], tall: ['okonomi'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['bachelor', 'kort'], drivkraft: ['trygghet'] },
  },
  {
    id: 'revisor',
    name: 'Revisor',
    summary: 'Kontrollerer at regnskapene til bedrifter er riktige.',
    education: 'Master i regnskap og revisjon (5 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne', 'farten'], fokus: ['tall'], tall: ['okonomi'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['master'], drivkraft: ['trygghet', 'lose'] },
  },
  {
    id: 'okonom',
    name: 'Økonom og finansanalytiker',
    summary: 'Analyserer marked, investeringer og budsjetter.',
    education: 'Master i økonomi og administrasjon (siviløkonom)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['tall'], tall: ['okonomi', 'analyse'], hverdag: ['variasjon'], rolle: ['lede', 'fag'], utdanning: ['master'], drivkraft: ['trygghet', 'lose'] },
  },
  {
    id: 'bankradgiver',
    name: 'Bankrådgiver',
    summary: 'Gir kunder råd om lån, sparing og forsikring.',
    education: 'Bachelor i økonomi (3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['tall', 'mennesker'], tall: ['okonomi'], mennesker: ['service'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['bachelor'], drivkraft: ['hjelpe', 'trygghet'] },
  },
  {
    id: 'grunder',
    name: 'Gründer',
    summary: 'Starter og bygger opp en egen bedrift.',
    education: 'Ingen krav; mange tar økonomi eller entreprenørskap',
    fits: { arbeidsform: ['team'], storrelse: ['liten'], sted: ['farten'], fokus: ['tall', 'ideer'], tall: ['okonomi'], ideer: ['design'], hverdag: ['variasjon'], rolle: ['lede'], utdanning: ['kort', 'bachelor', 'master'], drivkraft: ['skape', 'lose'] },
  },

  // Tall · IT
  {
    id: 'utvikler',
    name: 'Utvikler',
    summary: 'Programmerer apper, nettsider og systemer.',
    education: 'Bachelor i informatikk eller programmering (3 år)',
    fits: { arbeidsform: ['team'], storrelse: ['stor', 'liten'], sted: ['inne'], fokus: ['tall', 'ideer'], tall: ['it'], ideer: ['design'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['lose', 'skape'] },
  },
  {
    id: 'it-drift',
    name: 'IT-driftstekniker',
    summary: 'Setter opp og holder datamaskiner, nettverk og brukere i gang.',
    education: 'Fagbrev i IT-driftsfaget',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne', 'farten'], fokus: ['tall', 'ting'], tall: ['it'], ting: ['teknikk'], hverdag: ['struktur'], rolle: ['fag'], utdanning: ['kort'], drivkraft: ['lose', 'hjelpe'] },
  },
  {
    id: 'sikkerhet',
    name: 'Cybersikkerhetsrådgiver',
    summary: 'Beskytter virksomheter mot hacking og datainnbrudd.',
    education: 'Bachelor eller master i informasjonssikkerhet',
    fits: { arbeidsform: ['team', 'alene'], storrelse: ['stor'], sted: ['inne'], fokus: ['tall'], tall: ['it'], mennesker: ['samfunn'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['lose', 'trygghet'] },
  },

  // Tall · analyse
  {
    id: 'dataanalytiker',
    name: 'Dataanalytiker',
    summary: 'Finner mønstre i store datamengder og gjør dem om til beslutninger.',
    education: 'Bachelor eller master i statistikk, data eller økonomi',
    fits: { arbeidsform: ['alene', 'team'], storrelse: ['stor'], sted: ['inne'], fokus: ['tall', 'ideer'], tall: ['analyse', 'it'], ideer: ['forskning'], hverdag: ['variasjon'], rolle: ['fag'], utdanning: ['bachelor', 'master'], drivkraft: ['lose'] },
  },
  {
    id: 'logistikk',
    name: 'Logistikkplanlegger',
    summary: 'Sørger for at varer kommer riktig fram til riktig tid.',
    education: 'Bachelor i logistikk, eller fagbrev i logistikkfaget',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne'], fokus: ['tall'], tall: ['analyse'], hverdag: ['struktur'], rolle: ['lede', 'fag'], utdanning: ['kort', 'bachelor'], drivkraft: ['lose', 'trygghet'] },
  },
  {
    id: 'prosjektleder',
    name: 'Prosjektleder',
    summary: 'Leder prosjekter fra plan til mål, med folk, budsjett og frister.',
    education: 'Bachelor eller master, ofte etter noen år i et fag',
    fits: { arbeidsform: ['team'], storrelse: ['stor'], sted: ['inne', 'farten'], fokus: ['tall', 'mennesker'], tall: ['analyse'], mennesker: ['service'], hverdag: ['variasjon'], rolle: ['lede'], utdanning: ['bachelor', 'master'], drivkraft: ['lose', 'skape'] },
  },
];
