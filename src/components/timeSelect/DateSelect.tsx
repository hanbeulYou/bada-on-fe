import { styled } from 'styled-components';

import DateButton from '../common/DateButton';

const DateSelect = () => {
  return (
    <DateSelectContainer>
      <DateButtonContainer>
        <DateButtonLabel>어제</DateButtonLabel>
        <DateButton date="17" status="invalid" onClick={() => {}} />
      </DateButtonContainer>
      <DateButtonContainer>
        <DateButtonLabel>오늘</DateButtonLabel>
        <DateButton date="18" status="selected" onClick={() => {}} />
      </DateButtonContainer>
      <DateButtonContainer>
        <DateButtonLabel>내일</DateButtonLabel>
        <DateButton date="19" status="valid" onClick={() => {}} />
      </DateButtonContainer>
      <DateButtonContainer>
        <DateButtonLabel>2일 뒤</DateButtonLabel>
        <DateButton date="20" status="valid" onClick={() => {}} />
      </DateButtonContainer>
      <DateButtonContainer>
        <DateButtonLabel>3일 뒤</DateButtonLabel>
        <DateButton date="21" status="valid" onClick={() => {}} />
      </DateButtonContainer>
    </DateSelectContainer>
  );
};

const DateSelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const DateButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

const DateButtonLabel = styled.span`
  ${({ theme }) => theme.typography.Label}
  color: ${({ theme }) => theme.colors.gray500};
`;

export default DateSelect;
