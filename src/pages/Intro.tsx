import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Background_img from '../assets/Background_Img.png';
import ButtonGrid from '../components/ButtonGrid';
import FooterButton from '../components/common/FooterButton';
import Icon from '../components/common/Icon';
import { LABEL_MAPPING } from '../consts/label';

const Intro: React.FC = () => {
  const [clickedLabels, setClickedLabels] = useState<Record<string, boolean>>(
    {},
  );
  const navigate = useNavigate();

  const handleNextPage = () => {
    const selectedLabels = Object.keys(clickedLabels).filter(
      key => clickedLabels[key],
    );
    const urlParams = selectedLabels
      .map(label => `selected=${LABEL_MAPPING[label]}`)
      .join('&');
    navigate(`/home?${urlParams}`);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <Title>
          제주 바다의 모든 정보,
          <br />
          안전하고 즐겁게
        </Title>
        <Description>선택한 활동에 맞는 최적의 장소를 볼 수 있어요</Description>
      </HeaderContainer>
      <ButtonGrid
        clickedLabels={clickedLabels}
        setClickedLabels={setClickedLabels}
      />
      <WarningText>
        <Icon name="alert-triangle" width={16} height={16} />
        <Text>
          본 서비스에서 제공되는 위험도 계산과 정보는 참고용으로 제공되며 어떠한
          법적 효력도 없습니다. 이를 바탕으로 발생하는 문제에 대해 책임을 지지
          않습니다.
        </Text>
      </WarningText>
      <FooterButton
        onClick={handleNextPage}
        disabled={
          Object.keys(clickedLabels).length === 0 ||
          Object.values(clickedLabels).every(value => !value)
        }
      />
    </PageContainer>
  );
};

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100vh;
  width: 100%;
  padding: 110px 24px 50px 24px;
  background-image: url(${Background_img});
  gap: 40px;
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
  color: ${({ theme }) => theme.colors.gray500};
`;

const WarningText = styled.div`
  position: absolute;
  bottom: 76px;
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.red500};
  display: flex;
  width: 327px;
  padding: 12px 16px;
  align-items: center;
  gap: 10px;
  border-radius: 9px;
  background-color: rgba(255, 255, 255, 0.88);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.12px;
`;

const Text = styled.div`
  flex: 1;
`;

export default Intro;
