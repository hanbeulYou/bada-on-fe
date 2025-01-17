import { styled } from 'styled-components';

import { Activity } from '../../consts/label';

import ActivityData from './ActivityData';

interface ActivityScore {
  activity: Activity;
  score: number;
}

interface ActivityDataRowProps {
  activityData: ActivityScore[];
}

const ActivityDataRow = ({ activityData }: ActivityDataRowProps) => {
  return (
    <ActivityDataWindow>
      <ActivityDataRowContainer>
        {activityData.map(({ activity, score }) => (
          <ActivityData activity={activity} recommend={score} />
        ))}
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
  margin-left: -24px;
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
  padding: 0 24px;
  & > * {
    flex: 0 0 auto;
    min-width: 96px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ActivityDataRow;
