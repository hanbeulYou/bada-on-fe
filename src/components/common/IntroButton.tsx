import React from 'react';
import { styled } from 'styled-components';

import { Label, LABEL_MAPPING } from '../../consts/label';

interface IntroButtonProps {
  label: Label;
  isClicked: boolean;
  onClick: (label: Label) => void;
  disabled?: boolean;
}

const IntroButton: React.FC<IntroButtonProps> = ({
  label,
  isClicked,
  onClick,
  disabled = false,
}) => {
  return (
    <Button
      onClick={() => onClick(label)}
      isClicked={isClicked}
      label={label}
      disabled={disabled}
    >
      {label}
      {disabled ? (
        <>
          <br />
          <DisabledText>오픈예정</DisabledText>
        </>
      ) : null}
    </Button>
  );
};

const Button = styled.button<{ isClicked: boolean; label: string }>`
  width: 157.5px;
  height: 60px;
  border-radius: 8px;
  ${({ theme, isClicked, label }) => {
    if (isClicked) {
      return `
        border: 1px solid ${theme.colors[LABEL_MAPPING[label] as keyof typeof theme.colors] || theme.colors.gray300};
        color: ${theme.colors[LABEL_MAPPING[label] as keyof typeof theme.colors] || theme.colors.gray300};
        background-color: ${theme.colors.white};
      `;
    }
    return `
      border: none;
      background-color: ${theme.colors.white};
      color: ${theme.colors.gray300};
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.06);
    `;
  }}
  ${({ theme }) => theme.typography.Title_2};

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray200};
    box-shadow: none;
  }
`;

const DisabledText = styled.span`
  ${({ theme }) => theme.typography.Label};
`;

export default IntroButton;
