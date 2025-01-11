import React, { useContext } from 'react';
import styled from 'styled-components';

import { SafeAreaContext } from '../../context/SafeAreaContext';

interface FooterButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

const FooterButton: React.FC<FooterButtonProps> = ({
  onClick,
  label = '찾아보기',
  disabled = false,
}) => {
  const { state } = useContext(SafeAreaContext);

  return (
    <Button onClick={onClick} disabled={disabled} safeAreaBottom={state.bottom}>
      {label}
    </Button>
  );
};

const Button = styled.button<{ safeAreaBottom: number }>`
  width: 100%;
  height: calc(${({ safeAreaBottom }) => safeAreaBottom}px + 56px);
  padding-bottom: ${({ safeAreaBottom }) => safeAreaBottom}px;
  position: fixed;
  bottom: 0;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue500};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  flex: 1;

  &:disabled {
    color: ${({ theme }) => theme.colors.gray500};
    background-color: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default FooterButton;
