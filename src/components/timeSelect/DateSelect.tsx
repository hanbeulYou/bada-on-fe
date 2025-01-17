import { styled } from 'styled-components';

import { Time } from '../../apis/weather/useAvailableTimeQuery';
import { FilterTime } from '../../pages/Home';
import DateButton from '../common/DateButton';

interface DateSelectProps {
  filterTime: FilterTime;
  setFilterTime: React.Dispatch<React.SetStateAction<FilterTime>>;
  availableTimeData: Time[];
}

const DateSelect = ({
  filterTime,
  setFilterTime,
  availableTimeData,
}: DateSelectProps) => {
  const dateLabels = ['어제', '오늘', '내일', '2일 뒤', '3일 뒤'];
  const getButtonStatus = (index: number) => {
    if (availableTimeData[index].date.toString() === filterTime.date.toString())
      return 'selected';
    if (index === 0) return 'invalid';
    return 'valid';
  };

  return (
    <DateSelectContainer>
      {dateLabels.map((label, index) => {
        if (index > 5 || availableTimeData.length < index + 1) return null;
        return (
          <DateButtonContainer key={label}>
            <DateButtonLabel>{label}</DateButtonLabel>
            <DateButton
              date={availableTimeData[index].date.toString().slice(-2)}
              status={getButtonStatus(index)}
              onClick={() => {
                setFilterTime({
                  date: availableTimeData[index].date,
                  hour: availableTimeData[index].hours[0],
                });
              }}
            />
          </DateButtonContainer>
        );
      })}
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
