import { styled } from 'styled-components';

import { Time } from '../../apis/weather/useAvailableTimeQuery';
import { FilterTime } from '../../pages/Home';
import BottomSheet from '../common/BottomSheet';
import FullButton from '../common/FullButton';

import DateSelect from './DateSelect';
import TimeSelectRow from './TimeSelectRow';

interface TimeSelectProps {
  handleClose: () => void;
  setBottomSheetStatus: React.Dispatch<
    React.SetStateAction<'middle' | 'hidden' | 'full'>
  >;
  filterTime: FilterTime;
  setFilterTime: React.Dispatch<React.SetStateAction<FilterTime>>;
  availableTimeData: Time[];
}

const TimeSelect = ({
  handleClose,
  setBottomSheetStatus,
  filterTime,
  setFilterTime,
  availableTimeData,
}: TimeSelectProps) => {
  return (
    <BottomSheet
      handleClose={handleClose}
      bottomSheetStatus="middle"
      setBottomSheetStatus={setBottomSheetStatus}
      size={290}
      hasBackgroundOverlay={true}
      canFull={false}
    >
      <SelectContainer>
        <DateSelect
          filterTime={filterTime}
          setFilterTime={setFilterTime}
          availableTimeData={availableTimeData}
        />
        <HorizontalLine />
        <TimeSelectRow
          filterTime={filterTime}
          setFilterTime={setFilterTime}
          availableTimeData={availableTimeData}
        />
      </SelectContainer>
      <FullButton label="닫기" onClick={handleClose} isPrimary={false} />
    </BottomSheet>
  );
};

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray50};
  margin-top: 24px;
`;

export default TimeSelect;
