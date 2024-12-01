interface SafeAreaState {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export const initialState: SafeAreaState = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

type SafeAreaAction = {
  type: 'SET_SAFE_AREA';
  payload: SafeAreaState;
};

export const safeAreaReducer = (
  state: SafeAreaState,
  action: SafeAreaAction,
): SafeAreaState => {
  switch (action.type) {
    case 'SET_SAFE_AREA':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
