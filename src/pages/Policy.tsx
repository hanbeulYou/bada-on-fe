import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Icon from '../components/common/Icon';
import { TERM_CONTENT } from '../consts/terms';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';

const PolicyPage = () => {
  const navigate = useNavigate();
  const { state: safeAreaState } = useContext(SafeAreaContext);

  return (
    <PageContainer safeAreaState={safeAreaState}>
      <HeaderContainer safeAreaState={safeAreaState}>
        <BackButton onClick={() => navigate(-1)}>
          <Icon name="chevron-left" />
        </BackButton>
        <Title>안내</Title>
        <div style={{ width: 24, height: 24 }} />
      </HeaderContainer>
      <PolicyContainer safeAreaState={safeAreaState}>
        {Object.entries(TERM_CONTENT).map(([key, value]) => (
          <NavigateButton key={key} onClick={() => navigate(`/terms/${key}`)}>
            <NavigateButtonText>{value}</NavigateButtonText>
            <Icon name="chevron-right" width={18} height={18} />
          </NavigateButton>
        ))}
      </PolicyContainer>
    </PageContainer>
  );
};

const PageContainer = styled.section<{ safeAreaState: SafeAreaState }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 1px 4px 0px #00000029;
`;

const PolicyContainer = styled.div<{ safeAreaState: SafeAreaState }>`
  width: 100%;
  margin-top: calc(${({ safeAreaState }) => safeAreaState.top}px + 56px);
  padding: ${({ safeAreaState }) => `28px 24px ${safeAreaState.bottom}px 20px`};
  margin-bottom: ${({ safeAreaState }) => safeAreaState.bottom + 20}px;

  overflow-y: auto;
`;

const HeaderContainer = styled.header<{ safeAreaState: SafeAreaState }>`
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  height: 54px;
  padding: 16px 20px 14px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: ${({ safeAreaState }) => safeAreaState.top}px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray50};
  justify-content: space-between;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.Title_1_Bold};
`;

const BackButton = styled.button`
  width: 24px;
  height: 24px;
`;

const NavigateButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 16px 0px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray50};
`;

const NavigateButtonText = styled.span`
  flex: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.gray800};
  ${({ theme }) => theme.typography.Body};
`;

export default PolicyPage;
