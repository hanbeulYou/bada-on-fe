import BottomSheet from '../common/BottomSheet';

import DateSelect from './DateSelect';

const TimeSelect = () => {
  return (
    <BottomSheet
      handleClose={() => console.log('close')}
      bottomSheetStatus="middle"
      setBottomSheetStatus={() => console.log('setBottomSheetStatus')}
      size={290}
    >
      <DateSelect />
    </BottomSheet>
  );
};

export default TimeSelect;
