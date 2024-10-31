import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import DoughnutChart from './chart/Doughnut';
import TimeFlow from './TimeFlow';

// 아직 미완성이지만, 지도 위에 뜨는 슬라이딩이 가능한 디테일 정보입니다.
interface BottomSheetProps {
  title: string;
  alert?: string;
  dangerValue: number;
  recommends?: { title: string; description: string }[];
  now: number;
  onClosed?: () => void;
  onFull?: () => void;
  onMiddle?: () => void;
  isFull: boolean;
}

function BottomSheet({
  title,
  alert,
  dangerValue,
  recommends,
  now,
  onClosed,
  onFull,
  onMiddle,
  isFull,
}: BottomSheetProps) {
  const [position, setPosition] = useState(-400);
  const [isFooterVisible, setFooterVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const initialPosition = useRef<number>(-400);

  const [time, setTime] = useState(0);

  useEffect(() => setTime(now), []);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;
    const deltaY = startY.current - e.touches[0].clientY;

    let newPosition = position + deltaY;

    // 하단 위치
    if (newPosition < -800) newPosition = -800;
    // 상단 위치
    if (newPosition > -91) newPosition = -91;

    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    if (position >= -91) {
      setPosition(-91);
      if (onFull) onFull();
    } else if (position < -700) {
      setPosition(-800);
      setFooterVisible(false);
      if (onClosed) {
        setTimeout(() => {
          if (onClosed) {
            onClosed();
          }
        }, 300);
      }
    } else {
      if (onMiddle) {
        onMiddle();
      }
      setPosition(initialPosition.current);
    }
    startY.current = null;
  };

  return (
    <Container
      ref={containerRef}
      style={{ bottom: `${position}px` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      isFull={isFull}
    >
      <HandlerWrapper>
        <Handler />
      </HandlerWrapper>
      <Header>
        <Title>{title}</Title>
        {alert && <Alert>{alert}</Alert>}
      </Header>
      <DoughnutChart chartValue={dangerValue} />
      <RecommendContainer>
        {recommends?.map((recommend, index) => (
          <RecommendItem key={index}>
            <RecommendTitleWrapper>
              <RecommendTitle>{recommend.title}</RecommendTitle>
            </RecommendTitleWrapper>
            <RecommendDescription>{recommend.description}</RecommendDescription>
          </RecommendItem>
        ))}
      </RecommendContainer>
      {isFooterVisible && (
        <Footer>
          {/* TODO: 앞에 시계 아이콘 넣어주기 */}
          <TimerWrapper>
            <Time>{time % 24}:00</Time>
            <Triangle />
          </TimerWrapper>
          <TimeFlowContainer>
            <TimeFlow setState={setTime} defaultTime={now} />
          </TimeFlowContainer>
        </Footer>
      )}
    </Container>
  );
}

const Container = styled.div<{ isFull: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 0;
  right: 0;
  z-index: 1;
  height: 100vh;
  width: 375px;
  padding: 14px 24px 0px 24px;
  background-color: #fafafa;
  border: ${props => !props.isFull && '1px solid #e0e0e0'};
  border-radius: ${props => !props.isFull && '28px 28px 0 0'};
  transition: bottom 0.5s ease;

  box-shadow: ${props =>
    !props.isFull && '0px -2px 4px 0px rgba(0, 0, 0, 0.16)'};
`;

const HandlerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6px;
  margin-bottom: 20px;
`;

const Handler = styled.div`
  height: 6px;
  width: 45px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 327px;
  height: 38px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.Heading_2};
  color: ${({ theme }) => theme.colors.blue500};
`;

const Alert = styled.div`
  display: flex;
  max-width: 112px;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.red500};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.Label};
  overflow-wrap: break-word;
  word-break: break-word;
  text-align: center;
`;

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 8px;
  margin-top: 34px;
`;

const RecommendItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RecommendTitleWrapper = styled.div`
  width: 72px;
`;

const RecommendTitle = styled.div`
  display: flex;
  width: fit-content;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.blue500};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.blue500};
  ${({ theme }) => theme.typography.Label};
`;

const RecommendDescription = styled.div`
  ${({ theme }) => theme.typography.Label};
  color: ${({ theme }) => theme.colors.gray700};
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

const Footer = styled.div`
  position: fixed;
  isolation: isolate;
  bottom: 0px;
`;

export default BottomSheet;
