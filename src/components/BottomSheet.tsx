import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { LABEL_MAPPING_REVERSE } from '../consts/label';

import DoughnutChart from './chart/Doughnut';
import ContentBox from './common/ContentBox';
import FooterTimer from './Footer';

// 아직 미완성이지만, 지도 위에 뜨는 슬라이딩이 가능한 디테일 정보입니다.
interface BottomSheetProps {
  title: string;
  alert?: string;
  dangerValue: number;
  recommends?: Record<string, string>;
  pickHour: number;
  setPickHour: React.Dispatch<React.SetStateAction<number>>;
  onClosed?: () => void;
  onFull?: () => void;
  onMiddle?: () => void;
  isFull: boolean;
  defaultTime: number;
}

function BottomSheet({
  title,
  alert,
  dangerValue,
  recommends,
  pickHour,
  setPickHour,
  onClosed,
  onFull,
  onMiddle,
  isFull,
  defaultTime,
}: BottomSheetProps) {
  const [position, setPosition] = useState(-400);
  const [isFooterVisible, setFooterVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const initialPosition = useRef<number>(-400);

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;
    const deltaY = startY.current - e.touches[0].clientY;

    let newPosition = position + deltaY;

    // 하단 위치
    if (newPosition < -800) newPosition = -800;
    // 상단 위치
    if (newPosition > -84) newPosition = -84;

    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    if (position >= -84) {
      setPosition(-84);
      if (onFull) onFull();
    } else if (position < -700) {
      setPosition(-800);
      setFooterVisible(false);
      if (onClosed) {
        setTimeout(() => {
          if (onClosed) {
            onClosed();
          }
        }, 300);
      }
    } else {
      if (onMiddle) {
        onMiddle();
      }
      setPosition(initialPosition.current);
    }
    startY.current = null;
  };

  return (
    <Container
      ref={containerRef}
      style={{ bottom: `${position}px` }}
      isFull={isFull}
    >
      <HandlerWrapper
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {!isFull && <Handler />}
      </HandlerWrapper>
      <Header>
        <Title>{title}</Title>
        {alert && <Alert>{alert}</Alert>}
      </Header>
      <DoughnutChart chartValue={dangerValue} />
      <RecommendContainer>
        {recommends &&
          Object.entries(recommends).map((recommend, index) => (
            <RecommendItem key={index}>
              <RecommendTitleWrapper>
                <RecommendTitle>
                  {
                    LABEL_MAPPING_REVERSE[
                      recommend[0] as keyof typeof LABEL_MAPPING_REVERSE
                    ]
                  }
                </RecommendTitle>
              </RecommendTitleWrapper>
              <RecommendDescription>{recommend[1]}</RecommendDescription>
            </RecommendItem>
          ))}
      </RecommendContainer>
      {isFull && (
        <DetailContainer>
          <HorizontalLineLg />
          <DetailInfoContainer>
            <DetailTitle>상세정보</DetailTitle>
            <DetailInfoColContainer>
              <DetailInfoRowContainer>
                <FlexBox>
                  <span>화장실</span>
                  <span>없음</span>
                </FlexBox>
                <FlexBox>
                  <span>샤워실</span>
                  <span>없음</span>
                </FlexBox>
              </DetailInfoRowContainer>

              <FlexBox>
                <span>최근 사고 발생</span>
                <span>최근 1년간 8번</span>
              </FlexBox>
            </DetailInfoColContainer>
            <HorizontalLineSm />
            <DetailContentContainer>
              <ContentBox
                title="물때"
                data={[
                  { label: '만조', value: '10:10 / 21:56' },
                  { label: '간조', value: '04:04 / 16:30' },
                  { label: '일출', value: '06:52' },
                  { label: '일몰', value: '17:43' },
                ]}
              />
              <ContentBox
                title="날씨"
                data={[
                  { label: '오전', value: '구름 많음' },
                  { label: '오후', value: '흐리고 한때 비' },
                ]}
              />
              <ContentBox
                title="기온"
                data={[
                  { label: '최저', value: '21°' },
                  { label: '최고', value: '23°' },
                ]}
              />
              <ContentBox
                title="강수"
                data={[
                  { label: '확률', value: '40%' },
                  { label: '강수량', value: '2mm' },
                ]}
              />
              <ContentBox
                title="풍속"
                data={[
                  { label: '오전', value: '9-14' },
                  { label: '오후', value: '9-13' },
                ]}
              />
              <ContentBox
                title="파고"
                data={[
                  { label: '오전', value: '1.5-3.5' },
                  { label: '오후', value: '1.5-2.5' },
                ]}
              />
              <ContentBox title="유속" data={['53.7cm/s']} />
              <ContentBox title="수온" data={['23°']} />
            </DetailContentContainer>
            <HorizontalLineSm />
            <PhoneContainer>
              <PhoneTitle>해수욕장 근처 긴급 구조대 연락처</PhoneTitle>
              <PhoneContentContainer>
                <PhoneContent>
                  <PhoneType>경찰</PhoneType>
                  <PhoneNum>구좌파출소(783-2112)</PhoneNum>
                </PhoneContent>
                <PhoneContent>
                  <PhoneType>소방</PhoneType>
                  <PhoneNum>구좌119센터(783-0119)</PhoneNum>
                </PhoneContent>
                <PhoneContent>
                  <PhoneType>지원세력</PhoneType>
                  <PhoneNum>구좌읍사무소(783-3001)</PhoneNum>
                </PhoneContent>
                <PhoneContent>
                  <PhoneType>보건소</PhoneType>
                  <PhoneNum>제주동부보건소(783-2504)</PhoneNum>
                </PhoneContent>
              </PhoneContentContainer>
            </PhoneContainer>
          </DetailInfoContainer>
        </DetailContainer>
      )}
      {isFooterVisible && (
        <FooterTimer
          pickHour={pickHour}
          setPickHour={setPickHour}
          defaultTime={defaultTime}
        />
      )}
    </Container>
  );
}

