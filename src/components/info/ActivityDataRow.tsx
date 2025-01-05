import { styled } from 'styled-components';

import ActivityData from './ActivityData';

const ActivityDataRow = () => {
  return (
    <ActivityDataWindow>
      <ActivityDataRowContainer>
        <ActivityData activity="diving" recommend={90} />
        <ActivityData activity="swimming" recommend={50} />
        <ActivityData activity="paddleBoarding" recommend={30} />
        <ActivityData activity="surfing" recommend={90} />
        <ActivityData activity="snorkeling" recommend={90} />
      </ActivityDataRowContainer>
    </ActivityDataWindow>
  );
};

const ActivityDataWindow = styled.div`
  display: flex;
  width: 100vw;
  position: relative;
  left: 0;
  overflow: hidden;
`;

const ActivityDataRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  & > * {
    flex: 0 0 auto;
    min-width: 96px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ActivityDataRow;
