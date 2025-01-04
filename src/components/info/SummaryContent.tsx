import { styled } from 'styled-components';

interface SummaryContentProps {
  contentType: 'weather' | 'wind' | 'temperature' | 'wave' | 'tide';
  content: string;
}

const GetEmoji = ({ contentType, content }: SummaryContentProps) => {
  if (contentType === 'weather') {
    if (content === '맑음') return '☀️';
    if (content === '흐림') return '🌥';
    if (content === '비') return '🌧';
    if (content === '천둥/번개') return '⛈';
    if (content === '눈') return '❄️';
  } else if (contentType === 'wind') {
    if (content === '매우 약함') return '🍃️️';
    if (content === '약함') return '🍃️️';
    if (content === '적당') return '🍂';
    if (content === '강함') return '🌪';
    if (content === '매우 강함') return '🌪';
  } else {
    return '🌡️️';
  }
};

const SummaryContent = ({ contentType, content }: SummaryContentProps) => {
  return (
    <SummaryContentContainer>
      <GetEmoji contentType={contentType} content={content} />
      <SummaryContentText>{content}</SummaryContentText>
    </SummaryContentContainer>
  );
};

const SummaryContentContainer = styled.div`
  display: flex;
  padding: 12px;
  height: 42px;
  gap: 4px;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
  flex: 1;
`;

const SummaryContentText = styled.span`
  color: ${({ theme }) => theme.colors.gray600};
  ${({ theme }) => theme.typography.Body};
`;

export default SummaryContent;
