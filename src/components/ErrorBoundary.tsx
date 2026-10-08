import { Component, type ReactNode } from 'react';
import { clearAnswers } from '../logic/storage';

type Props = { children: ReactNode };
type State = { error: Error | undefined };

/** Shows what went wrong and a way out, instead of an empty page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: undefined };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  reset = () => {
    clearAnswers();
    this.setState({ error: undefined });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;
    return (
      <div className="page">
        <section className="crash" role="alert">
          <h1 className="crossroad__title">Noe gikk galt</h1>
          <p>Siden møtte en feil. Trykk under for å nullstille og starte på nytt.</p>
          <div className="actions">
            <button type="button" className="button" onClick={this.reset}>
              Nullstill og start på nytt
            </button>
          </div>
          <p className="muted">Feilmelding (fint å sende videre hvis det skjer igjen):</p>
          <pre className="crash__detail">{`${error.name}: ${error.message}`}</pre>
        </section>
      </div>
    );
  }
}
