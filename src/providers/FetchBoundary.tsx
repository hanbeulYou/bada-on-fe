import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from '../components/boundary/ErrorFallback';
import SuspenseFallback from '../components/boundary/SuspenseFallback';

function Fallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const { reset } = useQueryErrorResetBoundary();

  const handleClickReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <ErrorFallback
      message={error.message}
      onRetryClick={handleClickReset}
      onContactClick={() => window.open('mailto:official.badaon@gmail.com')}
    />
  );
}

function FetchBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Suspense fallback={<SuspenseFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default FetchBoundary;
