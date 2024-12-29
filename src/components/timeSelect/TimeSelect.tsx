import { styled } from 'styled-components';

import BottomSheet from '../common/BottomSheet';
import FooterButton from '../common/FullButton';

import DateSelect from './DateSelect';
import TimeSelectRow from './TimeSelectRow';

const TimeSelect = () => {
  return (
    <BottomSheet
      handleClose={() => console.log('close')}
      bottomSheetStatus="middle"
      setBottomSheetStatus={() => console.log('setBottomSheetStatus')}
      size={290}
    >
      <SelectContainer>
        <DateSelect />
        <HorizontalLine />
        <TimeSelectRow />
      </SelectContainer>
      <FooterButton
        label="닫기"
        onClick={() => console.log('confirm')}
        isPrimary={false}
      />
    </BottomSheet>
  );
};

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray50};
  margin: 24px 0;
`;

export default TimeSelect;
