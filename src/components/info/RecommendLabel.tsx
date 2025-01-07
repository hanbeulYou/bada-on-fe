import { styled } from 'styled-components';

import { Activity, LABEL_MAPPING_REVERSE } from '../../consts/label';
import theme from '../../styles/theme';
import Icon from '../common/Icon';

interface RecommendLabelProps {
  recommendActivity: Activity;
}

const RecommendLabel = ({ recommendActivity }: RecommendLabelProps) => {
  return (
    <RecommendLabelContainer>
      <Icon
        name={recommendActivity}
        width={14}
        height={14}
        fill={theme.colors.diving}
      />
      <RecommendText>
        {LABEL_MAPPING_REVERSE[recommendActivity]} 추천
      </RecommendText>
    </RecommendLabelContainer>
  );
};

const RecommendLabelContainer = styled.div`
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
