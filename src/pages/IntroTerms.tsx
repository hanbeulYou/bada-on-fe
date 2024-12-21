import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import FullButton from '../components/common/FullButton';
import TermItemList from '../components/Intro/TermItemList';
import {
  defaultTermAgree,
  termClassification,
  TERM_TYPES,
} from '../consts/terms';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';

const IntroTermsPage = () => {
  const [termAgree, setTermAgree] = useState(defaultTermAgree);
  const navigate = useNavigate();
  const isMandatoryAgree = Object.entries(termAgree)
    .filter(
      ([key]) =>
        termClassification[key as keyof typeof termAgree] ===
        TERM_TYPES.MANDATORY,
    )
    .every(([, value]) => value);

  const { state: safeAreaState } = useContext(SafeAreaContext);
  return (
    <PageContainer safeAreaState={safeAreaState}>
      <HeaderContainer>
        <Title>
          원활한 사용을 위해
          <br />
          이용 약관에 동의해 주세요
        </Title>
        <Description>
          선택항목에 동의하지 않은 경우도 서비스를 사용할 수 있으나 일부 기능이
          제한될 수 있습니다.
        </Description>
      </HeaderContainer>
      <TermItemList termAgree={termAgree} setTermAgree={setTermAgree} />
      <FullButton
        label="다음"
        onClick={() => navigate('/home?selected=snorkeling')}
        disabled={!isMandatoryAgree}
      />
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
  padding: ${({ safeAreaState }) => safeAreaState.top + 48}px 24px
    ${({ safeAreaState }) => safeAreaState.bottom + 12}px 24px;
  gap: 48px;
`;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 12px;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.Heading};
  color: ${({ theme }) => theme.colors.blue500};
`;

const Description = styled.div`
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.gray400};
  word-break: keep-all;
`;

export default IntroTermsPage;
