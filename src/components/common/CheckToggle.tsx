import { useState } from 'react';
import styled, { useTheme } from 'styled-components';

import Icon from './Icon';

interface CheckToggleProps {
  isChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckToggle = ({ isChecked = false, onChange }: CheckToggleProps) => {
  const [checked, setChecked] = useState(isChecked);
  const theme = useTheme();

  const handleToggle = () => {
    const newValue = !checked;
    setChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <ToggleButton onClick={handleToggle} $isChecked={checked}>
      <StyledIcon
        name="check"
        width={12.6}
        height={12.6}
        $color={checked ? theme.colors.white : theme.colors.gray300}
      />
    </ToggleButton>
  );
};

const ToggleButton = styled.button<{ $isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 9px;
  border: none;
  background-color: ${({ theme, $isChecked }) =>
    $isChecked ? theme.colors.blue500 : theme.colors.gray100};
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const StyledIcon = styled(Icon)<{ $color: string }>`
  color: ${({ $color }) => $color};
`;

export default CheckToggle;
