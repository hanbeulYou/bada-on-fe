import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface TimeFlowProps {
  defaultTime: number;
  setState: (value: number) => void;
}

const TimeFlow: React.FC<TimeFlowProps> = ({ defaultTime, setState }) => {
  const getDate = (index: number) => {
    const today = dayjs();
    return today.add(index, 'day');
  };

  const getDayOfWeek = (index: number) => {
    const dateEnum = {
      Mon: '월',
      Tue: '화',
      Wed: '수',
      Thu: '목',
      Fri: '금',
      Sat: '토',
      Sun: '일',
    };
    const date = getDate(index);
    return dateEnum[date.format('ddd') as keyof typeof dateEnum];
  };

  const timeRef = useRef(defaultTime);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    setScrollValue(defaultTime);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      setScrollValue(Math.round(timeRef.current + scrollLeft * 0.24));
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      setState(scrollValue);
    }, 300);

    return () => clearTimeout(debounce);
  }, [scrollValue, setState]);

  return (
    <Container>
      {/* TODO: 여기도 맨 왼쪽에 화살표 Icon Z-index 빵빵하게 넣어서 만들어줘야 함 */}
      <VisibleArea ref={scrollRef} onScroll={handleScroll}>
        <ScrollArea>
          <PlaceHolder timePassed={(timeRef.current * 100) / 24 - 50} />
          {Array.from({ length: 10 }).map((_, index) => (
            <Item key={index}>
              <ItemDate>
                <span>{getDate(index).date()}</span>
                <span>{getDayOfWeek(index)}</span>
              </ItemDate>
              <ItemTime>
                <span>4</span>
                <span>12</span>
                <span>20</span>
              </ItemTime>
            </Item>
          ))}

          <RightPlaceHolder />
        </ScrollArea>
      </VisibleArea>
    </Container>
  );
};

const Container = styled.div`
  width: 375px;
  height: 48px;
  overflow: hidden;
`;

const VisibleArea = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const ScrollArea = styled.div`
  display: flex;
  width: max-content;
  gap: 1px;
`;

const PlaceHolder = styled.div<{ timePassed: number }>`
  width: calc(
    135.5px - ${({ timePassed }) => (isNaN(timePassed) ? 0 : timePassed)}px
  );
  height: 48px;
`;

const RightPlaceHolder = styled.div`
  width: 180px;
  height: 48px;
`;

const Item = styled.div`
  padding: 4px 10px;
  width: 100px;
  height: 48px;
  background-color: ${({ theme }) => theme.colors.gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ItemDate = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.gray700};
`;

const ItemTime = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.typography.Label};
  color: ${({ theme }) => theme.colors.gray300};
`;

export default TimeFlow;
