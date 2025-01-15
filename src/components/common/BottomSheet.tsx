import React, { useState, useRef, useContext, useEffect } from 'react';
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
  canFull?: boolean;
  hasBackgroundOverlay?: boolean;
}

function BottomSheet({
  children,
  handleClose,
  bottomSheetStatus,
  setBottomSheetStatus,
  size = 382,
  canFull = true,
  hasBackgroundOverlay = false,
}: BottomSheetProps) {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  const POSITIONS = {
    FULL: 0,
    MIDDLE: window.innerHeight - size - safeAreaState.bottom,
    HIDDEN: window.innerHeight,
  };

  const [position, setPosition] = useState(POSITIONS.HIDDEN);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosition(POSITIONS.MIDDLE);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const lastScrollTop = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (bottomSheetStatus === 'full') return;
    if (containerRef.current) {
      lastScrollTop.current = containerRef.current.scrollTop;
    }
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    if (containerRef.current && containerRef.current.scrollTop > 0) {
      return;
    }

    const currentY = e.touches[0].clientY;
    if (!isDragging && currentY < startY.current) {
      return;
    }

    setIsDragging(true);
    const deltaY = startY.current - currentY;
    let newPosition = position - deltaY;

    if (newPosition < POSITIONS.FULL) newPosition = POSITIONS.FULL;
    if (newPosition > POSITIONS.HIDDEN) newPosition = POSITIONS.HIDDEN;

    setPosition(newPosition);
    startY.current = currentY;
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const distanceToFull = Math.abs(position - POSITIONS.FULL);
    const distanceToMiddle = Math.abs(position - POSITIONS.MIDDLE);
    const distanceToHidden = Math.abs(position - POSITIONS.HIDDEN);

    const minDistance = Math.min(
      distanceToFull,
      distanceToMiddle,
      distanceToHidden,
    );

    if (!setBottomSheetStatus) return;

    if (minDistance === distanceToFull && canFull) {
      setPosition(POSITIONS.FULL);
      setBottomSheetStatus('full');
    } else if (minDistance === distanceToHidden) {
      // TODO: 실제 기기에서 테스트 후 픽스하기
      setPosition(POSITIONS.HIDDEN);
      setTimeout(() => {
        handleClose();
        setBottomSheetStatus('hidden');
      }, 500);
    } else {
      setBottomSheetStatus('middle');
      setPosition(POSITIONS.MIDDLE);
    }
    startY.current = null;
  };

  return (
    <>
      <Overlay
        isVisible={bottomSheetStatus !== 'hidden'}
        onClick={() => {
          setBottomSheetStatus('hidden');
          handleClose();
        }}
        hasBackgroundOverlay={hasBackgroundOverlay}
      />
      <Container
        ref={containerRef}
        position={position}
        isFull={bottomSheetStatus === 'full'}
        safeArea={safeAreaState}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
    </>
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
  z-index: 11;
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

  touch-action: none;

  /* will-change 속성 추가로 애니메이션 성능 개선 */
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
  z-index: 3;
  display: flex;
  width: 100vw;
  height: 84px;
  padding-top: calc(34px + ${({ safeArea }) => safeArea.top}px);
  padding-bottom: 12px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: ${({ safeArea }) => -safeArea.top}px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const Overlay = styled.div<{
  isVisible: boolean;
  hasBackgroundOverlay: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props =>
    props.hasBackgroundOverlay ? 'rgba(27, 27, 27, 0.4)' : 'transparent'};
  z-index: 11;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: ${props => (props.isVisible ? 'auto' : 'none')};
`;
