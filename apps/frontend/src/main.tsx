import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router.tsx';
import './index.css';
import { ThemeProvider } from './components/theme/theme-provider.tsx';
import { QueryClientProvider } from './components/QueryClientProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
