import React from 'react';
import styled from 'styled-components';

interface FooterButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const FooterButton: React.FC<FooterButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <Button onClick={onClick} disabled={disabled}>
      찾아보기
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  height: 56px;
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

  &:disabled {
    color: ${({ theme }) => theme.colors.gray200};
    background-color: ${({ theme }) => theme.colors.gray100};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export default FooterButton;
