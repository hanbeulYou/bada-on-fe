import { styled } from 'styled-components';

import { HourFormatWithAmPmWithoutZero } from '../../utils/timeFormat';
import Icon from '../common/Icon';

interface TimeHeaderButtonProps {
  date: string;
  time: string;
  onClick: () => void;
}

const TimeHeaderButton = ({ date, time, onClick }: TimeHeaderButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <Icon name="chevron-left" width={20} height={20} />
      <TextContainer>
        <DateText>{date}일</DateText>
        <TimeText>{`${HourFormatWithAmPmWithoutZero(time)}시`}</TimeText>
      </TextContainer>
      <Icon name="chevron-right" width={20} height={20} />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: fit-content;
  height: 40px;
  padding: 0 6px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray100};
  box-shadow: 0px 0px 4px 4px rgba(8, 33, 63, 0.16);
`;

const TextContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const DateText = styled.span`
  ${({ theme }) => theme.typography.Title_1_Bold}
  color: ${({ theme }) => theme.colors.primary};
`;

const TimeText = styled.span`
  ${({ theme }) => theme.typography.Title_1_Bold}
  color: ${({ theme }) => theme.colors.gray600};
`;

export default TimeHeaderButton;
