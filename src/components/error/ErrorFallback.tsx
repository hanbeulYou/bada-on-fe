import { useContext } from 'react';
import styled from 'styled-components';

import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';
import FullButton from '../common/FullButton';
import Icon from '../common/Icon';

interface ErrorFallbackProps {
  message: string;
  onRetryClick: () => void;
  onContactClick?: () => void;
}

const ErrorFallback = ({
  message,
  onRetryClick,
  onContactClick,
}: ErrorFallbackProps) => {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  return (
    <ErrorContainer safeAreaState={safeAreaState}>
      <div />
      <ErrorContent>
        <IconWrapper>
          <Icon name="alert-gray" width={32} height={32} />
        </IconWrapper>
        <ErrorMessage>{message}</ErrorMessage>
      </ErrorContent>
      <ButtonContainer>
        {onContactClick && (
          <FullButton
            onClick={onContactClick}
            label="문의하기"
            isPrimary={false}
          />
        )}
        <FullButton
          onClick={onRetryClick}
          label="재시도하기"
          isPrimary={true}
        />
      </ButtonContainer>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.section<{ safeAreaState: SafeAreaState }>`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ safeAreaState }) => safeAreaState.top + 48}px 24px
    ${({ safeAreaState }) => safeAreaState.bottom + 12}px 24px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 50%;
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const ErrorMessage = styled.div`
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.gray500};
  text-align: center;
  align-self: stretch;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
`;

export default ErrorFallback;