const Container = styled.div<{ isFull: boolean }>`
  position: fixed;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  align-items: center;
  z-index: 1;
  height: 100vh;
  width: 375px;
  padding: 14px 24px 0px 24px;
  background-color: white;
  border: ${props => !props.isFull && '1px solid #e0e0e0'};
  border-radius: ${props => !props.isFull && '28px 28px 0 0'};
  transition: bottom 0.5s ease;
  overflow-y: auto;

  box-shadow: ${props =>
    !props.isFull && '0px -2px 4px 0px rgba(0, 0, 0, 0.16)'};

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const HandlerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 6px;
  padding-bottom: 20px;
`;

const Handler = styled.div`
  height: 6px;
  width: 45px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 327px;
  height: 38px;
  margin-bottom: 24px;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.Heading_2};
  color: ${({ theme }) => theme.colors.blue500};
`;

const Alert = styled.div`
  display: flex;
  max-width: 112px;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.red500};
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.typography.Label};
  overflow-wrap: break-word;
  word-break: break-word;
  text-align: center;
`;

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 8px;
  margin-top: 34px;
`;

const RecommendItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RecommendTitleWrapper = styled.div`
  width: 72px;
`;

const RecommendTitle = styled.div`
  display: flex;
  width: fit-content;
  padding: 4px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.blue500};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.blue500};
  ${({ theme }) => theme.typography.Label};
`;

const RecommendDescription = styled.div`
  ${({ theme }) => theme.typography.Label};
  color: ${({ theme }) => theme.colors.gray700};
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
`;

const HorizontalLineLg = styled.div`
  height: 6px;
  width: 375px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const HorizontalLineSm = styled.div`
  height: 2px;
  width: 329px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const DetailInfoContainer = styled.div`
  width: 100%;
  padding: 24px;

  margin-bottom: 160px;
`;

const DetailTitle = styled.div`
  ${({ theme }) => theme.typography.Title_1_Bold};
  margin-bottom: 24px;
`;

const DetailInfoColContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DetailInfoRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 12px;

  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 12px 0;
`;

const PhoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
`;

const PhoneTitle = styled.div`
  ${({ theme }) => theme.typography.Body_Bold};
  color: ${({ theme }) => theme.colors.red500};
  margin-bottom: 8px;
`;

const PhoneContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.red50};
  padding: 12px;
`;

const PhoneContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;

const PhoneType = styled.div`
  ${({ theme }) => theme.typography.Body_Bold};
`;

const PhoneNum = styled.div`
  ${({ theme }) => theme.typography.Body};
`;

export default BottomSheet;
