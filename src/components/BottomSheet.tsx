import React, { useState, useRef } from 'react';
import styled from 'styled-components';

// 아직 미완성이지만, 지도 위에 뜨는 슬라이딩이 가능한 디테일 정보입니다.
function BottomSheet({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState(-400);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const initialPosition = useRef<number>(-400);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;
    const deltaY = startY.current - e.touches[0].clientY;

    let newPosition = position + deltaY;
    if (newPosition < -600) newPosition = -600;
    if (newPosition > 0) newPosition = 0;

    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    if (position > initialPosition.current && position < 0) {
      setPosition(initialPosition.current);
    } else if (position < initialPosition.current && position > -600) {
      setPosition(initialPosition.current);
    }
    startY.current = null;
  };
  return (
    <StyledContainer
      ref={containerRef}
      style={{ bottom: `${position}px` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  height: 700px;
  width: 100%;
  padding: 16px;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 4px 4px 0 0;
  transition: bottom 0.5s ease;
`;

export default BottomSheet;
