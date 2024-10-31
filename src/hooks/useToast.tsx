import { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

import Toast from '../components/common/Toast';

interface ToastOptions {
  message: string;
  toastType: 'error' | 'warning';
  timeout: number;
}

interface ToastItem extends ToastOptions {
  id: string;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    ({ message, toastType, timeout }: ToastOptions) => {
      const id = Math.random().toString(36).substr(2, 9);
      setToasts(prevToasts => [
        ...prevToasts,
        { id, message, toastType, timeout },
      ]);

      setTimeout(() => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
      }, timeout);
    },
    [],
  );

  const renderToasts = () => {
    const container = document.getElementById('toast-root');
    if (!container) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'toast-root';
      document.body.appendChild(toastContainer);
      createRoot(toastContainer);
    }

    return toasts.map(({ id, message, toastType, timeout }) => (
      <Toast
        key={id}
        message={message}
        toastType={toastType}
        timeout={timeout}
        onClose={() =>
          setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id))
        }
      />
    ));
  };

  return { showToast, renderToasts };
};

export default useToast;
