import { useEffect, useMemo, useState } from 'react';
import { Crossroad } from './components/Crossroad';
import { Destinations } from './components/Destinations';
import { RouteMap } from './components/RouteMap';
import { QUESTION_BY_ID } from './data/questions';
import { activeAnswers, nextQuestion, rankCareers, routeQuestions, type Answers } from './logic/route';
import { loadAnswers, saveAnswers } from './logic/storage';

const PREVIEW_COUNT = 5;
const RESULT_COUNT = 8;

export function App() {
  const [answers, setAnswers] = useState<Answers>(loadAnswers);
  // A fork the user walked back to on the map; otherwise the next unanswered one.
  const [revisit, setRevisit] = useState<string | undefined>(undefined);

  useEffect(() => saveAnswers(answers), [answers]);

  const route = routeQuestions(answers);
  const current = (revisit && QUESTION_BY_ID.get(revisit)) || nextQuestion(answers);
  const done = current === undefined;
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
  };

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
        <RouteMap route={route} answers={answers} currentId={current?.id} onSelect={setRevisit} />

        <main className="stage">
          {current ? (
            <>
              {answeredCount === 0 && (
                <p className="intro">
                  Hvilken jobb passer deg? Gå veien ett veiskille om gangen. Underveis ser du hvilke yrker du
                  nærmer deg, og du kan alltid gå tilbake på kartet og velge en annen vei.
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
          ) : (
            <section className="arrival" aria-labelledby="arrival-title">
              <p className="eyebrow">Fremme</p>
              <h1 id="arrival-title" className="crossroad__title">Yrkene som passer veien din</h1>
              <p className="muted">
                Prosenten viser hvor mange av valgene dine yrket passer med. Trykk på et punkt på kartet for å
                prøve en annen vei.
              </p>
              <Destinations variant="result" matches={ranked.slice(0, RESULT_COUNT)} />
              <button type="button" className="button" onClick={restart}>
                Start på nytt
              </button>
            </section>
          )}
        </main>
      </div>

      <footer className="footer">
        <p>
          Veikartet gir forslag, ikke fasit. Les mer om yrkene og utdanningene på{' '}
          <a href="https://utdanning.no" target="_blank" rel="noreferrer">utdanning.no</a>, og snakk gjerne med en
          karriereveileder{done ? '' : ' når du er fremme'}.
        </p>
      </footer>
    </div>
  );
}
