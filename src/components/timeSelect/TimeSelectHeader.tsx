import { styled } from 'styled-components';

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
  return (
    <HeaderContainer>
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

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  background-color: transparent;
`;

export default TimeSelectHeader;
