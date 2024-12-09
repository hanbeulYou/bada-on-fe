import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import { Details, TideInfo } from '../apis/weather/useWeatherQuery';
import { Activity, LABEL_MAPPING_REVERSE } from '../consts/label';
import { SafeAreaContext, SafeAreaState } from '../context/SafeAreaContext';
import useToast from '../hooks/useToast';
import { Marker } from '../pages/Home';

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
  bottomSheetStatus: 'middle' | 'full' | 'bottom' | 'hidden';
  setBottomSheetStatus: React.Dispatch<
    React.SetStateAction<'middle' | 'full' | 'hidden'>
  >;
  currentHour: Date;
  activity: Activity;
  detailData: Details;
  setSelectedMarker: React.Dispatch<React.SetStateAction<Marker | null>>;
}

function BottomSheet({
  title,
  alert,
  dangerValue,
  recommends,
  timeIndex,
  setTimeIndex,
  currentHour,
  activity,
  detailData,
  bottomSheetStatus,
  setBottomSheetStatus,
  setSelectedMarker,
}: BottomSheetProps) {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  const [position, setPosition] = useState(
    window.innerHeight - 340 - safeAreaState.bottom,
  );
  const [isFooterVisible, setFooterVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);

  const { showToast, renderToasts } = useToast();

  const POSITIONS = {
    FULL: 0,
    MIDDLE: window.innerHeight - 340 - safeAreaState.bottom,
    HIDDEN: window.innerHeight,
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current === null) return;

    console.log('startY', startY.current);
    console.log('e.touches[0].clientY', e.touches[0].clientY);

    const deltaY = startY.current - e.touches[0].clientY;
    let newPosition = position - deltaY;

    console.log('newPosition', newPosition);

    // 범위 제한 (픽셀 단위)
    if (newPosition < POSITIONS.FULL) newPosition = POSITIONS.FULL;
    if (newPosition > POSITIONS.HIDDEN) newPosition = POSITIONS.HIDDEN;

    setPosition(newPosition);
  };

  const handleTouchEnd = () => {
    // POSITIONS 값들과의 거리를 기준으로 판단
    const distanceToFull = Math.abs(position - POSITIONS.FULL);
    const distanceToMiddle = Math.abs(position - POSITIONS.MIDDLE);
    const distanceToHidden = Math.abs(position - POSITIONS.HIDDEN);

    // 가장 가까운 위치로 스냅
    const minDistance = Math.min(
      distanceToFull,
      distanceToMiddle,
      distanceToHidden,
    );

    if (!setBottomSheetStatus) return;

    if (minDistance === distanceToFull) {
      setPosition(POSITIONS.FULL);
      setBottomSheetStatus('full');
    } else if (minDistance === distanceToHidden) {
      setTimeout(() => {
        setSelectedMarker(null);
        setBottomSheetStatus('hidden');
        setFooterVisible(false);
      }, 300);
    } else {
      setBottomSheetStatus('middle');
      setPosition(POSITIONS.MIDDLE);
    }
    startY.current = null;
  };

  const formatTideData = (tideInfoList: TideInfo[]) => {
    const tideLabels = {
      저조: '간조(저조)',
      고조: '만조(고조)',
    };

    return tideInfoList.map(tide => ({
      label: tideLabels[tide.code],
      value: `${TimeFormat(tide.tidalTime)} (${tide.tidalLevel}cm)`,
    }));
  };

  return (
    <Container
      ref={containerRef}
      position={position}
      isFull={bottomSheetStatus === 'full'}
      safeArea={safeAreaState}
    >
      {renderToasts()}
      {bottomSheetStatus === 'full' ? (
        <CloseBottomSheet
          safeArea={safeAreaState}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button onClick={() => setBottomSheetStatus('hidden')}>
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
      <SummaryContainer>
        {bottomSheetStatus === 'middle' && (
          <DragHandler
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        )}
        <Header isFull={bottomSheetStatus === 'full'} safeArea={safeAreaState}>
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
                <RecommendTitle>
                  {LABEL_MAPPING_REVERSE[activity]}
                </RecommendTitle>
              </RecommendTitleWrapper>
              <RecommendDescription>{recommends}</RecommendDescription>
            </RecommendItem>
          )}
        </RecommendContainer>
      </SummaryContainer>
      {bottomSheetStatus === 'full' && (
        <DetailContainer>
          <HorizontalLineLg />
          <DetailInfoContainer safeArea={safeAreaState}>
            <DetailTitle>상세정보</DetailTitle>
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
                  {
                    label: '파고',
                    value:
                      detailData.waveHeight === -999
                        ? '0m'
                        : detailData.waveHeight + 'm',
                  },
                ]}
              />
              <ContentBox
                title="물때"
                data={formatTideData(detailData.tideInfoList)}
              />
            </DetailContentContainer>
            <ReferenceContainer>
              <ReferenceTitle>자료</ReferenceTitle>
              <ReferenceContent>기상청, 국립해양조사원</ReferenceContent>
            </ReferenceContainer>
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
  transform: translateY(${props => props.position}px);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: ${({ safeArea }) => safeArea.bottom}px;
  background-color: white;
  border: ${props => !props.isFull && '1px solid #e0e0e0'};
  border-radius: ${props => !props.isFull && '28px 28px 0 0'};
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
  overflow-x: hidden;

  box-shadow: ${props =>
    !props.isFull && '0px -2px 4px 0px rgba(0, 0, 0, 0.16)'};

  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE, Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const SummaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Header = styled.div<{ isFull: boolean; safeArea: SafeAreaState }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 327px;
  height: 38px;
  margin-bottom: 24px;
  padding-top: ${({ safeArea, isFull }) => (isFull ? safeArea.top + 34 : 0)}px;
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
  width: 100%;
`;

const HorizontalLineLg = styled.div`
  height: 6px;
  width: 375px;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

// const HorizontalLineSm = styled.div`
//   height: 2px;
//   width: 329px;
//   background-color: ${({ theme }) => theme.colors.gray100};
// `;

const DetailInfoContainer = styled.div<{ safeArea: SafeAreaState }>`
  width: 100%;
  padding: 24px 0px;

  margin-bottom: calc(48px + ${({ safeArea }) => safeArea.bottom}px);
`;

const DetailTitle = styled.div`
  ${({ theme }) => theme.typography.Title_1_Bold};
  margin-bottom: 24px;
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 12px 0;
`;

export default BottomSheet;

const CloseBottomSheet = styled.div<{ safeArea: SafeAreaState }>`
  position: sticky;
  top: 0px;
  z-index: 2;
  display: flex;
  width: 100vw;
  height: 84px;
  padding-top: calc(34px + ${({ safeArea }) => safeArea.top}px);
  padding-bottom: 12px;
  padding-left: 32px;
  padding-right: 32px;
  margin-top: ${({ safeArea }) => -safeArea.top}px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
`;

const ReferenceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const ReferenceTitle = styled.div`
  ${({ theme }) => theme.typography.Label};
  color: ${({ theme }) => theme.colors.gray300};
`;

const ReferenceContent = styled.div`
  ${({ theme }) => theme.typography.Label};
  color: ${({ theme }) => theme.colors.gray500};
`;

const DragHandler = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
