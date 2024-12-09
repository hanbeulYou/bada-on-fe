import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const { reset } = useQueryErrorResetBoundary();
  const navigate = useNavigate();

  const handleClickReset = () => {
    reset();
    resetErrorBoundary();
  };

  return (
    <div>
      <p>Error : {error.message}</p>
      <button onClick={handleClickReset}>Reset</button>
      <button onClick={() => navigate('/')}>Home</button>
    </div>
  );
}

function FetchBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default FetchBoundary;
