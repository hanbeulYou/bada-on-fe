import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Details } from '../apis/weather/useWeatherQuery';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';

import Icon from './common/Icon';

interface FooterTimerProps {
  detailData: Details;
  detailDataLength: number;
  timeIndex: number;
  setTimeIndex: React.Dispatch<React.SetStateAction<number>>;
  currentHour: Date;
}
const FooterTimer: React.FC<FooterTimerProps> = ({
  detailData,
  detailDataLength,
  timeIndex,
  setTimeIndex,
  // currentHour,
}) => {
  const { state: safeAreaState } = useContext(SafeAreaContext);

  const formatDate = (date: Details) => {
    // const newDate = new Date(date);
    // newDate.setHours(newDate.getHours() + timeIndex);

    // const year = newDate.getFullYear();
    // const month = String(newDate.getMonth() + 1).padStart(2, '0');
    // const day = String(newDate.getDate()).padStart(2, '0');
    // const hours = String(newDate.getHours()).padStart(2, '0');

    const year = date.date.toString().slice(0, 4);
    const month = date.date.toString().slice(4, 6);
    const day = date.date.toString().slice(6, 8);
    const hours = date.time.toString().slice(0, 2);

    return `${year}.${month}.${day} ${hours}:00`;
  };

  const handleTimeIndex = (value: number) => {
    if (timeIndex + value < 0 || timeIndex + value > detailDataLength - 1)
      return;
    setTimeIndex(prev => prev + value);
  };

  return ReactDOM.createPortal(
    <Footer safeArea={safeAreaState}>
      <TimeFlowContainer safeArea={safeAreaState}>
        <Row>
          {Array.from({ length: detailDataLength }).map((_, index) => (
            <TimeBlock
              key={index}
              filled={index <= timeIndex}
              onClick={() => {
                setTimeIndex(index);
              }}
            />
          ))}
        </Row>
      </TimeFlowContainer>
      <TimerWrapper safeArea={safeAreaState}>
        <Button value={-1} onClick={() => handleTimeIndex(-1)}>
          <Icon name="chevron-left" />
        </Button>
        <Time>{formatDate(detailData)}</Time>
        <Button value={1} onClick={() => handleTimeIndex(1)}>
          <Icon name="chevron-right" />
        </Button>
      </TimerWrapper>
    </Footer>,
    document.body,
  );
};

export default FooterTimer;

const Footer = styled.div<{ safeArea: SafeAreaState }>`
  width: 100%;
  position: fixed;
  isolation: isolate;
  bottom: 0px;
  z-index: 100;
  padding-bottom: ${({ safeArea }) => safeArea.bottom}px;
  background-color: #e0eaf6;
`;

const TimerWrapper = styled.div<{ safeArea: SafeAreaState }>`
  display: flex;
  position: relative;
  width: 100%;
  height: 48px;
  color: ${({ theme }) => theme.colors.blue700};
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Time = styled.span`
  display: flex;
  margin: 0 8px;
  ${({ theme }) => theme.typography.Title_2_Bold};
`;

const TimeFlowContainer = styled.div<{ safeArea: SafeAreaState }>`
  display: flex;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  gap: 0;
`;

const TimeBlock = styled.div<{ filled: boolean }>`
  flex: 1;
  height: 8px;
  background-color: ${({ filled, theme }) =>
    filled ? theme.colors.primary : theme.colors.gray100};
  margin: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;
