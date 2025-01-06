import { styled } from 'styled-components';

const WarningLabel = ({ warning }: { warning: string }) => {
  return (
    <WarningLabelContainer>
      <WarningIcon>🚨</WarningIcon>
      <WarningText>{warning}</WarningText>
    </WarningLabelContainer>
  );
};

const WarningLabelContainer = styled.div`
  display: flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.red50};
`;

const WarningIcon = styled.span`
  height: 15px;
  ${({ theme }) => theme.typography.Label}
`;

const WarningText = styled.span`
  height: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.Label}
`;

export default WarningLabel;
