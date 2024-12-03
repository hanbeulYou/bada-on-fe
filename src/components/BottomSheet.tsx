import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import { Details } from '../apis/weather/useWeatherQuery';
import { Activity, LABEL_MAPPING_REVERSE } from '../consts/label';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';
import useToast from '../hooks/useToast';

import DoughnutChart from './chart/Doughnut';
import ContentBox from './common/ContentBox';
import Icon from './common/Icon';
import FooterTimer from './Footer';

const TimeFormat = (time: string) => {
  // const YYYYMMDD = time.split('T')[0];
  const [hour, minute, second] = time.split('T')[1].split(':');
  return `${hour}:${minute}`;
};

// 아직 미완성이지만, 지도 위에 뜨는 슬라이딩이 가능한 디테일 정보입니다.
interface BottomSheetProps {
  title: string;
  alert?: string;
  dangerValue: number;
  recommends?: string;
  timeIndex: number;
  setTimeIndex: React.Dispatch<React.SetStateAction<number>>;
  onClosed?: () => void;
  onFull?: () => void;
  onMiddle?: () => void;
  isFull: boolean;
  currentHour: Date;
  activity: Activity;
  detailData: Details;
}

function BottomSheet({
  title,
  alert,
  dangerValue,
  recommends,
  timeIndex,
  setTimeIndex,
  onClosed,
  onFull,
  onMiddle,
  isFull,
  currentHour,
  activity,
  detailData,
}: BottomSheetProps) {
  const [position, setPosition] = useState(60);
  const [isFooterVisible, setFooterVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const { state: safeAreaState } = useContext(SafeAreaContext);

  const { showToast, renderToasts } = useToast();

  const POSITIONS = {
    FULL: 0, // 완전히 펼쳐진 상태
    MIDDLE: 60, // 중간 상태
    HIDDEN: 100, // 숨겨진 상태
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    const deltaY = startY.current - e.touches[0].clientY;
    const containerHeight = containerRef.current?.clientHeight || 0;

    // deltaY를 percentage로 변환
    const deltaPercentage = (deltaY / containerHeight) * 100;
    let newPosition = position - deltaPercentage;

    // 범위 제한
    if (newPosition < POSITIONS.FULL) newPosition = POSITIONS.FULL;
    if (newPosition > POSITIONS.HIDDEN) newPosition = POSITIONS.HIDDEN;

    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    // 위치 스냅
    if (position < 25) {
      setPosition(POSITIONS.FULL);
      if (onFull) onFull();
    } else if (position > 75) {
      setPosition(POSITIONS.HIDDEN);
      setFooterVisible(false);
      if (onClosed) {
        setTimeout(() => {
          if (onClosed) onClosed();
        }, 300);
      }
    } else {
      if (onMiddle) onMiddle();
      setPosition(POSITIONS.MIDDLE);
    }
    startY.current = null;
  };

  return (
    <Container
      ref={containerRef}
      position={position}
      isFull={isFull}
      safeArea={safeAreaState}
    >
      {renderToasts()}
      {isFull ? (
        <CloseBottomSheet safeArea={safeAreaState}>
          <button onClick={onClosed}>
            <Icon name="chevron-down" />
          </button>
        </CloseBottomSheet>
      ) : (
        <HandlerWrapper
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Handler />
        </HandlerWrapper>
      )}
      <Header>
        <Title>{title}</Title>
        {alert && (
          <Alert
            onClick={() =>
              showToast({
                message:
                  '해당 페이지는 준비 중입니다. 안전한 바다 이용 정보를 곧 제공할게요!',
                toastType: 'warning',
                timeout: 3000,
              })
            }
          >
            {alert}
          </Alert>
        )}
      </Header>
      <DoughnutChart chartValue={dangerValue} />
      <RecommendContainer>
        {recommends && (
          <RecommendItem>
            <RecommendTitleWrapper>
              <RecommendTitle>{LABEL_MAPPING_REVERSE[activity]}</RecommendTitle>
            </RecommendTitleWrapper>
            <RecommendDescription>{recommends}</RecommendDescription>
          </RecommendItem>
        )}
      </RecommendContainer>
      {isFull && (
        <DetailContainer>
          <HorizontalLineLg />
          <DetailInfoContainer safeArea={safeAreaState}>
            <DetailTitle>상세정보</DetailTitle>
            {/* <DetailInfoColContainer>
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
            <HorizontalLineSm /> */}
            <DetailContentContainer>
              <ContentBox
                title="날씨"
                data={[
                  { label: '상태', value: detailData.skyCondition },
                  {
                    label: '기온',
                    value: detailData.hourlyTemperature + '°C',
                  },
                  { label: '습도', value: detailData.humidity + '%' },
                ]}
              />
              <ContentBox
                title="강수/강설"
                data={[
                  {
                    label: '확률',
                    value: detailData.precipitationProbability + '%',
                  },
                  { label: '형태', value: detailData.precipitationType },
                  {
                    label: '강수량',
                    value:
                      (detailData.hourlyPrecipitation === -99
                        ? 0
                        : detailData.hourlyPrecipitation) + 'mm',
                  },
                  {
                    label: '강설량',
                    value:
                      (detailData.hourlySnowAccumulation === -99
                        ? 0
                        : detailData.hourlySnowAccumulation) + 'cm',
                  },
                ]}
              />
              <ContentBox
                title="바람"
                data={[
                  { label: '풍속', value: detailData.windSpeed + 'm/s' },
                  { label: '풍향', value: detailData.windDirection + '°' },
                ]}
              />
              <ContentBox
                title="수온/파고"
                data={[
                  { label: '수온', value: detailData.waterTemperature + '°C' },
                  { label: '파고', value: detailData.waveHeight + 'm' },
                ]}
              />
              <ContentBox
                title="물때"
                data={[
                  {
                    label: '만조(오전)',
                    value: `${TimeFormat(detailData.tideInfoList[0].tidalTime)} (${detailData.tideInfoList[0].tidalLevel}cm)`,
                  },
                  // {
                  //   label: '간조(오전)',
                  //   value: `${detailData.tideInfoList[1].tidalTime} (${detailData.tideInfoList[1].tidalLevel}cm)`,
                  // },
                  // {
                  //   label: '만조(오후)',
                  //   value: `${detailData.tideInfoList[2].tidalTime} (${detailData.tideInfoList[2].tidalLevel}cm)`,
                  // },
                  // {
                  //   label: '간조(오후)',
                  //   value: `${detailData.tideInfoList[3].tidalTime} (${detailData.tideInfoList[3].tidalLevel}cm)`,
                  // },
                ]}
              />
            </DetailContentContainer>
            {/* <HorizontalLineSm /> */}
            {/* <PhoneContainer>
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
            </PhoneContainer> */}
          </DetailInfoContainer>
        </DetailContainer>
      )}
      {isFooterVisible && (
        <FooterTimer
          timeIndex={timeIndex}
          setTimeIndex={setTimeIndex}
          currentHour={currentHour}
        />
      )}
    </Container>
  );
}

const Container = styled.div<{
  position: number;
  isFull: boolean;
  safeArea: SafeAreaState;
}>`
  position: fixed;
  bottom: 0;
  transform: translateY(${props => props.position}%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  height: 100vh;
  width: 100%;
  /* padding-top: 14px; */
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: ${({ safeArea }) => safeArea.bottom}px;
  background-color: white;
  border: ${props => !props.isFull && '1px solid #e0e0e0'};
  border-radius: ${props => !props.isFull && '28px 28px 0 0'};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
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
  padding-top: 14px;
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

const DetailInfoContainer = styled.div<{ safeArea: SafeAreaState }>`
  width: 100%;
  padding: 24px;

  margin-bottom: calc(48px + ${({ safeArea }) => safeArea.bottom}px);
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

const CloseBottomSheet = styled.div<{ safeArea: SafeAreaState }>`
  position: sticky;
  top: 0px;
  z-index: 2;
  display: flex;
  width: calc(100% + 2px);
  height: 84px;
  padding-top: calc(34px + ${({ safeArea }) => safeArea.top}px);
  padding-bottom: 12px;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: ${({ safeArea }) => -safeArea.top}px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;
