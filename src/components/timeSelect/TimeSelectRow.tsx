import React from 'react';
import { styled } from 'styled-components';

import { Time } from '../../apis/weather/useAvailableTimeQuery';
import { FilterTime } from '../../pages/Home';
import { HourFormatWithAmPmWithoutZero } from '../../utils/timeFormat';
import TimeButton from '../common/TimeButton';

interface TimeSelectRowProps {
  filterTime: FilterTime;
  setFilterTime: React.Dispatch<React.SetStateAction<FilterTime>>;
  availableTimeData: Time[];
}

const TimeSelectRow = ({
  filterTime,
  setFilterTime,
  availableTimeData,
}: TimeSelectRowProps) => {
  const handleTouch = (e: React.TouchEvent) => {
    e.stopPropagation(); // BottomSheet로의 이벤트 전파만 중단
    console.log('x', e);
  };

  return (
    <TimeSelectWindow>
      <TimeSelectRowContainer
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
      >
        {availableTimeData
          .filter(
            timeData =>
              timeData.date.toString().slice(-2) ===
              filterTime.date.toString().slice(-2),
          )
          .map(timeData => {
            const hours = timeData.hours.map(hour => (
              <TimeButton
                key={hour}
                time={`${HourFormatWithAmPmWithoutZero(hour.toString())}시`}
                status={filterTime.hour === hour ? 'selected' : 'valid'}
                onClick={() =>
                  setFilterTime({
                    date: +timeData.date.toString().slice(-2),
                    hour,
                  })
                }
              />
            ));
            return hours;
          })}
      </TimeSelectRowContainer>
    </TimeSelectWindow>
  );
};

const TimeSelectWindow = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  left: 0;
  margin-left: -24px;
`;
// TODO: 좌우 스크롤 안되는 문제 해결 필요
const TimeSelectRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 24px 24px;

  white-space: nowrap;
  & > * {
    flex: 0 0 auto;
    min-width: 74px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default TimeSelectRow;
