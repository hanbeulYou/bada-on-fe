import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Icon from '../components/common/Icon';
import TermsAndConditions from '../components/TermsAndConditions';
import { TERM_CONTENT, TERM_DOCUMENTS } from '../consts/terms';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';

const TermsPage = () => {
  const navigate = useNavigate();
  const { termKey } = useParams();
  const { state: safeAreaState } = useContext(SafeAreaContext);

  return (
    <PageContainer safeAreaState={safeAreaState}>
      <HeaderContainer safeAreaState={safeAreaState}>
        <BackButton onClick={() => navigate(-1)}>
          <Icon name="chevron-left" />
        </BackButton>
        <Title>{TERM_CONTENT[termKey as keyof typeof TERM_CONTENT]}</Title>
        <div style={{ width: 24, height: 24 }} />
      </HeaderContainer>
      <TermsContainer safeAreaState={safeAreaState}>
        <TermsAndConditions
          data={TERM_DOCUMENTS[termKey as keyof typeof TERM_DOCUMENTS]}
        />
      </TermsContainer>
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

const TermsContainer = styled.div<{ safeAreaState: SafeAreaState }>`
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

export default TermsPage;
