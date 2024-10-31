import React from 'react';
import styled from 'styled-components';

import { DISABLED_LABELS, Label, LABEL_MAPPING } from '../../consts/label';
import theme from '../../styles/theme';

interface FilterButtonProps {
  label: Label;
  onClick?: () => void;
  isClicked: boolean;
}

const Button = styled.button<{ isClicked: boolean; label: Label }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: ${props =>
    props.isClicked
      ? theme.colors[LABEL_MAPPING[props.label] as keyof typeof theme.colors] ||
        theme.colors.gray300
      : theme.colors.white};
  color: ${props =>
    props.isClicked ? props.theme.colors.white : props.theme.colors.gray300};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.06);
  ${({ theme }) => theme.typography.Body_Bold};
  cursor: pointer;

  &:disabled {
    background-color: ${theme.colors.gray100};
    color: ${theme.colors.gray200};
    cursor: not-allowed;
  }
`;

// 검색바 바로 아래에 떠있는 필터 버튼입니다.
const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  onClick,
  isClicked,
}) => {
  return (
    <Button
      onClick={onClick}
      isClicked={isClicked}
      label={label}
      disabled={DISABLED_LABELS.includes(label)}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
