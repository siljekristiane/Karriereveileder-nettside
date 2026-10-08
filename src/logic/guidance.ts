import type { Career } from '../data/careers';
import { GUIDES, type Guide } from '../data/guides';
import { FIELDS } from '../data/questions';
import type { Answers } from './route';

export type Contact = { title: string; why: string; search: string };

export type StudyLink = { label: string; href: string; hint: string };

/** Tips by education length: how people usually work their way in. */
const PATH_BY_EDUCATION: Record<string, string[]> = {
  kort: [
    'Søk lærlingplass tidlig: kontakt bedriftene direkte, ikke bare via skolen.',
    'Bruk utplassering (YFF) til å prøve den bedriften du helst vil jobbe i.',
    'Sommerjobb eller helgejobb som hjelper i bransjen gjør lærlingplassen lettere å få.',
    'Har du jobbet i faget en stund, kan du ta fagbrev som praksiskandidat.',
  ],
  bachelor: [
    'Deltidsjobb i bransjen mens du studerer er verdt mer enn en tilfeldig deltidsjobb.',
    'Søk sommerjobb eller sommerinternship etter andre studieår.',
    'Skriv bacheloroppgaven sammen med en arbeidsgiver du vil inn hos.',
    'Et verv i en studentforening viser ansvar og gir nettverk.',
  ],
  master: [
    'Sommerinternship etter fjerde år: mange store arbeidsgivere ansetter fast herfra.',
    'Skriv masteroppgaven i samarbeid med en bedrift eller et forskningsmiljø.',
    'Deltidsjobb som assistent i et relevant miljø gir både erfaring og referanser.',
    'Et semester på utveksling skiller deg ut og gir språk og selvstendighet.',
  ],
};

const STAND_OUT_GENERAL = [
  'Vis hva du har gjort, ikke bare hva du kan: et prosjekt, en portefølje eller et resultat.',
  'Ta kontakt med folk i yrket før du søker. Et navn de kjenner igjen, blir lest først.',
  'Skriv søknaden til den ene arbeidsgiveren, ikke en mal du sender til alle.',
];

const EDUCATION_LABEL: Record<string, string> = {
  kort: 'Fagbrev eller kort utdanning',
  bachelor: 'Bachelor',
  master: 'Master eller lenger',
};

export function guideFor(career: Career): Guide | undefined {
  return GUIDES[career.id];
}

/** The education levels that lead to the career, the user's own choice first. */
export function educationPaths(career: Career, answers: Answers): string[] {
  const levels = career.fits.utdanning ?? [];
  const chosen = answers.utdanning;
  return chosen && levels.includes(chosen) ? [chosen, ...levels.filter((l) => l !== chosen)] : levels;
}

export function pathTips(career: Career, answers: Answers): { label: string; tips: string[] }[] {
  return educationPaths(career, answers).map((level) => ({
    label: EDUCATION_LABEL[level] ?? level,
    tips: PATH_BY_EDUCATION[level] ?? [],
  }));
}

export function standOutTips(career: Career): string[] {
  return [...(guideFor(career)?.standOut ?? []), ...STAND_OUT_GENERAL];
}

export function linkedInPeople(keywords: string): string {
  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(keywords)}`;
}

export function linkedInCompanies(keywords: string): string {
  return `https://www.linkedin.com/search/results/companies/?keywords=${encodeURIComponent(keywords)}`;
}

/** Where the user posts the suggested text themselves. */
export const LINKEDIN_FEED = 'https://www.linkedin.com/feed/';

/** People worth asking, and why: their position says what they can tell you. */
export function contacts(career: Career, role: string): Contact[] {
  const guide = guideFor(career);
  const list: Contact[] = [
    {
      title: `Nyutdannet ${role.toLowerCase()} (1–3 år i jobb)`,
      why: 'Har nylig gått den samme veien og kan si ærlig hva studiet og første jobb var.',
      search: role,
    },
    {
      title: `Erfaren ${role.toLowerCase()}`,
      why: 'Vet hvordan hverdagen er etter mange år, og hvilke arbeidsplasser som er gode.',
      search: role,
    },
  ];
  if (guide) {
    list.push({
      title: guide.lead,
      why: 'Ansetter folk selv og vet hva de ser etter i en søknad.',
      search: guide.lead,
    });
    const employer = guide.employers[0];
    if (employer) {
      list.push({
        title: `Rekrutterer i ${employer}`,
        why: 'Kjenner ledige stillinger, sommerjobber og internship før de blir lyst ut.',
        search: `rekrutterer ${employer}`,
      });
    }
  }
  return list;
}

function fieldLabel(career: Career): string | undefined {
  const id = career.fits.felt?.[0];
  return FIELDS.find((f) => f.id === id)?.label.toLowerCase();
}

function opportunities(level: string | undefined): string {
  if (level === 'kort') return 'lærlingplass, sommerjobb eller en helgejobb';
  if (level === 'master') return 'sommerinternship, deltidsjobb eller et samarbeid om masteroppgaven';
  return 'deltidsjobb, sommerjobb eller internship';
}

/** A suggested LinkedIn post: on the way to the role, open to new opportunities. */
export function linkedInPost(career: Career, role: string, answers: Answers): string {
  const level = educationPaths(career, answers)[0];
  const field = fieldLabel(career);
  return [
    `Jeg er på vei mot å jobbe som ${role.toLowerCase()}${field ? ` innen ${field}` : ''}.`,
    '',
    `Akkurat nå jobber jeg med å komme meg dit, og jeg er åpen for nye muligheter: ${opportunities(level)}.`,
    '',
    'Jobber du med dette selv, eller kjenner du noen som gjør det? Jeg setter stor pris på tips, en kort prat eller et tips om hvem jeg bør snakke med.',
    '',
    `#karriere #${career.name.toLowerCase().replace(/[^a-zæøå]/g, '')} #nyemuligheter`,
  ].join('\n');
}

/** A short message asking someone in the role for a talk. */
export function contactMessage(role: string): string {
  return [
    'Hei [navn]!',
    '',
    `Jeg heter [ditt navn] og ønsker å jobbe som ${role.toLowerCase()}. Jeg så at du er [stilling] i [bedrift], og ble nysgjerrig på veien din dit.`,
    '',
    'Har du 15 minutter til en kort prat, på telefon eller video, en gang de neste ukene? Jeg vil gjerne høre hva du ville gjort hvis du var i mine sko.',
    '',
    'Takk for at du leste!',
    '[ditt navn]',
  ].join('\n');
}

export function studyLinks(career: Career): StudyLink[] {
  const levels = career.fits.utdanning ?? [];
  const term = guideFor(career)?.studies[0] ?? career.name;
  const links: StudyLink[] = [
    {
      label: 'utdanning.no',
      href: 'https://utdanning.no',
      hint: `Les om yrket og finn studier: søk etter «${career.name}».`,
    },
  ];
  if (levels.includes('kort')) {
    links.push({
      label: 'vilbli.no',
      href: 'https://www.vilbli.no',
      hint: `Finn veien til fagbrevet i fylket ditt: «${term}».`,
    });
  }
  if (levels.includes('bachelor') || levels.includes('master')) {
    links.push({
      label: 'Samordna opptak',
      href: 'https://www.samordnaopptak.no',
      hint: `Se studiene og opptakskravene: «${term}».`,
    });
  }
  return links;
}
