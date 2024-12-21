import styled, { useTheme } from 'styled-components';

import Icon from './Icon';

interface CheckToggleProps {
  isChecked?: boolean;
  handleToggle: () => void;
}

const CheckToggle = ({ isChecked = false, handleToggle }: CheckToggleProps) => {
  const theme = useTheme();

  return (
    <ToggleButton onClick={handleToggle} $isChecked={isChecked}>
      <StyledIcon
        name="check"
        width={12.6}
        height={12.6}
        $color={isChecked ? theme.colors.white : theme.colors.gray300}
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
