import { useContext } from 'react';
import { styled } from 'styled-components';

import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';
import { MapButton } from '../common/MapButton';

import TimeHeaderButton from './TimeHeaderButton';

interface TimeSelectHeaderProps {
  date: string;
  time: string;
  onTimeClick: () => void;
  onMenuClick: () => void;
  hasSearchValue: boolean;
  onSearchOpenClick: () => void;
  onSearchCloseClick: () => void;
}

const TimeSelectHeader = ({
  date,
  time,
  onTimeClick,
  onMenuClick,
  hasSearchValue,
  onSearchOpenClick,
  onSearchCloseClick,
}: TimeSelectHeaderProps) => {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  return (
    <HeaderContainer safeArea={safeAreaState}>
      <MapButton
        iconName="menu"
        style={{ position: 'relative' }}
        onClick={onMenuClick}
      />
      <TimeHeaderButton date={date} time={time} onClick={onTimeClick} />
      <MapButton
        iconName={hasSearchValue ? 'close' : 'finder'}
        style={{ position: 'relative' }}
        onClick={hasSearchValue ? onSearchCloseClick : onSearchOpenClick}
      />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div<{ safeArea: SafeAreaState }>`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ safeArea }) => safeArea.top + 20}px 20px
    ${({ safeArea }) => safeArea.bottom + 20}px;
  background-color: transparent;
`;

export default TimeSelectHeader;
