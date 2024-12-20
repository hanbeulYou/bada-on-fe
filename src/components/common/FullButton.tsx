import React from 'react';
import styled from 'styled-components';

interface FooterButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label: string;
  isPrimary?: boolean;
}

const FooterButton: React.FC<FooterButtonProps> = ({
  onClick,
  label,
  isPrimary = true,
  disabled = false,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled} isPrimary={isPrimary}>
      {label}
    </Button>
  );
};

const Button = styled.button<{ isPrimary: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  color: ${({ theme, isPrimary }) =>
    isPrimary ? theme.colors.white : theme.colors.gray700};
  background-color: ${({ theme, isPrimary }) =>
    isPrimary ? theme.colors.blue500 : theme.colors.white};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.5);
  border: ${({ theme, isPrimary }) =>
    isPrimary ? 'none' : `1px solid ${theme.colors.gray100}`};
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.colors.gray500};
    background-color: ${({ theme }) => theme.colors.gray300};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default FooterButton;
