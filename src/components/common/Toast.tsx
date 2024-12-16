import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';
import theme from '../../styles/theme';

interface ToastProps {
  message: string;
  toastType: 'error' | 'warning';
  timeout: number;
  onClose: () => void;
}

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ToastWrapper = styled.div<{
  toastType: 'success' | 'error' | 'warning';
  safeArea: SafeAreaState;
  isClosing: boolean;
}>`
  position: absolute;
  width: 330px;
  bottom: ${({ safeArea }) => safeArea.bottom + 72}px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px;
  border-radius: 4px;
  ${theme.typography.Body}
  color: ${({ toastType }) =>
    toastType === 'warning' ? theme.colors.red400 : theme.colors.white};
  z-index: 1000;
  background-color: ${({ toastType }) =>
    toastType === 'warning' ? 'rgba(8, 33, 63, 0.88)' : theme.colors.red500};

  animation: ${({ isClosing }) => isClosing && fadeOut} 0.3s ease-in-out;
`;

const Toast: React.FC<ToastProps> = ({
  message,
  toastType,
  timeout,
  onClose,
}) => {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 300);
    }, timeout - 300);

    return () => clearTimeout(timer);
  }, [timeout, onClose]);

  return ReactDOM.createPortal(
    <ToastWrapper
      toastType={toastType}
      safeArea={safeAreaState}
      isClosing={isClosing}
    >
      {message}
    </ToastWrapper>,
    document.body,
  );
};

export default Toast;
