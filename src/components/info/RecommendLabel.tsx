import { styled } from 'styled-components';

import { Activity, LABEL_MAPPING_REVERSE } from '../../consts/label';
import theme from '../../styles/theme';
import Icon from '../common/Icon';

interface RecommendLabelProps {
  recommendActivity: Activity[];
}

const RecommendLabel = ({ recommendActivity }: RecommendLabelProps) => {
  return (
    <RecommendLabelContainer>
      {recommendActivity.map(
        (activity, index) =>
          index < 2 && (
            <RecommendLabelWrapper key={activity}>
              <Icon
                name={activity}
                width={14}
                height={14}
                fill={theme.colors.diving}
              />
              <RecommendText>
                {LABEL_MAPPING_REVERSE[activity]} 추천
              </RecommendText>
            </RecommendLabelWrapper>
          ),
      )}
    </RecommendLabelContainer>
  );
};

const RecommendLabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const RecommendLabelWrapper = styled.div`
  display: flex;
  padding: 4px 8px 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  border-radius: 99px;
  border: 1px solid ${({ theme }) => theme.colors.diving};
  background: ${({ theme }) => theme.colors.white};
`;

const RecommendText = styled.span`
  height: 15px;
  color: ${({ theme }) => theme.colors.diving};
  ${({ theme }) => theme.typography.Label}
`;

export default RecommendLabel;
