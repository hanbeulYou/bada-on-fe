import styled from 'styled-components';

import ProgressBar from './ProgressBar';

interface SummaryBarProps {
  barType: 'tide' | 'wave';
  value: number;
}

const GetValue = (barType: 'tide' | 'wave', value: number) => {
  if (barType === 'tide') {
    return { barTypeText: '물 높이', value: `${value}%` };
  }
  if (value < 20) {
    return { barTypeText: '파도 높이', value: '고요' };
  }
  if (value < 40) {
    return { barTypeText: '파도 높이', value: '잔잔' };
  }
  if (value < 60) {
    return { barTypeText: '파도 높이', value: '중간' };
  }
  if (value < 80) {
    return { barTypeText: '파도 높이', value: '높음' };
  }
  return { barTypeText: '파도 높이', value: '거침' };
};

const SummaryBar = ({ barType, value }: SummaryBarProps) => {
  return (
    <SummaryBarContainer>
      <SummaryBarTitle>{GetValue(barType, value)?.barTypeText}</SummaryBarTitle>
      <ProgressBar percentage={value} />
      <SummaryBarValue>{GetValue(barType, value)?.value}</SummaryBarValue>
    </SummaryBarContainer>
  );
};

const SummaryBarContainer = styled.div`
  display: flex;
  padding: 12px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  flex: 1;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const SummaryBarTitle = styled.div`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.typography.Label};
`;

const SummaryBarValue = styled.div`
  height: 18px;
  align-self: stretch;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray600};
  ${({ theme }) => theme.typography.Body};
`;

export default SummaryBar;
