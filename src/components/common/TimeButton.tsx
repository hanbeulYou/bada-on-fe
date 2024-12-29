import { styled } from 'styled-components';

interface TimeButtonProps {
  time: string;
  status: 'selected' | 'valid' | 'invalid';
  onClick: () => void;
}

const TimeButton = ({ time, status, onClick }: TimeButtonProps) => {
  return (
    <StyledButton status={status} onClick={onClick}>
      {time}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  status: 'selected' | 'valid' | 'invalid';
}>`
  display: flex;
  width: 76px;
  min-width: 76px;
  padding: 8px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, status }) =>
      status === 'invalid' ? theme.colors.gray500 : theme.colors.primary};
  color: ${({ theme, status }) =>
    status === 'selected'
      ? theme.colors.white
      : status === 'valid'
        ? theme.colors.primary
        : theme.colors.gray500};
  background: ${({ theme, status }) =>
    status === 'selected' ? theme.colors.primary : theme.colors.white};

  ${({ theme }) => theme.typography.Body}
`;

export default TimeButton;
