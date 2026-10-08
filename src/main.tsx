import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import '@fontsource/bricolage-grotesque/latin-600.css';
import '@fontsource/bricolage-grotesque/latin-800.css';
import '@fontsource/atkinson-hyperlegible/latin-400.css';
import '@fontsource/atkinson-hyperlegible/latin-700.css';
import './styles.css';
import { App } from './App';
import { ErrorBoundary } from './components/ErrorBoundary';

// Reuse the root if the script runs twice in the same page (a host that swaps in
// a new version without reloading); two roots on one element break React.
const container = document.getElementById('root')!;
const host = container as HTMLElement & { __veikartetRoot?: Root };
host.__veikartetRoot ??= createRoot(container);
host.__veikartetRoot.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
