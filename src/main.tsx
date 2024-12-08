import * as Sentry from '@sentry/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App.tsx';
import GlobalStyle from './styles/GlobalStyle.ts';
import theme from './styles/theme.ts';

Sentry.init({
  dsn: 'https://f956924d307031f7f16ab6f58dbe8538@o4508425511567360.ingest.us.sentry.io/4508425513074688',
  integrations: [],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
