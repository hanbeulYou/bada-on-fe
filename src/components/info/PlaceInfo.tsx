import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { Details, TideInfo } from '../../apis/weather/useWeatherQuery';
import { Activity } from '../../consts/label';
import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';
import useToast from '../../hooks/useToast';
import { Marker } from '../../pages/Home';
import BottomSheet from '../common/BottomSheet';
import ContentBox from '../common/ContentBox';
import Icon from '../common/Icon';

import ActivityDataRow from './ActivityDataRow';
import RecommendLabel from './RecommendLabel';
import SummaryBar from './SummaryBar';
import SummaryContent from './SummaryContent';
import WarningInfo from './WarningInfo';
import WarningLabel from './WarningLabel';

const TimeFormat = (time: string) => {
  // const YYYYMMDD = time.split('T')[0];
  const [hour, minute] = time.split('T')[1].split(':');
  return `${hour}:${minute}`;
};

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
  // currentHour: Date;
  activity: Activity;
  detailData: Details;
  detailDataLength: number;
  setSelectedMarker: React.Dispatch<React.SetStateAction<Marker | null>>;
}

function PlaceInfo({
  title,
  alert,
  dangerValue,
  recommends,
  timeIndex,
  setTimeIndex,
  // currentHour,
  activity,
  detailData,
  detailDataLength,
  bottomSheetStatus,
  setBottomSheetStatus,
  setSelectedMarker,
}: BottomSheetProps) {
  const { state: safeAreaState } = useContext(SafeAreaContext);
  const [isFooterVisible, setFooterVisible] = useState(true);

  const { showToast, renderToasts } = useToast();

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
    <BottomSheet
      handleClose={() => {
        setBottomSheetStatus('hidden');
        setSelectedMarker(null);
        setFooterVisible(false);
      }}
      bottomSheetStatus={bottomSheetStatus}
      setBottomSheetStatus={setBottomSheetStatus}
    >
      <SummaryContainer>
        <Header isFull={bottomSheetStatus === 'full'} safeArea={safeAreaState}>
          <>
            <TitleContainer>
              <Title>{title}</Title>
              <button>
                <Icon name="star" width={24} height={24} />
              </button>
            </TitleContainer>
            <Address>
              주소가 들어갈 자리: 제주 제주시 조천읍 조함해안로 525
            </Address>
          </>
          <OptionalContainer>
            <RecommendLabel recommendActivity={activity} />
            <WarningLabel warning={'풍랑주의보'} />
            <WarningLabel warning={'폭설특보'} />
          </OptionalContainer>
        </Header>
        <SummaryBody>
          <BaseTime>시간이 들어갈 자리</BaseTime>

          {/* TODO: 날씨 데이터 받아오면 추가 */}
          <SummaryContentContainer>
            <SummaryContent contentType="weather" content="맑음" />
            <SummaryContent contentType="temperature" content="10°C" />
            <SummaryContent contentType="wind" content="매우 약함" />
          </SummaryContentContainer>
          <SummaryBarContainer>
            <SummaryBar barType="tide" value={30} />
            <SummaryBar barType="wave" value={80} />
          </SummaryBarContainer>
        </SummaryBody>
      </SummaryContainer>
      {bottomSheetStatus === 'full' && (
        <DetailContainer>
          <HorizontalLineLg />
          <DetailInfoContainer safeArea={safeAreaState}>
            <InfoSection>
              <DetailTitle>액티비티</DetailTitle>
              {/* TODO: 날씨 데이터 받아오면 props 넣어주기 */}
              <ActivityDataRow />
            </InfoSection>
            <HorizontalLineSm />
            <InfoSection>
              <DetailTitle>기상특보</DetailTitle>
              <WarningInfo
                warningType="풍랑주의보"
                warningLocation="제주도(제주도산지,제주도서부,제주도북부,제주도동부,추자도,제주도북부중산간,제주도남부중산간)"
                warningDescription="강한 바람과 높은 파도로 인해 바다 활동이 매우 위험한 상태입니다. 해안가 접근을 삼가주시고, 필요 시 대피를 준비하세요."
                warningStartTime="2025-01-01 12:00"
                warningEndTime="2025-01-01 12:00"
              />
            </InfoSection>
            <HorizontalLineSm />
            <InfoSection>
              <DetailTitle>상세정보</DetailTitle>
              {/* TODO: API 스펙 변경 후 수정 */}
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
                    {
                      label: '수온',
                      value: detailData.waterTemperature + '°C',
                    },
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
            </InfoSection>
            <ReferenceContainer>
              <ReferenceTitle>자료</ReferenceTitle>
              <ReferenceContent>기상청, 국립해양조사원</ReferenceContent>
            </ReferenceContainer>
          </DetailInfoContainer>
        </DetailContainer>
      )}
      {/* {isFooterVisible && (
        <FooterTimer
          detailData={detailData}
          detailDataLength={detailDataLength}
          timeIndex={timeIndex}
          setTimeIndex={setTimeIndex}
        />
      )}
      {renderToasts()} */}
    </BottomSheet>
  );
}

const SummaryContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div<{ isFull: boolean; safeArea: SafeAreaState }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 327px;
  height: fit-content;
  margin-bottom: 24px;
  margin-top: ${({ safeArea, isFull }) => (isFull ? safeArea.top : 0)}px;
  gap: 12px;
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.span`
  ${({ theme }) => theme.typography.Heading_2};
  color: ${({ theme }) => theme.colors.blue500};
`;

const Address = styled.div`
  width: 100%;
  align-self: stretch;
  ${({ theme }) => theme.typography.Body};
  color: ${({ theme }) => theme.colors.gray400};
`;

const OptionalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const SummaryBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  gap: 12px;
`;

const BaseTime = styled.div`
  ${({ theme }) => theme.typography.Body_Bold};
  color: ${({ theme }) => theme.colors.gray900};
`;

const SummaryContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const SummaryBarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 12px;
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
  width: 100vw;
  background-color: ${({ theme }) => theme.colors.gray100};
`;

const HorizontalLineSm = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray100};

  margin: 28px 0px;
`;

const DetailInfoContainer = styled.div<{ safeArea: SafeAreaState }>`
  width: 100%;
  padding: 24px 0px;

  margin-bottom: calc(48px + ${({ safeArea }) => safeArea.bottom}px);
`;

const DetailTitle = styled.div`
  ${({ theme }) => theme.typography.Title_1_Bold};
`;

const DetailContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 12px 0;
`;

export default PlaceInfo;

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

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;
