import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import theme from '../../styles/theme';

interface ToastProps {
  message: string;
  toastType: 'error' | 'warning';
  timeout: number;
  onClose: () => void;
}

const ToastWrapper = styled.div<{ toastType: 'success' | 'error' | 'warning' }>`
  position: absolute;
  width: calc(100vw - 45px);
  bottom: 82px;
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
`;

const Toast: React.FC<ToastProps> = ({
  message,
  toastType,
  timeout,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onClose]);

  return ReactDOM.createPortal(
    <ToastWrapper toastType={toastType}>{message}</ToastWrapper>,
    document.body,
  );
};

export default Toast;
