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

export type SafeAreaAction = {
  type: 'SET_SAFE_AREA';
  payload: SafeAreaState;
};

export const safeAreaReducer = (
  state: SafeAreaState,
  action: SafeAreaAction,
): SafeAreaState => {
  window.alert(
    `SafeArea 리듀서 실행\n이전 상태: ${JSON.stringify(state)}\n액션: ${JSON.stringify(action)}`,
  );
  switch (action.type) {
    case 'SET_SAFE_AREA':
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
