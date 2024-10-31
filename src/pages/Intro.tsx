import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Background_img from '../assets/Background_Img.png';
import ButtonGrid from '../components/ButtonGrid';
import FooterButton from '../components/common/FooterButton';
import { labelMapping } from '../components/common/IntroButton';

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
      .map(label => `selected=${labelMapping[label]}`)
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

export default Intro;
