import React, { useContext } from 'react';
import styled from 'styled-components';

import { Details, Summary, TideInfo } from '../../apis/weather/useWeatherQuery';
import { SafeAreaContext, SafeAreaState } from '../../context/SafeAreaContext';
import { FilterTime, Marker } from '../../pages/Home';
import { TimeFormatWithDate } from '../../utils/timeFormat';
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
  bottomSheetStatus: 'middle' | 'full' | 'bottom' | 'hidden';
  setBottomSheetStatus: React.Dispatch<
    React.SetStateAction<'middle' | 'full' | 'hidden'>
  >;
  filterTime: FilterTime;
  summaryData: Summary;
  detailData: Details;
  setSelectedMarker: React.Dispatch<React.SetStateAction<Marker | null>>;
}

function PlaceInfo({
  title,
  filterTime,
  summaryData,
  detailData,
  bottomSheetStatus,
  setBottomSheetStatus,
  setSelectedMarker,
}: BottomSheetProps) {
  const { state: safeAreaState } = useContext(SafeAreaContext);

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
            {/* TODO: 주소 데이터 받아오면 추가 */}
            <Address>주소가 들어갈 자리</Address>
          </>
          <OptionalContainer>
            {/* TODO: 추천 액티비티 양식 변경 */}
            {summaryData.warning.length === 0 && (
              <RecommendLabel
                recommendActivity={summaryData.recommendActivity}
              />
            )}
            {summaryData.warning.map(warning => (
              <WarningLabel warning={warning} />
            ))}
          </OptionalContainer>
        </Header>
        <SummaryBody>
          <BaseTime>
            {TimeFormatWithDate(filterTime.date, filterTime.hour)}시 기준
          </BaseTime>

          <SummaryContentContainer>
            <SummaryContent
              contentType="weather"
              content={summaryData.skyCondition}
            />
            <SummaryContent
              contentType="temperature"
              content={summaryData.temperature + '°C'}
            />
            <SummaryContent contentType="wind" content={summaryData.wind} />
          </SummaryContentContainer>
          <SummaryBarContainer>
            <SummaryBar barType="tide" value={summaryData.tideHeight} />
            <SummaryBar barType="wave" value={summaryData.waveHeight} />
          </SummaryBarContainer>
        </SummaryBody>
      </SummaryContainer>
      {bottomSheetStatus === 'full' && (
        <DetailContainer>
          <HorizontalLineLg />
          <DetailInfoContainer safeArea={safeAreaState}>
            <InfoSection>
              <DetailTitle>액티비티</DetailTitle>
              <ActivityDataRow />
            </InfoSection>
            <HorizontalLineSm />
            {detailData.warning.length > 0 && (
              <>
                <InfoSection>
                  <DetailTitle>기상특보</DetailTitle>
                  {detailData.warning.map(warning => (
                    <WarningInfo
                      warningType={warning.title}
                      warningLocation={warning.location}
                      warningDescription={warning.description}
                      warningStartTime={warning.startTime}
                      warningEndTime={warning.endTime}
                    />
                  ))}
                </InfoSection>
                <HorizontalLineSm />
              </>
            )}
            <InfoSection>
              <DetailTitle>상세정보</DetailTitle>
              <DetailContentContainer>
                <ContentBox
                  title=""
                  data={[
                    { label: '날씨', value: detailData.skyCondition },
                    {
                      label: '기온',
                      value: detailData.temperature + '°C',
                    },
                    { label: '풍속', value: detailData.wind + 'm/s' },
                    { label: '강수량', value: '0' },
                    { label: '파고', value: detailData.waveHeight + 'm' },
                  ]}
                />

                <ContentBox
                  title="물때"
                  data={[
                    {
                      label: '다음 만조',
                      value: detailData.tideInfoList[0].tidalTime,
                    },
                    {
                      label: '다음 간조',
                      value: detailData.tideInfoList[1].tidalTime,
                    },
                  ]}
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
