import { ArrowRight, Compass, Route, Signpost } from 'lucide-react';

type Props = {
  hasProgress: boolean;
  onStart: () => void;
  onRestart: () => void;
};

const STEPS = [
  {
    icon: Compass,
    title: 'Velg fagfelt og retning',
    text: 'Start bredt med fagfeltet som frister mest, og velg så en konkret retning i det.',
  },
  {
    icon: Signpost,
    title: 'Gå veien',
    text: 'Ett veiskille om gangen: team eller alene, stor eller liten arbeidsplass, inne eller ute, og noen til.',
  },
  {
    icon: Route,
    title: 'Få veien videre',
    text: 'Se yrkene som passer, konkrete roller i dem, og hvordan du kommer deg dit.',
  },
];

const YOU_GET = [
  'Yrker som passer valgene dine, og hvorfor',
  'Konkrete roller, og ideer til å lage din egen',
  'Råd om internship, deltidsjobb, sommerjobb og studier',
  'Hvem det er lurt å snakke med, og en melding du kan sende',
  'Bedrifter å følge, og et forslag til LinkedIn-innlegg',
];

export function Landing({ hasProgress, onStart, onRestart }: Props) {
  return (
    <main className="landing">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">Gratis karriereveileder</p>
        <h1 id="hero-title" className="hero__title">
          Finn veien til en jobb som passer deg
        </h1>
        <p className="hero__lead">
          Veikartet er en gratis karriereveileder for deg som lurer på hva du skal bli, eller vil bytte retning. Du
          svarer på noen enkle valg, og får forslag til yrker og roller, og en konkret plan for hvordan du kommer dit.
        </p>
        <div className="actions">
          <button type="button" className="button button--big" onClick={onStart}>
            {hasProgress ? 'Fortsett der du slapp' : 'Trykk her for å starte'}{' '}
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          {hasProgress && (
            <button type="button" className="button button--quiet button--big" onClick={onRestart}>
              Start på nytt
            </button>
          )}
        </div>
        <p className="muted">Tar rundt tre minutter · ingen innlogging · svarene blir bare i nettleseren din</p>
      </section>

      <section className="how" aria-labelledby="how-title">
        <h2 id="how-title" className="guide__title">
          Slik fungerer det
        </h2>
        <ol className="how__steps">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="how__step">
              <span className="how__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3 className="how__title">{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="get" aria-labelledby="get-title">
        <h2 id="get-title" className="guide__title">
          Dette får du til slutt
        </h2>
        <ul className="tips">
          {YOU_GET.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
