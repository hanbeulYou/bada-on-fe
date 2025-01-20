import { styled } from 'styled-components';

import { Activity, LABEL_MAPPING_REVERSE } from '../../consts/label';
import theme from '../../styles/theme';
import CircleChart from '../chart/Circle';

interface ActivityDataProps {
  activity: Activity;
  recommend: number;
}

const recommendLabel = (recommend: number) => {
  if (recommend >= 70) return '추천';
  if (recommend >= 40) return '보통';
  return '주의';
};

const RecommendColor = {
  추천: theme.colors.diving,
  보통: theme.colors.swimming,
  주의: theme.colors.paddling,
};

const ActivityData = ({ activity, recommend }: ActivityDataProps) => {
  const recommendColor = RecommendColor[recommendLabel(recommend)];
  return (
    <ActivityDataContainer>
      <ActivityHeader>
        <ActivityTitle>{LABEL_MAPPING_REVERSE[activity]}</ActivityTitle>
        <ActivityRecommend recommendColor={recommendColor}>
          {recommendLabel(recommend)}
        </ActivityRecommend>
      </ActivityHeader>
      <CircleChart
        activity={activity}
        chartValue={recommend}
        recommendColor={recommendColor}
      />
      <ActivityRecommendValue>{recommend}점</ActivityRecommendValue>
    </ActivityDataContainer>
  );
};

const ActivityDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96px;
  height: 106px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.gray50};
  padding: 12px 0px 6px 0px;
`;

const ActivityHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
`;

const ActivityTitle = styled.span`
  ${({ theme }) => theme.typography.Body_Bold}
  color: ${({ theme }) => theme.colors.gray600};
`;

const ActivityRecommend = styled.span<{ recommendColor: string }>`
  ${({ theme }) => theme.typography.Body_Bold}
  color: ${({ recommendColor }) => recommendColor};
`;

const ActivityRecommendValue = styled.span`
  margin-top: 5px;
  ${({ theme }) => theme.typography.Label}
  color: ${({ theme }) => theme.colors.gray400};
`;

export default ActivityData;
