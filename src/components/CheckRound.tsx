import { useState } from 'react';
import { CHECK_BY_ID, COMPLAINTS, type Complaint } from '../data/checks';
import { fieldTint } from './Crossroad';

type Props = {
  onDone: (checkAnswers: Record<string, string>) => void;
  onReopenDirection: () => void;
  onCancel: () => void;
};

/** Ask what was wrong, then a few concrete checks on the forks it points to. */
export function CheckRound({ onDone, onReopenDirection, onCancel }: Props) {
  const [complaint, setComplaint] = useState<Complaint | undefined>(undefined);
  const [step, setStep] = useState(0);
  const [checkAnswers, setCheckAnswers] = useState<Record<string, string>>({});

  if (!complaint) {
    return (
      <section className="crossroad" aria-labelledby="check-title">
        <p className="eyebrow">Finn avviket</p>
        <h1 id="check-title" className="crossroad__title">Hva stemte ikke med forslagene?</h1>
        <p className="muted">
          Valgene du har gjort, beholdes. Du får noen nye spørsmål om de samme tingene, stilt på en annen måte, så ser vi
          hvor veien tok av.
        </p>
        <div className="paths">
          {COMPLAINTS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`path${c.id === 'vetikke' ? ' path--neutral' : ''}`}
              onClick={() => {
                if (c.reopen === 'direction') onReopenDirection();
                else setComplaint(c);
              }}
            >
              <span className="path__label">{c.label}</span>
              <span className="path__hint">{c.hint}</span>
            </button>
          ))}
        </div>
        <button type="button" className="link-button" onClick={onCancel}>
          ← Tilbake til forslagene
        </button>
      </section>
    );
  }

  const check = CHECK_BY_ID.get(complaint.checks[step]!)!;
  const answer = (value: string) => {
    const next = { ...checkAnswers, [check.id]: value };
    setCheckAnswers(next);
    if (step + 1 < complaint.checks.length) setStep(step + 1);
    else onDone(next);
  };

  return (
    <section className="crossroad" aria-labelledby="check-title">
      <p className="eyebrow">
        Kontrollspørsmål {step + 1} av {complaint.checks.length}
        <span className="tag tag--green">{complaint.label}</span>
      </p>
      <h1 id="check-title" className="crossroad__title">{check.text}</h1>
      <div className="paths">
        {check.options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={`path${checkAnswers[check.id] === o.value ? ' path--chosen' : ''}`}
            data-tint={fieldTint(check.target, o.value)}
            onClick={() => answer(o.value)}
          >
            <span className="path__label">{o.label}</span>
            <span className="path__hint">{o.hint}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className="link-button"
        onClick={() => (step > 0 ? setStep(step - 1) : setComplaint(undefined))}
      >
        ← Tilbake
      </button>
    </section>
  );
}
