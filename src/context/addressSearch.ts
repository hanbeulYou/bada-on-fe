const initialState = {
  searchResults: [],
  searchKeyword: '',
  currentAddress: {},
};

const addressReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      console.log('SET_SEARCH_RESULTS', action.payload);
      return { ...state, searchResults: [...action.payload] }; // 기존 상태 유지하면서 searchResults만 업데이트
    case 'SET_SEARCH_KEYWORD':
      console.log('SET_SEARCH_KEYWORD', action.payload);
      return { ...state, searchKeyword: action.payload }; // 기존 상태 유지하면서 searchKeyword만 업데이트
    case 'SET_CURRENT_ADDRESS':
      console.log('SET_CURRENT_ADDRESS', action.payload);
      return { ...state, currentAddress: action.payload }; // 기존 상태 유지하면서 currentAddress만 업데이트
    default:
      return state;
  }
};

export { initialState, addressReducer };
