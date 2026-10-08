// "Veien videre" for each career: concrete roles inside it, examples of blended
// roles you can make yourself, example employers, who is worth contacting, and
// what to search for to find the study. Roles and blends are written as
// "Name — what it is". Employers are well-known examples, not a full list.

export type GuideEntry = {
  name: string;
  text: string;
};

export type Guide = {
  roles: GuideEntry[];
  blends: GuideEntry[];
  employers: string[];
  /** A job title that hires or leads people in the career: a smart person to ask. */
  lead: string;
  /** Names of studies or trades to look up. */
  studies: string[];
  standOut: string[];
};

function entries(list: string[]): GuideEntry[] {
  return list.map((s) => {
    const [name, text] = s.split(' — ');
    return { name: name!, text: text ?? '' };
  });
}

function guide(
  roles: string[],
  blends: string[],
  employers: string[],
  lead: string,
  studies: string[],
  standOut: string[],
): Guide {
  return { roles: entries(roles), blends: entries(blends), employers, lead, studies, standOut };
}

export const GUIDES: Record<string, Guide> = {
  // Helse
  sykepleier: guide(
    [
      'Intensivsykepleier — passer på de sykeste pasientene, med mye teknisk utstyr',
      'Helsesykepleier — jobber med barn og unge på helsestasjon og i skolen',
      'Operasjonssykepleier — sørger for at alt er sterilt og riktig under operasjoner',
      'Sykepleier i hjemmetjenesten — besøker pasienter hjemme og jobber selvstendig',
    ],
    [
      'E-helserådgiver — sykepleie + IT: hjelper sykehus å ta i bruk digitale verktøy',
      'Klinisk veileder — sykepleie + undervisning: lærer opp studenter og nyansatte',
    ],
    ['Oslo universitetssykehus', 'Helse Bergen', 'St. Olavs hospital', 'Hjemmetjenesten i kommunene'],
    'Avdelingssykepleier',
    ['Sykepleie (bachelor)'],
    [
      'Ekstravakter som pleieassistent mens du studerer gjør deg kjent før du er ferdig',
      'Velg praksissteder i den retningen du vil, og si det høyt til veilederen',
    ],
  ),
  helsefagarbeider: guide(
    [
      'Helsefagarbeider på sykehjem — fast stell og omsorg for eldre',
      'Helsefagarbeider i hjemmetjenesten — kjører rundt til brukere hjemme',
      'Helsefagarbeider i psykisk helse — jobber i bolig eller døgnavdeling',
    ],
    [
      'Aktivitør — helse + kreativitet: lager aktiviteter og trivsel for beboere',
      'Velferdsteknologi-veileder — helse + teknologi: lærer brukere å bruke trygghetsalarmer og digitalt tilsyn',
    ],
    ['Kommunale sykehjem', 'Hjemmetjenesten i kommunene', 'Private omsorgsboliger'],
    'Avdelingsleder på sykehjem',
    ['Helsearbeiderfaget (fagbrev)'],
    [
      'Helgevakter allerede i vg1 eller vg2 gir deg lærlingplassen lettere',
      'Vis at du er stabil: kommer tidlig, sier fra og tar ansvar',
    ],
  ),
  lege: guide(
    [
      'Fastlege — følger de samme pasientene over mange år',
      'Akuttmedisiner — tar imot pasienter i akuttmottaket',
      'Psykiater — behandler psykisk sykdom',
      'Kirurg — opererer',
    ],
    [
      'Medisinsk rådgiver i teknologi — lege + IT: hjelper selskaper som lager helse-apper',
      'Forskende lege — lege + forskning: kombinerer klinikk og forskning i et sykehus',
    ],
    ['Oslo universitetssykehus', 'Helse Bergen', 'Legevakten i kommunene', 'Legekontor og fastlegesentre'],
    'Overlege',
    ['Medisin (profesjonsstudium)'],
    [
      'Sommerjobb som vikar i helsevesenet eller som medisinerstudent gir erfaring tidlig',
      'Forskerlinjen eller en studentoppgave i forskning skiller deg ut',
    ],
  ),
  fysioterapeut: guide(
    [
      'Idrettsfysioterapeut — følger lag og utøvere',
      'Fysioterapeut i kommunen — hjelper eldre og barn med å klare seg i hverdagen',
      'Manuellterapeut — videreutdanning: undersøker og behandler muskel- og skjelettplager',
    ],
    [
      'Bedriftsfysioterapeut — fysio + HMS: forebygger belastningsskader på arbeidsplasser',
      'Treningsrådgiver for rehabilitering — fysio + coaching: digitale treningsprogram',
    ],
    ['Private fysioterapiklinikker', 'Kommunale rehabiliteringstjenester', 'Idrettsklubber og Olympiatoppen'],
    'Daglig leder på fysioterapiklinikk',
    ['Fysioterapi (bachelor)'],
    [
      'Jobb som trener eller instruktør ved siden av studiet',
      'Ta kurs innen idrettsskader eller trening for eldre for å vise retning',
    ],
  ),
  psykolog: guide(
    [
      'Klinisk psykolog i BUP — barne- og ungdomspsykiatri',
      'Psykolog i kommunen — lavterskel hjelp for voksne og unge',
      'Organisasjonspsykolog — jobber med ledelse og arbeidsmiljø i bedrifter',
    ],
    [
      'Psykolog i teknologi — psykologi + IT: designer apper for mental helse',
      'Rekrutteringspsykolog — psykologi + HR: tester og velger ut kandidater',
    ],
    [
      'Distriktspsykiatriske sentre (DPS)',
      'Kommunene',
      'Private psykologspesialister',
      'Rådgivningsfirmaer innen organisasjonspsykologi',
    ],
    'Psykologspesialist',
    ['Psykologi (profesjonsstudium)'],
    [
      'Deltidsjobb i en bolig eller på en krisetelefon gir erfaring med mennesker i krise',
      'Frivillig arbeid, f.eks. i Kirkens SOS eller Mental Helse, er godt sett',
    ],
  ),
  ambulansearbeider: guide(
    [
      'Ambulansearbeider på bil — rykker ut på akutte oppdrag',
      'Ambulansearbeider på båt — langs kysten',
      'Operatør på AMK-sentral — tar imot 113-samtaler og sender ambulanser',
    ],
    [
      'Instruktør i førstehjelp — akutt + undervisning: holder kurs for bedrifter og skoler',
      'Paramedisiner i luftambulansen — videre vei for erfarne',
    ],
    ['Prehospitale tjenester i helseforetakene', 'Luftambulansetjenesten', 'Norsk Luftambulanse'],
    'Stasjonsleder ambulanse',
    ['Ambulansefaget (fagbrev)', 'Paramedisin (bachelor)'],
    [
      'Førerkort tidlig og god fysisk form er nesten et krav',
      'Frivillig i Røde Kors Hjelpekorps gir relevant erfaring',
    ],
  ),
  radiograf: guide(
    [
      'MR-radiograf — tar detaljerte bilder av bløtvev',
      'CT-radiograf — raske bilder ved akutte skader',
      'Intervensjonsradiograf — assisterer ved behandling styrt av bilder',
    ],
    [
      'Applikasjonsspesialist — radiografi + teknologi: lærer sykehus å bruke nye maskiner',
      'Strålesikkerhetsrådgiver — radiografi + kvalitet: passer på trygg stråling',
    ],
    ['Oslo universitetssykehus', 'Unilabs', 'Aleris', 'Helseforetakene'],
    'Seksjonsleder radiologi',
    ['Radiografi (bachelor)'],
    ['Sommerjobb som assistent på en røntgenavdeling', 'Interesse for teknologi og fysikk er et pluss du bør vise'],
  ),

  // Oppvekst
  laerer: guide(
    [
      'Lærer på barneskolen — mange fag, tett på elevene',
      'Lektor i videregående — fordyper seg i ett eller to fag',
      'Yrkesfaglærer — underviser i et håndverksfag du selv kan',
    ],
    [
      'Lærer og innholdsutvikler — undervisning + digitalt: lager læremidler',
      'Lærer og kontaktlærer for internasjonale elever — undervisning + språk',
    ],
    ['Kommunale grunnskoler', 'Fylkeskommunale videregående skoler', 'Private skoler'],
    'Rektor',
    ['Grunnskolelærerutdanning', 'Lektorutdanning'],
    [
      'Jobb som vikar eller leksehjelper mens du studerer',
      'Trenerverv eller frivillig arbeid med unge viser at du kan lede en gruppe',
    ],
  ),
  barnehagelaerer: guide(
    [
      'Pedagogisk leder — leder en avdeling',
      'Styrer — leder hele barnehagen',
      'Barnehagelærer i friluftsbarnehage — mye av dagen ute',
    ],
    [
      'Språkpedagog — barnehage + språk: følger opp barn med flere språk',
      'Barnehagelærer med kunst og kultur — barnehage + kreativitet',
    ],
    ['Kommunale barnehager', 'Espira', 'Kanvas', 'FUS-barnehagene'],
    'Styrer i barnehage',
    ['Barnehagelærerutdanning (bachelor)'],
    [
      'Assistentjobb i barnehage ved siden av studiet åpner dører',
      'Vis en egen interesse, f.eks. musikk, natur eller språk',
    ],
  ),
  'barne-ungdomsarbeider': guide(
    [
      'Fagarbeider i barnehage — omsorg og lek',
      'Miljøarbeider på SFO/AKS — aktiviteter etter skoletid',
      'Assistent i skolen — følger opp enkeltelever',
    ],
    ['Ungdomsarbeider i fritidsklubb — oppvekst + kultur', 'Miljøterapeut i bolig — oppvekst + helse'],
    ['Kommunale barnehager og skoler', 'Fritidsklubber', 'Private barnehager'],
    'Daglig leder SFO/AKS',
    ['Barne- og ungdomsarbeiderfaget (fagbrev)'],
    ['Trener eller leder i en klubb viser at du kan ha ansvar for unge', 'Sommerjobb på leir eller ferietilbud'],
  ),
  sosionom: guide(
    [
      'Veileder i NAV — hjelper folk ut i jobb',
      'Sosionom i sykehus — hjelper pasienter med praktiske og økonomiske ting',
      'Sosionom i rusomsorgen — følger opp mennesker med rusutfordringer',
    ],
    ['Ungdomskoordinator — sosialt arbeid + oppvekst', 'Gjeldsrådgiver — sosialt arbeid + økonomi'],
    ['NAV', 'Kommunene', 'Kirkens Bymisjon', 'Helseforetakene'],
    'Avdelingsleder i NAV',
    ['Sosialt arbeid (bachelor)'],
    [
      'Deltidsjobb i bolig, natthjem eller som miljøarbeider',
      'Frivillig arbeid i en organisasjon som jobber med utsatte grupper',
    ],
  ),
  'radgiver-skole': guide(
    [
      'Rådgiver i ungdomsskolen — hjelper elever å velge videregående',
      'Karriereveileder i fylket — veileder voksne',
      'Studieveileder ved universitet eller høyskole — hjelper studenter å velge og fullføre studiet',
    ],
    [
      'Karriereveileder i bedrift — veiledning + HR',
      'Digital karriereveileder — veiledning + teknologi, f.eks. chat-veiledning',
    ],
    ['Karrieresentre i fylkeskommunene', 'Ungdomsskoler og videregående skoler', 'Universiteter og høyskoler'],
    'Leder for karrieresenter',
    ['Karriereveiledning (videreutdanning eller master)'],
    ['Erfaring som lærer, rådgiver eller fra arbeidslivet gir troverdighet', 'Hospiter en dag hos en rådgiver'],
  ),
  barnevernspedagog: guide(
    [
      'Saksbehandler i barnevernstjenesten — undersøker og følger opp saker',
      'Miljøterapeut på barnevernsinstitusjon — er en trygg voksen i hverdagen for ungdom som bor på institusjon',
      'Familieveileder — jobber hjemme hos familier',
    ],
    ['Barnevernspedagog i skolen — barnevern + oppvekst', 'Fosterhjemsveileder — barnevern + veiledning'],
    ['Barnevernstjenesten i kommunene', 'Bufetat', 'Private barnevernsinstitusjoner'],
    'Barnevernsleder',
    ['Barnevern (bachelor)'],
    ['Deltidsjobb på en institusjon gir erfaring alle ser etter', 'Vis at du tåler å stå i vanskelige samtaler'],
  ),
  spesialpedagog: guide(
    [
      'Spesialpedagog i skolen — tilrettelagt undervisning',
      'Spesialpedagog i PPT — utreder og gir råd til skoler',
      'Logoped — hjelper med språk og tale',
    ],
    ['Spesialpedagog og digitale læremidler — pedagogikk + teknologi', 'Spesialpedagog i barnehage — tidlig innsats'],
    ['PPT i kommunene', 'Statped', 'Skoler og barnehager'],
    'Leder i PPT',
    ['Spesialpedagogikk (master)'],
    ['Assistentjobb med elever som trenger ekstra støtte', 'Lær tegn til tale eller andre kommunikasjonsmåter'],
  ),

  // Service
  frisor: guide(
    [
      'Salongfrisør — klipp og farge',
      'Frisør for scene og film — sminke og frisyrer bak kulissene',
      'Barberer — skjegg og herreklipp',
    ],
    ['Frisør med egen salong — frisør + gründer', 'Frisør og innholdsskaper — frisør + sosiale medier'],
    ['Cutters', 'Lokale salonger', 'Teatre og produksjonsselskaper'],
    'Salongeier',
    ['Frisørfaget (fagbrev)'],
    ['Del arbeidet ditt på Instagram som en portefølje', 'Helgejobb i salong mens du går på skolen'],
  ),
  selger: guide(
    [
      'Butikkselger — møter kunder i butikk',
      'Bedriftsselger (B2B) — selger til andre bedrifter',
      'Key account manager — har ansvar for de største kundene',
    ],
    ['Selger i teknologi — salg + IT', 'Salgsleder — salg + ledelse'],
    ['Elkjøp', 'XXL', 'Telenor', 'Tine'],
    'Salgssjef',
    ['Salgsfaget (fagbrev)', 'Markedsføring og salgsledelse (bachelor)'],
    [
      'Helgejobb i butikk viser at du tåler kundekontakt',
      'Mål resultater (salg, kundetilfredshet) og bruk tallene i CV-en',
    ],
  ),
  eiendomsmegler: guide(
    [
      'Boligmegler — selger boliger for privatpersoner',
      'Næringsmegler — leier ut og selger næringsbygg',
      'Prosjektmegler — selger nye boliger før de er bygget',
    ],
    ['Boligstylist — megling + interiør', 'Eiendomsanalytiker — megling + tall'],
    ['DNB Eiendom', 'Eiendomsmegler 1', 'Privatmegleren', 'Krogsveen'],
    'Daglig leder meglerkontor',
    ['Eiendomsmegling (bachelor)'],
    ['Deltidsjobb som visningsassistent', 'Bli trygg på å snakke med mange folk og følge opp kjapt'],
  ),
  resepsjonist: guide(
    [
      'Resepsjonist på hotell — tar imot gjester',
      'Guide — viser fram steder og natur',
      'Eventkoordinator — planlegger konferanser og arrangementer',
    ],
    ['Opplevelsesdesigner — reiseliv + kreativt', 'Hotellsjef — reiseliv + ledelse'],
    ['Strawberry', 'Scandic', 'Thon Hotels', 'Hurtigruten'],
    'Resepsjonssjef',
    ['Reiselivsfaget (fagbrev)', 'Reiseliv (bachelor)'],
    ['Språk er et stort pluss: vis fram hvert språk du kan', 'Sommerjobb på hotell eller camping'],
  ),
  kabinansatt: guide(
    [
      'Kabinansatt — sikkerhet og service om bord',
      'Kabinsjef — leder kabinpersonalet på flyet',
      'Bakkepersonell — innsjekk og ombordstigning',
    ],
    ['Instruktør i kabin — luftfart + undervisning', 'Kundeservice i flyselskap — luftfart + service'],
    ['Norwegian', 'SAS', 'Widerøe'],
    'Kabinsjef',
    ['Kabinkurs (kort kurs)'],
    ['Erfaring med kundeservice og flere språk teller mye', 'Førstehjelpskurs og svømmeferdigheter er en fordel'],
  ),
  hudpleier: guide(
    [
      'Hudpleier i salong — behandlinger og råd',
      'Hudpleier i spa — massasje og velvære',
      'Produktrådgiver — selger og veileder om hudpleieprodukter',
    ],
    ['Egen salong — hudpleie + gründer', 'Hudpleier i klinikk — hudpleie + helse'],
    ['Spa på hotell', 'Lokale salonger', 'Parfymerier og kjeder'],
    'Salongeier',
    ['Hudpleierfaget (fagbrev)'],
    [
      'Lag en portefølje med før- og etterbilder (med samtykke)',
      'Kurs i nye behandlinger viser at du holder deg oppdatert',
    ],
  ),

  // Samfunn
  'hr-radgiver': guide(
    [
      'Rekrutterer — finner og ansetter nye folk',
      'HR-partner — rådgiver for ledere',
      'Lønns- og personalrådgiver — lønn, avtaler og arbeidsrett',
    ],
    ['People analytics — HR + data', 'Employer branding — HR + kommunikasjon'],
    ['Equinor', 'DNB', 'Rekrutteringsbyråer som Adecco og Manpower', 'Kommunene'],
    'HR-sjef',
    ['Human resource management (bachelor/master)', 'Organisasjonspsykologi'],
    ['Studentjobb i et rekrutteringsbyrå', 'Verv i studentforening der du har ansvar for frivillige'],
  ),
  politi: guide(
    [
      'Patruljepolitibetjent — ute i bil og til fots',
      'Etterforsker — finner ut hva som har skjedd',
      'Hundefører — jobber sammen med en tjenestehund',
    ],
    ['Politi og IT — etterforskning av datakriminalitet', 'Forebyggende politi i skolen — politi + oppvekst'],
    ['Politiet (politidistriktene)', 'Kripos', 'Økokrim'],
    'Politistasjonssjef',
    ['Politiutdanning (bachelor)'],
    ['God fysisk form og rent rulleblad er krav', 'Arbeid med ungdom eller frivillig arbeid viser at du kan møte folk'],
  ),
  advokat: guide(
    [
      'Forretningsadvokat — kontrakter og selskaper',
      'Forsvarer — forsvarer folk i straffesaker',
      'Familieadvokat — skilsmisse og barnefordeling',
    ],
    ['Advokat i teknologi — juss + IT, f.eks. personvern', 'Juridisk rådgiver i en bedrift — juss + næringsliv'],
    ['Wikborg Rein', 'Thommessen', 'BAHR', 'Schjødt'],
    'Partner i advokatfirma',
    ['Rettsvitenskap (master)'],
    ['Sommerjobb i advokatfirma (sommerfullmektig) er viktig', 'Frivillig i Jussbuss eller Jussformidlingen'],
  ),
  jurist: guide(
    [
      'Jurist i et direktorat — tolker regelverk',
      'Jurist i kommunen — saker om bygg og tjenester',
      'Dommerfullmektig — midlertidig dommer i tingretten',
    ],
    ['Personvernombud — juss + IT', 'Jurist i Konkurransetilsynet — juss + økonomi'],
    ['Datatilsynet', 'Skatteetaten', 'Domstolene', 'Kommunene'],
    'Avdelingsdirektør',
    ['Rettsvitenskap (master)'],
    ['Studentjobb i offentlig sektor', 'Velg valgfag i forvaltningsrett'],
  ),
  brannkonstabel: guide(
    [
      'Brannkonstabel — slukker og redder',
      'Røykdykker — går inn i brennende bygg',
      'Brannforebygger — sjekker bygg og holder kurs',
    ],
    ['Instruktør i beredskap — brann + undervisning', 'HMS-rådgiver i industri — brann + sikkerhet'],
    ['Oslo brann- og redningsetat', 'Interkommunale brannvesen', 'Industrivern i store bedrifter'],
    'Brannsjef',
    ['Brann og redning (fagskole)'],
    ['Ha fagbrev i et håndverksfag først: det teller mye', 'Deltidsbrannkonstabel i en mindre kommune'],
  ),
  offiser: guide(
    [
      'Offiser i Hæren — leder soldater',
      'Offiser i Sjøforsvaret — tjeneste på fartøy',
      'Offiser i Luftforsvaret — flyoperasjoner og luftvern',
    ],
    ['Cyberoffiser — forsvar + IT', 'Logistikkoffiser — forsvar + logistikk'],
    ['Forsvaret', 'Cyberforsvaret', 'Heimevernet'],
    'Avdelingssjef i Forsvaret',
    ['Krigsskolen (bachelor)'],
    ['Førstegangstjeneste er beste start', 'Vis lederansvar fra speider, idrett eller frivillig arbeid'],
  ),
  befal: guide(
    [
      'Lagfører — leder et lag',
      'Instruktør — lærer opp soldater',
      'Spesialist i teknikk — utstyr, kjøretøy og samband',
    ],
    ['Befal og teknisk fagarbeider — forsvar + fagbrev', 'Befal i Heimevernet — forsvar + lokalsamfunn'],
    ['Forsvaret', 'Heimevernet'],
    'Troppssjef',
    ['Befalsutdanning'],
    ['Søk befalsskole etter førstegangstjenesten', 'Fagbrev fra før er nyttig for spesialistveien'],
  ),
  saksbehandler: guide(
    [
      'Saksbehandler i NAV — ytelser og vedtak',
      'Saksbehandler i UDI — oppholdssaker',
      'Saksbehandler i kommunen — byggesaker og tjenester',
    ],
    ['Saksbehandler og digitalisering — forvaltning + IT', 'Saksbehandler med juss — forvaltning + juss'],
    ['NAV', 'UDI', 'Skatteetaten', 'Kommunene'],
    'Seksjonsleder',
    ['Administrasjon og ledelse (bachelor)', 'Statsvitenskap'],
    ['Sommerjobb i offentlig sektor', 'Klart språk: vis at du skriver enkelt og presist'],
  ),
  samfunnsplanlegger: guide(
    [
      'Arealplanlegger — bestemmer hva tomter skal brukes til',
      'Transportplanlegger — veier, kollektivtrafikk og sykkel',
      'Klimarådgiver i kommunen — lager planer for å kutte utslipp',
    ],
    ['Planlegger og GIS-analytiker — planlegging + data', 'Medvirkningsrådgiver — planlegging + kommunikasjon'],
    ['Kommunene', 'Statens vegvesen', 'Norconsult', 'Asplan Viak'],
    'Plansjef',
    ['Samfunnsplanlegging (master)', 'Byplanlegging'],
    ['Lær GIS-verktøy tidlig', 'Sommerjobb i en kommunes planavdeling'],
  ),

  // Bygg og teknikk
  tomrer: guide(
    [
      'Tømrer i nybygg — bygger nye hus',
      'Tømrer i rehabilitering — pusser opp gamle hus',
      'Bas — leder et lag på byggeplassen',
    ],
    ['Byggeleder — tømrer + ledelse, ofte med fagskole', 'Tømrer med egen bedrift — tømrer + gründer'],
    ['Veidekke', 'AF Gruppen', 'Skanska', 'Lokale byggefirmaer'],
    'Byggeleder',
    ['Tømrerfaget (fagbrev)'],
    ['Sommerjobb som hjelper på byggeplass før læretiden', 'Vis frem prosjekter du har bygget, også hjemme'],
  ),
  elektriker: guide(
    [
      'Installatør i bolig — strøm i hus',
      'Elektriker i industri — store anlegg',
      'Solcellemontør — fornybar energi på tak',
    ],
    ['Smarthus-spesialist — elektro + IT', 'Elektroinstallatør med egen bedrift — elektro + gründer'],
    ['Caverion', 'Bravida', 'Elvia', 'Lokale elektrofirmaer'],
    'Prosjektleder elektro',
    ['Elektrikerfaget (fagbrev)'],
    [
      'Lærlingplass hos et firma som jobber med solceller eller lading er framtidsrettet',
      'Vis at du er nøyaktig og følger forskrifter',
    ],
  ),
  rorlegger: guide(
    [
      'Servicerørlegger — reparasjoner hos kunder',
      'Rørlegger i nybygg — legger rør i nye bygg fra bunnen',
      'Varmepumpe-spesialist — monterer og reparerer varmepumper',
    ],
    ['Rørlegger med egen bedrift — rør + gründer', 'Rådgiver i VVS — rør + prosjektering'],
    ['Rørkjøp-bedriftene', 'Bravida', 'Lokale rørleggerfirmaer'],
    'Daglig leder rørleggerfirma',
    ['Rørleggerfaget (fagbrev)'],
    ['Kundekontakt er halve jobben: vis at du er ryddig og hyggelig', 'Sommerjobb som hjelper'],
  ),
  anleggsmaskinforer: guide(
    [
      'Gravemaskinfører — graver og planerer',
      'Maskinfører i tunnel — borer og sikrer tunneler',
      'Fører av dumper og hjullaster — flytter masser på store anlegg',
    ],
    ['Maskinfører med GPS og 3D-styring — maskin + teknologi', 'Egen anleggsbedrift — maskin + gründer'],
    ['Mesta', 'Veidekke', 'Statkraft (anlegg)', 'Lokale entreprenører'],
    'Anleggsleder',
    ['Anleggsmaskinførerfaget (fagbrev)'],
    ['Førerkort for lastebil gjør deg mer fleksibel', 'Erfaring fra gård eller skogbruk teller'],
  ),
  byggingenior: guide(
    [
      'Prosjekterende ingeniør — beregner konstruksjoner',
      'Byggeleder — følger opp byggeplassen',
      'Bruingeniør — beregner og følger opp bruer',
    ],
    ['BIM-koordinator — bygg + IT', 'Bærekraftsrådgiver i bygg — bygg + miljø'],
    ['Norconsult', 'Multiconsult', 'COWI', 'Statens vegvesen'],
    'Avdelingsleder konstruksjon',
    ['Bygg (bachelor)', 'Bygg- og miljøteknikk (master)'],
    ['Sommerjobb i et rådgivende ingeniørfirma', 'Lær BIM-verktøy som Revit tidlig'],
  ),
  bilmekaniker: guide(
    [
      'Bilmekaniker på verksted — service og reparasjon av personbiler',
      'Elbil-tekniker — høyvoltsystemer',
      'Mekaniker for tunge kjøretøy — lastebiler, busser og anleggsmaskiner',
    ],
    ['Diagnosetekniker — mekanikk + IT', 'Verkstedsjef — mekanikk + ledelse'],
    ['Møller Bil', 'Bertel O. Steen', 'Tesla', 'Lokale verksteder'],
    'Verkstedsjef',
    ['Bilfaget, lette kjøretøy (fagbrev)'],
    ['Kurs i høyvolt for elbil gjør deg attraktiv', 'Sommerjobb på dekkhotell eller verksted'],
  ),
  industrimekaniker: guide(
    ['Vedlikeholdsmekaniker — holder maskiner i gang', 'Offshore-mekaniker — på plattform', 'Montør — bygger maskiner'],
    ['Vedlikeholdsplanlegger — mekanikk + planlegging', 'Automatiker — mekanikk + elektronikk'],
    ['Equinor', 'Norsk Hydro', 'Aker Solutions', 'Kongsberg Gruppen'],
    'Vedlikeholdsleder',
    ['Industrimekanikerfaget (fagbrev)'],
    ['Lærlingplass i en stor industribedrift gir mange veier videre', 'Vis at du tar sikkerhet på alvor'],
  ),
  maskiningenior: guide(
    [
      'Produktutvikler — designer nye produkter',
      'Prosessingeniør — forbedrer produksjon',
      'Energiingeniør — utvikler løsninger for fornybar energi og strøm',
    ],
    ['Robotingeniør — maskin + IT', 'Innkjøpsingeniør — maskin + økonomi'],
    ['Kongsberg Gruppen', 'Aker Solutions', 'Equinor', 'Nammo'],
    'Teknisk sjef',
    ['Maskiningeniør (bachelor)', 'Produktutvikling og produksjon (master)'],
    ['Studentorganisasjoner som bygger raketter, biler eller roboter', 'Sommerjobb i industri'],
  ),
  flyger: guide(
    [
      'Flyger i flyselskap — rutefly',
      'Helikopterflyger — offshore eller ambulanse',
      'Flyger i Forsvaret — flyr jagerfly, transportfly eller helikopter',
    ],
    ['Flyinstruktør — luftfart + undervisning', 'Flyoperativ leder — luftfart + planlegging'],
    ['Norwegian', 'SAS', 'Widerøe', 'CHC Helikopter Service'],
    'Sjefsflyger',
    ['Flygerutdanning'],
    ['Søk Luftforsvarets flygerutdanning: den er gratis', 'Ta medisinsk sjekk tidlig før du betaler for utdanning'],
  ),

  // Natur
  bonde: guide(
    [
      'Melkebonde — kyr og melk',
      'Grønnsaksbonde — dyrker grønnsaker og bær',
      'Sauebonde — driver med sau, ofte med beite i utmark',
    ],
    ['Gårdsturisme — landbruk + reiseliv', 'Bonde med gårdsbutikk — landbruk + salg'],
    ['Egen gård', 'Tine', 'Nortura', 'Avløserlag'],
    'Gårdbruker',
    ['Landbruk (fagbrev)', 'Agronom'],
    ['Jobb som avløser på flere gårder for å lære', 'Kurs i økonomi for småbedrifter'],
  ),
  veterinar: guide(
    ['Smådyrveterinær — hunder og katter', 'Produksjonsdyrveterinær — gårdsdyr', 'Fiskehelsebiolog — fisk i oppdrett'],
    ['Veterinær i Mattilsynet — veterinær + forvaltning', 'Forsker på dyrehelse — veterinær + forskning'],
    ['Evidensia', 'AniCura', 'Mattilsynet', 'Veterinærinstituttet'],
    'Klinikksjef',
    ['Veterinærmedisin (profesjonsstudium)'],
    ['Deltidsjobb på dyreklinikk eller gård', 'Studieplass i utlandet kan være en vei inn'],
  ),
  dyrepleier: guide(
    [
      'Dyrepleier på klinikk — steller dyr og assisterer veterinæren',
      'Dyrepleier på dyresykehus — døgnvakter',
      'Dyrepasser i dyrepark — fôrer og passer dyr og møter publikum',
    ],
    ['Hundetrener — dyr + veiledning', 'Selger av dyrefôr — dyr + salg'],
    ['Evidensia', 'AniCura', 'Dyreparker'],
    'Klinikkleder',
    ['Dyrefaget (fagbrev)', 'Dyrepleie (bachelor)'],
    ['Frivillig i dyrebeskyttelse eller hundekennel', 'Vis rolig og trygg håndtering av dyr'],
  ),
  anleggsgartner: guide(
    [
      'Anleggsgartner — parker og hager',
      'Grøntanleggsdriver — vedlikehold',
      'Steinlegger — legger brostein, heller og murer',
    ],
    ['Landskapsdesigner — gartner + design', 'Klimatilpasning — gartner + miljø (regnbed og grønne tak)'],
    ['Kommunenes parkvesen', 'Lokale anleggsgartnere'],
    'Anleggsleder',
    ['Anleggsgartnerfaget (fagbrev)'],
    ['Sommerjobb i parkvesenet', 'Lær plantenavn: det gjør inntrykk'],
  ),
  naturforvalter: guide(
    [
      'Viltforvalter — følger med på vilt',
      'Naturveileder i nasjonalpark — viser fram og forteller om naturen',
      'Miljørådgiver i kommunen — passer på natur og miljø i saker og planer',
    ],
    ['Naturkartlegger med droner — natur + teknologi', 'Bærekraftsrådgiver i bedrift — natur + næringsliv'],
    ['Statsforvalteren', 'Miljødirektoratet', 'Statens naturoppsyn', 'NINA'],
    'Miljøvernsjef',
    ['Naturforvaltning (bachelor/master)'],
    ['Feltarbeid som sommerjobb', 'Lær artskunnskap og GIS'],
  ),
  fiskeoppdretter: guide(
    [
      'Røkter på merd — følger med på fisken ute på anlegget',
      'Operatør på settefiskanlegg — tar vare på småfisken før den settes i sjøen',
      'Fôringsoperatør — styrer fôringen fra kamera og datasystemer',
    ],
    ['Fiskehelsetekniker — oppdrett + helse', 'Teknologioperatør — oppdrett + automasjon'],
    ['Mowi', 'Lerøy', 'SalMar'],
    'Driftsleder havbruk',
    ['Akvakulturfaget (fagbrev)'],
    ['Sommerjobb på anlegg er vanlig og gir lærlingplass', 'Båtførerbevis er nyttig'],
  ),
  fisker: guide(
    [
      'Fisker på kystflåten — fisker fra mindre båter nær land',
      'Fisker på havgående fartøy — lange turer på store båter',
      'Skipper — fører båten og leder mannskapet',
    ],
    ['Fisker med egen båt — fiske + gründer', 'Fiskeguide for turister — fiske + reiseliv'],
    ['Rederier i kystflåten', 'Havfiskeflåten'],
    'Skipper',
    ['Fiske og fangst (fagbrev)'],
    ['Sommerjobb om bord er beste test', 'Ta sikkerhetskurs tidlig'],
  ),
  kokk: guide(
    [
      'Restaurantkokk — lager mat i høyt tempo på restaurant',
      'Kantinekokk — faste tider',
      'Kokk på skip eller offshore — lager mat til mannskapet i turnus',
    ],
    ['Matbloggskaper — mat + medier', 'Produktutvikler i matindustri — mat + utvikling'],
    ['Strawberry', 'Scandic', 'ISS', 'Lokale restauranter'],
    'Kjøkkensjef',
    ['Kokkfaget (fagbrev)'],
    ['Helgejobb på kjøkken mens du går på skolen', 'Konkurranser for unge kokker gir synlighet'],
  ),
  baker: guide(
    [
      'Baker i bakeri — baker brød og bakst fra grunnen hver morgen',
      'Konditor — kaker og desserter',
      'Baker i industri — styrer produksjonen av store mengder bakst',
    ],
    ['Bakeri med kafé — bakst + gründer', 'Kakedesigner — bakst + design'],
    ['Baker Hansen', 'Godt Brød', 'Lokale bakerier'],
    'Bakermester',
    ['Bakerfaget eller konditorfaget (fagbrev)'],
    ['Vis bilder av det du lager', 'Helgejobb i bakeri'],
  ),

  // Kreativ
  mobelsnekker: guide(
    [
      'Møbelsnekker — lager møbler etter mål og tegning',
      'Restaurator — fikser gamle møbler',
      'Innredningssnekker — kjøkken og bad',
    ],
    ['Møbeldesigner — snekker + design', 'Egen bedrift med salg på nett — snekker + gründer'],
    ['Lokale snekkerverksteder', 'Kjøkkenprodusenter'],
    'Verkstedleder',
    ['Møbelsnekkerfaget (fagbrev)'],
    ['Lag en portefølje med bilder av arbeidet ditt', 'Delta på håndverksmesser'],
  ),
  'grafisk-designer': guide(
    [
      'Merkevaredesigner — logoer og visuell profil',
      'Emballasjedesigner — designer pakninger som skiller seg ut i hylla',
      'Illustratør — tegner til bøker, aviser og reklame',
    ],
    ['Motion designer — design + film', 'Designer i teknologiselskap — design + IT'],
    ['Designbyråer som Heydays og Snøhetta', 'Reklamebyråer', 'In-house i store merkevarer'],
    'Kreativ leder',
    ['Grafisk design (bachelor)'],
    ['En sterk portefølje teller mer enn karakterer', 'Ta små frilansoppdrag mens du studerer'],
  ),
  arkitekt: guide(
    [
      'Arkitekt for boliger — tegner hus og leiligheter',
      'Landskapsarkitekt — uteområder',
      'Interiørarkitekt — planlegger rom og innredning',
    ],
    ['Arkitekt og BIM-spesialist — arkitektur + IT', 'Bærekraftsarkitekt — arkitektur + miljø'],
    ['Snøhetta', 'Statsbygg', 'Nordic Office of Architecture', 'Mindre arkitektkontorer'],
    'Partner i arkitektkontor',
    ['Arkitektur (master)'],
    ['Portefølje med skisser og modeller', 'Sommerjobb på arkitektkontor'],
  ),
  'ux-designer': guide(
    [
      'UX-designer — brukerreiser og testing',
      'UI-designer — skjermbilder og komponenter',
      'Tjenestedesigner — hele tjenesten, også offline',
    ],
    ['UX-skribent — design + språk', 'Designsystem-utvikler — design + koding'],
    ['NAV', 'Bekk', 'Netlife', 'Kahoot!'],
    'Designleder',
    ['Interaksjonsdesign (bachelor)'],
    ['Portefølje med prosessen, ikke bare ferdige skjermer', 'Sommerjobb i et konsulentselskap'],
  ),
  musiker: guide(
    [
      'Utøvende musiker — spiller konserter og innspillinger',
      'Låtskriver — skriver låter for seg selv og andre',
      'Lydtekniker — styrer lyden på konserter og i studio',
    ],
    ['Kulturskolelærer — musikk + undervisning', 'Musikk til spill og film — musikk + teknologi'],
    ['Kulturskoler', 'Orkestre og teatre', 'Plateselskaper'],
    'Kunstnerisk leder',
    ['Musikk (bachelor)', 'Utøvende kunst'],
    ['Publiser arbeid jevnlig', 'Samarbeid med andre kunstnere gir nettverk'],
  ),
  fotograf: guide(
    [
      'Bryllupsfotograf — fotograferer bryllup og store dager',
      'Pressefotograf — tar bilder til nyheter',
      'Produktfotograf — tar bilder av varer til nettbutikker og reklame',
    ],
    ['Fotograf og videoprodusent — foto + film', 'Bildeansvarlig i en bedrift — foto + kommunikasjon'],
    ['Aviser og mediehus', 'Reklamebyråer', 'Egen bedrift'],
    'Fotosjef',
    ['Fotografi (fagbrev eller bachelor)'],
    ['En nettside med dine beste bilder', 'Assistér en erfaren fotograf'],
  ),
  journalist: guide(
    [
      'Nyhetsjournalist — dekker det som skjer i dag',
      'Podkastprodusent — lager lydsaker og podkaster',
      'Gravejournalist — avdekker det noen vil skjule, i lange saker',
    ],
    ['Datajournalist — journalistikk + data', 'Fagjournalist — journalistikk + et fagfelt'],
    ['NRK', 'Schibsted', 'Amedia', 'TV 2'],
    'Nyhetsredaktør',
    ['Journalistikk (bachelor)'],
    ['Skriv for studentavis eller lokalavis', 'Sommervikariat er døra inn'],
  ),
  kommunikasjonsradgiver: guide(
    [
      'Innholdsprodusent — lager tekst, bilder og video for en bedrift',
      'Presserådgiver — svarer journalister og sender ut nyheter',
      'Rådgiver i sosiale medier — planlegger og følger opp kanalene',
    ],
    ['Intern kommunikasjon — kommunikasjon + HR', 'Kommunikasjon i teknologi — kommunikasjon + IT'],
    ['Kommunikasjonsbyråer som Geelmuyden Kiese og Burson', 'Store bedrifter', 'Offentlig sektor'],
    'Kommunikasjonssjef',
    ['Kommunikasjon (bachelor)', 'Medievitenskap'],
    ['Vis fram tekster og kampanjer du har laget', 'Frivillig kommunikasjonsansvar i en forening'],
  ),
  oversetter: guide(
    [
      'Skjønnlitterær oversetter — oversetter romaner og bøker',
      'Teknisk oversetter — oversetter manualer og fagtekster',
      'Teksting av film og TV — skriver undertekster',
    ],
    ['Lokaliseringsspesialist — språk + IT', 'Tolk — språk + muntlig formidling'],
    ['Oversettelsesbyråer', 'Forlag', 'Strømmetjenester'],
    'Prosjektleder i oversettelsesbyrå',
    ['Oversettelse (bachelor/master)', 'Tolking'],
    ['Lær oversettelsesverktøy (CAT-verktøy)', 'Ta statsautorisert translatøreksamen'],
  ),

  // Forskning
  forsker: guide(
    [
      'Stipendiat — doktorgrad',
      'Forsker ved institutt — forsker på oppdrag for samfunn og næringsliv',
      'Forsker i industri — utvikler nye produkter og metoder i en bedrift',
    ],
    ['Forskningsformidler — forskning + kommunikasjon', 'Innovasjonsrådgiver — forskning + næringsliv'],
    ['NTNU', 'Universitetet i Oslo', 'SINTEF', 'Havforskningsinstituttet'],
    'Professor',
    ['Master i et fag du brenner for', 'Doktorgrad'],
    ['Jobb som vitenskapelig assistent', 'Masteroppgave i en forskningsgruppe'],
  ),
  bioingenior: guide(
    [
      'Bioingeniør i medisinsk biokjemi — analyserer blodprøver',
      'Bioingeniør i mikrobiologi — finner bakterier og virus',
      'Bioingeniør i blodbank — tar imot blodgivere og sikrer trygt blod',
    ],
    ['Bioingeniør i forskning — lab + forskning', 'Kvalitetsrådgiver i lab — lab + kvalitet'],
    ['Fürst', 'Unilabs', 'Oslo universitetssykehus'],
    'Seksjonsleder laboratorium',
    ['Bioingeniørfag (bachelor)'],
    ['Sommerjobb på laboratorium', 'Vis nøyaktighet og ro'],
  ),
  geolog: guide(
    ['Ingeniørgeolog — tunneler og fjell', 'Skredgeolog — vurderer fare for skred', 'Hydrogeolog — grunnvann'],
    ['Geolog og dataanalytiker — geologi + data', 'Mineral- og ressursgeolog — geologi + industri'],
    ['NGU', 'Norconsult', 'Multiconsult', 'Equinor'],
    'Fagleder geologi',
    ['Geologi (master)'],
    ['Feltkurs og sommerjobb i felt', 'Lær GIS'],
  ),
  statistiker: guide(
    [
      'Statistiker i SSB — lager den offisielle statistikken om Norge',
      'Biostatistiker i helse — analyserer tall fra medisinsk forskning',
      'Analytiker i forsikring — regner på risiko og priser',
    ],
    ['Statistiker og utvikler — statistikk + koding', 'Formidler av tall — statistikk + kommunikasjon'],
    ['SSB', 'Folkehelseinstituttet', 'Gjensidige'],
    'Forskningsleder',
    ['Statistikk (master)'],
    ['Lær R eller Python', 'Lag et eget analyseprosjekt med åpne data'],
  ),

  // Økonomi
  regnskapsforer: guide(
    [
      'Regnskapsfører i byrå — fører regnskap for mange kunder',
      'Lønnsansvarlig — sørger for at alle får riktig lønn',
      'Regnskapsfører i en bedrift — holder orden på tallene i én bedrift',
    ],
    ['Regnskap og automatisering — regnskap + IT', 'Rådgiver for små bedrifter — regnskap + rådgivning'],
    ['Azets', 'Accountor', 'Visma', 'PwC'],
    'Daglig leder regnskapsbyrå',
    ['Regnskap og revisjon (bachelor)', 'Regnskapsfaget (fagbrev)'],
    ['Deltidsjobb i regnskapsbyrå mens du studerer', 'Bli autorisert regnskapsfører'],
  ),
  revisor: guide(
    [
      'Revisor i store selskaper — kontrollerer regnskapet til børsnoterte selskaper',
      'Revisor i kommunen — kontrollerer at fellesskapets penger brukes riktig',
      'Bærekraftsrevisor — kontrollerer det bedrifter sier om klima og miljø',
    ],
    ['IT-revisor — revisjon + IT', 'Transaksjonsrådgiver — revisjon + oppkjøp'],
    ['PwC', 'Deloitte', 'EY', 'KPMG'],
    'Partner i revisjonsselskap',
    ['Regnskap og revisjon (master)'],
    ['Sommerinternship i et revisjonsselskap', 'Studentjobb som assistent'],
  ),
  okonom: guide(
    [
      'Finansanalytiker — vurderer selskaper og investeringer',
      'Controller — følger opp budsjett og resultater i en bedrift',
      'Økonomisk rådgiver — gir råd om økonomi til ledelsen eller kunder',
    ],
    ['Bærekraftig finans — økonomi + miljø', 'Økonom i teknologi — økonomi + IT'],
    ['DNB', 'Norges Bank', 'Equinor', 'McKinsey'],
    'Økonomisjef',
    ['Økonomi og administrasjon (master)', 'Samfunnsøkonomi'],
    ['Sommerinternship i bank eller rådgivning', 'Casekonkurranser'],
  ),
  bankradgiver: guide(
    [
      'Personkunderådgiver — hjelper privatpersoner med lån og sparing',
      'Bedriftsrådgiver — hjelper bedrifter med lån og drift',
      'Investeringsrådgiver — gir råd om fond og aksjer',
    ],
    ['Bank og digitale tjenester — bank + IT', 'Bank og bærekraft — bank + miljø'],
    ['DNB', 'SpareBank 1', 'Nordea', 'Handelsbanken'],
    'Banksjef',
    ['Økonomi og administrasjon (bachelor)'],
    ['Deltidsjobb i kundesenter', 'Ta AFR-autorisasjon'],
  ),
  grunder: guide(
    [
      'Gründer i teknologi — bygger en app eller digital tjeneste',
      'Gründer i handel — selger varer i butikk eller på nett',
      'Gründer i tjenester — selger det du kan, f.eks. rådgivning eller håndverk',
    ],
    ['Sosial entreprenør — gründer + samfunn', 'Intraprenør — gründer inne i en stor bedrift'],
    ['Innovasjon Norge', 'Startuplab', 'Gründerhus'],
    'Gründer med erfaring',
    ['Entreprenørskap', 'Økonomi og administrasjon'],
    ['Start lite: test idéen på ekte kunder', 'Delta i ungdomsbedrift eller studentbedrift'],
  ),
  logistikk: guide(
    [
      'Innkjøper — forhandler fram avtaler med leverandører',
      'Lagerplanlegger — sørger for at lageret har det som trengs',
      'Transportkoordinator — planlegger ruter og leveranser',
    ],
    ['Logistikk og data — logistikk + analyse', 'Bærekraftig logistikk — logistikk + miljø'],
    ['Posten Bring', 'Schenker', 'NorgesGruppen', 'Elkjøp'],
    'Logistikksjef',
    ['Logistikk (bachelor)', 'Logistikkfaget (fagbrev)'],
    ['Deltidsjobb på lager', 'Lær Excel godt'],
  ),
  prosjektleder: guide(
    [
      'Prosjektleder i bygg — leder byggeprosjekter fra plan til ferdig bygg',
      'Prosjektleder i IT — leder utvikling av digitale løsninger',
      'Prosjektleder for arrangementer — planlegger konserter, konferanser og festivaler',
    ],
    ['Produktleder — prosjekt + IT', 'Endringsleder — prosjekt + HR'],
    ['Veidekke', 'Statens vegvesen', 'Accenture', 'Sopra Steria'],
    'Prosjektdirektør',
    ['Prosjektledelse (bachelor/master)'],
    ['Lede prosjekter i studentforening', 'Ta et sertifikat som Prince2'],
  ),

  // IT
  utvikler: guide(
    [
      'Frontend-utvikler — lager det brukeren ser på skjermen',
      'Backend-utvikler — lager systemene og dataene bak',
      'Apputvikler — lager apper til mobil',
    ],
    ['Utvikler i helse — IT + helse', 'Utvikler med design — IT + design'],
    ['Bekk', 'Visma', 'NAV IT', 'Kahoot!'],
    'Utviklingsleder',
    ['Informatikk (bachelor)', 'Programmering'],
    ['Egne prosjekter på GitHub', 'Sommerjobb i et konsulentselskap'],
  ),
  'it-drift': guide(
    [
      'IT-tekniker — hjelper brukere med PC, utstyr og tilganger',
      'Nettverkstekniker — setter opp og drifter nettverk',
      'Driftsingeniør i sky — drifter systemer i skyen',
    ],
    ['Drift og sikkerhet — drift + sikkerhet', 'IT-veileder — drift + undervisning'],
    ['Atea', 'Telenor', 'Tietoevry', 'Kommunene'],
    'IT-sjef',
    ['IT-driftsfaget (fagbrev)', 'Drift av datasystemer'],
    ['Ta en Microsoft- eller Cisco-sertifisering', 'Sett opp et hjemmelab'],
  ),
  sikkerhet: guide(
    [
      'Penetrasjonstester — prøver å bryte seg inn for å finne svakheter, med lov',
      'Sikkerhetsanalytiker — overvåker og stopper angrep',
      'Sikkerhetsarkitekt — designer sikre systemer fra starten',
    ],
    ['Sikkerhet og juss — sikkerhet + personvern', 'Sikkerhetsopplæring — sikkerhet + undervisning'],
    ['NSM', 'mnemonic', 'Telenor', 'DNB'],
    'Sikkerhetssjef',
    ['Informasjonssikkerhet (bachelor/master)'],
    ['Capture the flag-konkurranser', 'Bygg et eget testlab'],
  ),
  dataanalytiker: guide(
    [
      'Forretningsanalytiker — gjør tall om til bedre beslutninger',
      'Data scientist — lager modeller og maskinlæring',
      'Dataingeniør — bygger systemene som samler og renser data',
    ],
    ['Analyse og helse — data + helse', 'Analyse og bærekraft — data + miljø'],
    ['DNB', 'Equinor', 'Telenor', 'SSB'],
    'Analysesjef',
    ['Data science', 'Statistikk'],
    ['Lag analyser av åpne data', 'Lær SQL og Python'],
  ),
  spillutvikler: guide(
    [
      'Spillprogrammerer — koder spillmekanikk og grafikk',
      'Leveldesigner — bygger brett og verdener spilleren går gjennom',
      'Spilltester — finner feil og gir tilbakemelding på spillet',
    ],
    ['Spill i undervisning — spill + læring', 'Spill til helse — spill + rehabilitering'],
    ['Funcom', 'Kahoot!', 'Rock Pocket Games'],
    'Spilldirektør',
    ['Spillprogrammering'],
    ['Lag og publiser egne små spill', 'Delta på game jams'],
  ),
};
