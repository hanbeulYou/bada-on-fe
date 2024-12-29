import { styled } from 'styled-components';

interface DateButtonProps {
  date: string;
  status: 'selected' | 'valid' | 'invalid';
  onClick: () => void;
}

const DateButton = ({ date, status, onClick }: DateButtonProps) => {
  return (
    <StyledButton status={status} onClick={onClick}>
      {date}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  status: 'selected' | 'valid' | 'invalid';
}>`
  display: flex;
  height: 40px;
  width: 40px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
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

  ${({ theme }) => theme.typography.title_2_bold}
`;

export default DateButton;
