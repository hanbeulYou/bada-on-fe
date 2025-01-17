import { styled } from 'styled-components';

interface WarningInfoProps {
  warningType: string;
  warningLocation: string;
  warningDescription: string;
  warningStartTime: string;
  warningEndTime: string;
}

const WarningInfo = ({
  warningType,
  warningLocation,
  warningDescription,
  warningStartTime,
  warningEndTime,
}: WarningInfoProps) => {
  return (
    <WarningInfoContainer>
      <WarningInfoHeader>
        <WarningInfoTitle>{`🚨 ${warningType} 발효 중`}</WarningInfoTitle>
        <WarningInfoLocation>{warningLocation}</WarningInfoLocation>
      </WarningInfoHeader>
      <HorizontalLineSm />
      <WarningInfoContent>
        <WarningInfoDescription>{warningDescription}</WarningInfoDescription>
        <WarningInfoDetail>
          <TimeInfo>
            <TimeInfoKey>발효 시각</TimeInfoKey>
            <TimeInfoValue>{warningStartTime}</TimeInfoValue>
          </TimeInfo>
          <TimeInfo>
            <TimeInfoKey>종료 예상</TimeInfoKey>
            <TimeInfoValue>{warningEndTime}</TimeInfoValue>
          </TimeInfo>
        </WarningInfoDetail>
      </WarningInfoContent>
    </WarningInfoContainer>
  );
};

const WarningInfoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 14px;
  gap: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.red50};
`;

const WarningInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const WarningInfoTitle = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  ${({ theme }) => theme.typography.Body_Bold}
`;

const WarningInfoLocation = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.typography.Label}
`;

const HorizontalLineSm = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.colors.white};
`;

const WarningInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const WarningInfoDescription = styled.p`
  color: ${({ theme }) => theme.colors.gray600};
  ${({ theme }) => theme.typography.Body}
`;

const WarningInfoDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;

const TimeInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const TimeInfoKey = styled.span`
  color: ${({ theme }) => theme.colors.gray600};
  ${({ theme }) => theme.typography.Label}
`;

const TimeInfoValue = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.typography.Label}
`;

export default WarningInfo;
