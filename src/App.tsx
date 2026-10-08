import { Signpost } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CareerGuide } from './components/CareerGuide';
import { CheckRound } from './components/CheckRound';
import { Crossroad } from './components/Crossroad';
import { Destinations } from './components/Destinations';
import { Landing } from './components/Landing';
import { RouteMap } from './components/RouteMap';
import { FIELDS, QUESTION_BY_ID } from './data/questions';
import { applyChecks, type Detour } from './logic/check';
import { activeAnswers, nextQuestion, optionLabel, rankCareers, routeQuestions, type Answers } from './logic/route';
import { loadAnswers, saveAnswers } from './logic/storage';

const RESULT_COUNT = 8;

/** The last check round: what it changed, and the route before it, for undo. */
type CheckOutcome = { before: Answers; detours: Detour[] };

export function App() {
  const [answers, setAnswers] = useState<Answers>(loadAnswers);
  // A fork the user walked back to on the map; otherwise the next unanswered one.
  const [revisit, setRevisit] = useState<string | undefined>(undefined);
  const [checking, setChecking] = useState(false);
  const [outcome, setOutcome] = useState<CheckOutcome | undefined>(undefined);
  const [started, setStarted] = useState(false);
  // The career whose "Veien videre" page is open.
  const [openId, setOpenId] = useState<string | undefined>(undefined);

  useEffect(() => saveAnswers(answers), [answers]);

  const route = routeQuestions(answers);
  const current = checking ? undefined : (revisit && QUESTION_BY_ID.get(revisit)) || nextQuestion(answers);
  const answeredCount = Object.keys(activeAnswers(answers)).length;
  const ranked = useMemo(() => rankCareers(answers), [answers]);
  const opened = ranked.find((m) => m.career.id === openId);

  // Each new view starts at the top of the page.
  const view = !started ? 'landing' : checking ? 'check' : current ? current.id : opened ? opened.career.id : 'results';
  useEffect(() => window.scrollTo(0, 0), [view]);

  const choose = (optionId: string) => {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: optionId }));
    setRevisit(undefined);
  };

  const index = current ? route.findIndex((q) => q.id === current.id) : -1;
  const previous = index > 0 ? route[index - 1] : undefined;

  const restart = () => {
    setAnswers({});
    setRevisit(undefined);
    setOutcome(undefined);
    setOpenId(undefined);
    setChecking(false);
    setStarted(true);
  };

  const finishChecks = (checkAnswers: Record<string, string>) => {
    const result = applyChecks(answers, checkAnswers);
    setOutcome({ before: answers, detours: result.detours });
    setAnswers(result.answers);
    setChecking(false);
  };

  const reopenDirection = () => {
    const field = answers.felt;
    setChecking(false);
    setOutcome(undefined);
    setRevisit(field && FIELDS.some((f) => f.id === field) ? field : 'felt');
  };

  const undoChecks = () => {
    if (!outcome) return;
    setAnswers(outcome.before);
    setOutcome(undefined);
  };

  let stage;
  if (checking) {
    stage = (
      <CheckRound onDone={finishChecks} onReopenDirection={reopenDirection} onCancel={() => setChecking(false)} />
    );
  } else if (current) {
    stage = (
      <>
        <Crossroad
          key={current.id}
          question={current}
          step={index + 1}
          total={route.length}
          chosen={answers[current.id]}
          onChoose={choose}
          onBack={previous ? () => setRevisit(previous.id) : undefined}
        />
      </>
    );
  } else if (opened) {
    stage = <CareerGuide key={opened.career.id} match={opened} answers={answers} onBack={() => setOpenId(undefined)} />;
  } else {
    stage = (
      <section className="arrival" aria-labelledby="arrival-title">
        <p className="eyebrow">Fremme</p>
        <h1 id="arrival-title" className="crossroad__title">
          Yrkene som passer veien din
        </h1>
        {outcome && (
          <div className="detours" role="status">
            {outcome.detours.length > 0 ? (
              <>
                <p className="detours__title">Her tok veien av. Vi har rettet opp:</p>
                <ul className="detours__list">
                  {outcome.detours.map((d) => (
                    <li key={d.question}>
                      <span className="detours__step">{QUESTION_BY_ID.get(d.question)?.waypoint}</span>{' '}
                      {d.before && <s>{optionLabel(d.question, d.before)}</s>} →{' '}
                      <strong>{optionLabel(d.question, d.after)}</strong>
                    </li>
                  ))}
                </ul>
                <button type="button" className="link-button" onClick={undoChecks}>
                  Angre endringene
                </button>
              </>
            ) : (
              <p>
                Kontrollspørsmålene stemte med valgene dine. Prøv «Riktig felt, feil retning», eller trykk på et punkt
                på kartet og velg en annen vei.
              </p>
            )}
          </div>
        )}
        <p className="muted">
          Prosenten viser hvor mange av valgene dine yrket passer med. Trykk på et yrke for roller, råd om veien dit,
          folk å snakke med og et forslag til LinkedIn-innlegg.
        </p>
        <Destinations matches={ranked.slice(0, RESULT_COUNT)} onOpen={(m) => setOpenId(m.career.id)} />
        <div className="actions">
          <button type="button" className="button" onClick={() => setChecking(true)}>
            Forslagene passer ikke
          </button>
          <button type="button" className="button button--quiet" onClick={restart}>
            Start på nytt
          </button>
        </div>
      </section>
    );
  }

  return (
    <div className="page">
      <header className="masthead">
        <button
          type="button"
          className="brand"
          onClick={() => {
            setStarted(false);
            setOpenId(undefined);
            setChecking(false);
          }}
        >
          <span className="brand__mark" aria-hidden="true">
            <Signpost size={18} />
          </span>
          Veikartet
        </button>
        <p className="masthead__note">Gratis karriereveileder · ingen innlogging</p>
      </header>

      {!started ? (
        <Landing hasProgress={answeredCount > 0} onStart={() => setStarted(true)} onRestart={restart} />
      ) : (
        <div className="layout">
          <RouteMap
            route={route}
            answers={answers}
            currentId={current?.id}
            onSelect={(id) => {
              setChecking(false);
              setOpenId(undefined);
              setRevisit(id);
            }}
          />
          <main className="stage">{stage}</main>
        </div>
      )}

      <footer className="footer">
        <p>
          Veikartet gir forslag, ikke fasit. Les mer om yrkene og utdanningene på{' '}
          <a href="https://utdanning.no" target="_blank" rel="noreferrer">
            utdanning.no
          </a>
          , og snakk gjerne med en karriereveileder.
        </p>
      </footer>
    </div>
  );
}
