import { ClerkProvider } from '@clerk/clerk-react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import fallback from './components/FallbackComponent';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import AppRouter from './routes/Router';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key!');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={fallback}>
      <AuthProvider>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <AppRouter />
        </ClerkProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
