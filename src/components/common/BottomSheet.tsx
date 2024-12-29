import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';

import Icon from './Icon';

interface BottomSheetProps {
  children: React.ReactNode;
  handleClose: () => void;
  bottomSheetStatus: 'middle' | 'full' | 'bottom' | 'hidden';
  setBottomSheetStatus: React.Dispatch<
    React.SetStateAction<'middle' | 'full' | 'hidden'>
  >;
  size?: number;
}

function BottomSheet({
  children,
  handleClose,
  bottomSheetStatus,
  setBottomSheetStatus,
  size = 340,
}: BottomSheetProps) {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  const [position, setPosition] = useState(
    window.innerHeight - size - safeAreaState.bottom,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  const POSITIONS = {
    FULL: 0,
    MIDDLE: window.innerHeight - size - safeAreaState.bottom,
    HIDDEN: window.innerHeight,
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    const deltaY = startY.current - e.touches[0].clientY;
    let newPosition = position - deltaY;

    // 범위 제한 (픽셀 단위)
    if (newPosition < POSITIONS.FULL) newPosition = POSITIONS.FULL;
    if (newPosition > POSITIONS.HIDDEN) newPosition = POSITIONS.HIDDEN;

    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    // POSITIONS 값들과의 거리를 기준으로 판단
    const distanceToFull = Math.abs(position - POSITIONS.FULL);
    const distanceToMiddle = Math.abs(position - POSITIONS.MIDDLE);
    const distanceToHidden = Math.abs(position - POSITIONS.HIDDEN);

    // 가장 가까운 위치로 스냅
    const minDistance = Math.min(
      distanceToFull,
      distanceToMiddle,
      distanceToHidden,
    );

    if (!setBottomSheetStatus) return;

    if (minDistance === distanceToFull) {
      setPosition(POSITIONS.FULL);
      setBottomSheetStatus('full');
    } else if (minDistance === distanceToHidden) {
      setTimeout(() => {
        handleClose();
        setBottomSheetStatus('hidden');
      }, 300);
    } else {
      setBottomSheetStatus('middle');
      setPosition(POSITIONS.MIDDLE);
    }
    startY.current = null;
  };

  return (
    <Container
      ref={containerRef}
      position={position}
      isFull={bottomSheetStatus === 'full'}
      safeArea={safeAreaState}
    >
      {bottomSheetStatus === 'full' ? (
        <CloseBottomSheet
          safeArea={safeAreaState}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button onClick={() => setBottomSheetStatus('hidden')}>
            <Icon name="chevron-down" />
          </button>
        </CloseBottomSheet>
      ) : (
        <HandlerWrapper
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Handler />
        </HandlerWrapper>
      )}
      {children}
    </Container>
  );
}

const Container = styled.div<{
  position: number;
  isFull: boolean;
  safeArea: SafeAreaState;
}>`
  position: fixed;
  bottom: 0;
  transform: translateY(${props => props.position}px);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: ${({ safeArea }) => safeArea.bottom}px;
  background-color: white;
  border: ${props => !props.isFull && '1px solid #e0e0e0'};
  border-radius: ${props => !props.isFull && '28px 28px 0 0'};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  overflow-x: hidden;

  box-shadow: ${props =>
    !props.isFull && '0px -2px 4px 0px rgba(0, 0, 0, 0.16)'};

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const HandlerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6px;
  padding-top: 14px;
  padding-bottom: 20px;
`;

const Handler = styled.div`
  height: 6px;
  width: 45px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

export default BottomSheet;

const CloseBottomSheet = styled.div<{ safeArea: SafeAreaState }>`
  position: sticky;
  top: 0px;
  z-index: 2;
  display: flex;
  width: 100vw;
  height: 84px;
  padding-top: calc(34px + ${({ safeArea }) => safeArea.top}px);
  padding-bottom: 12px;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: ${({ safeArea }) => -safeArea.top}px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;
