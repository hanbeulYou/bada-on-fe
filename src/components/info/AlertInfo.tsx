import { styled } from 'styled-components';

const AlertInfo = ({ alert }: { alert: string }) => {
  return (
    <AlertInfoContainer>
      <AlertIcon>🚨</AlertIcon>
      <AlertText>{alert}</AlertText>
    </AlertInfoContainer>
  );
};

const AlertInfoContainer = styled.div`
  display: flex;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  gap: 1px;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.red50};
`;

const AlertIcon = styled.span`
  height: 15px;
  ${({ theme }) => theme.typography.Label}
`;

const AlertText = styled.span`
  height: 15px;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.Label}
`;

export default AlertInfo;
