import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Icon from './common/Icon';
import TimeFlow from './TimeFlow';

interface FooterTimerProps {
  pickHour: number;
  setPickHour: React.Dispatch<React.SetStateAction<number>>;
  defaultTime: number;
}
const FooterTimer: React.FC<FooterTimerProps> = ({
  pickHour,
  setPickHour,
  defaultTime,
}) => {
  return ReactDOM.createPortal(
    <Footer>
      <TimerWrapper>
        <Icon name="clock" />
        <Time>{pickHour % 24}:00</Time>
        <Triangle />
      </TimerWrapper>
      <TimeFlowContainer>
        <TimeFlow setState={setPickHour} defaultTime={defaultTime} />
      </TimeFlowContainer>
    </Footer>,
    document.body,
  );
};

export default FooterTimer;

const Footer = styled.div`
  position: fixed;
  isolation: isolate;
  bottom: 0px;
  z-index: 100;
`;

const TimerWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.gray600};
  color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: center;
`;

const Time = styled.span`
  display: flex;
  margin: 0 8px;
`;

const Triangle = styled.div`
  position: absolute;
  width: 0;
  height: 0;
  bottom: -7px;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 8px solid ${({ theme }) => theme.colors.gray600};
`;

const TimeFlowContainer = styled.div`
  display: flex;
`;
