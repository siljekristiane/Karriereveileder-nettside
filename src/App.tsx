import { useEffect, useMemo, useState } from 'react';
import { CheckRound } from './components/CheckRound';
import { Crossroad } from './components/Crossroad';
import { Destinations } from './components/Destinations';
import { RouteMap } from './components/RouteMap';
import { FIELDS, QUESTION_BY_ID } from './data/questions';
import { applyChecks, type Detour } from './logic/check';
import { activeAnswers, nextQuestion, optionLabel, rankCareers, routeQuestions, type Answers } from './logic/route';
import { loadAnswers, saveAnswers } from './logic/storage';

const PREVIEW_COUNT = 5;
const RESULT_COUNT = 8;

/** The last check round: what it changed, and the route before it, for undo. */
type CheckOutcome = { before: Answers; detours: Detour[] };

export function App() {
  const [answers, setAnswers] = useState<Answers>(loadAnswers);
  // A fork the user walked back to on the map; otherwise the next unanswered one.
  const [revisit, setRevisit] = useState<string | undefined>(undefined);
  const [checking, setChecking] = useState(false);
  const [outcome, setOutcome] = useState<CheckOutcome | undefined>(undefined);

  useEffect(() => saveAnswers(answers), [answers]);

  const route = routeQuestions(answers);
  const current = checking ? undefined : (revisit && QUESTION_BY_ID.get(revisit)) || nextQuestion(answers);
  const answeredCount = Object.keys(activeAnswers(answers)).length;
  const ranked = useMemo(() => rankCareers(answers), [answers]);

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
    stage = <CheckRound onDone={finishChecks} onReopenDirection={reopenDirection} onCancel={() => setChecking(false)} />;
  } else if (current) {
    stage = (
      <>
        {answeredCount === 0 && (
          <p className="intro">
            Hvilken jobb passer deg? Start med fagfeltet som frister mest, velg en konkret retning, og gå så resten av
            veien ett veiskille om gangen. Underveis ser du hvilke yrker du nærmer deg.
          </p>
        )}
        <Crossroad
          key={current.id}
          question={current}
          step={index + 1}
          total={route.length}
          chosen={answers[current.id]}
          onChoose={choose}
          onBack={previous ? () => setRevisit(previous.id) : undefined}
        />
        <Destinations variant="preview" matches={answeredCount === 0 ? [] : ranked.slice(0, PREVIEW_COUNT)} />
      </>
    );
  } else {
    stage = (
      <section className="arrival" aria-labelledby="arrival-title">
        <p className="eyebrow">Fremme</p>
        <h1 id="arrival-title" className="crossroad__title">Yrkene som passer veien din</h1>
        {outcome && (
          <div className="detours" role="status">
            {outcome.detours.length > 0 ? (
              <>
                <p className="detours__title">Her tok veien av. Vi har rettet opp:</p>
                <ul className="detours__list">
                  {outcome.detours.map((d) => (
                    <li key={d.question}>
                      <span className="detours__step">{QUESTION_BY_ID.get(d.question)?.waypoint}</span>{' '}
                      {d.before && <s>{optionLabel(d.question, d.before)}</s>} → <strong>{optionLabel(d.question, d.after)}</strong>
                    </li>
                  ))}
                </ul>
                <button type="button" className="link-button" onClick={undoChecks}>
                  Angre endringene
                </button>
              </>
            ) : (
              <p>
                Kontrollspørsmålene stemte med valgene dine. Prøv «Riktig felt, feil retning», eller trykk på et punkt på
                kartet og velg en annen vei.
              </p>
            )}
          </div>
        )}
        <p className="muted">
          Prosenten viser hvor mange av valgene dine yrket passer med. Trykk på et punkt på kartet for å prøve en annen vei.
        </p>
        <Destinations variant="result" matches={ranked.slice(0, RESULT_COUNT)} />
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
        <a className="brand" href="./">
          <span className="brand__mark" aria-hidden="true">T</span>
          Veikartet
        </a>
        <p className="masthead__note">Gratis karriereveileder · ingen innlogging</p>
      </header>

      <div className="layout">
        <RouteMap
          route={route}
          answers={answers}
          currentId={current?.id}
          onSelect={(id) => {
            setChecking(false);
            setRevisit(id);
          }}
        />
        <main className="stage">{stage}</main>
      </div>

      <footer className="footer">
        <p>
          Veikartet gir forslag, ikke fasit. Les mer om yrkene og utdanningene på{' '}
          <a href="https://utdanning.no" target="_blank" rel="noreferrer">utdanning.no</a>, og snakk gjerne med en
          karriereveileder.
        </p>
      </footer>
    </div>
  );
}
