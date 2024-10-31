const initialState = {
  searchResults: [],
  searchKeyword: '',
  currentAddress: {},
  histories: [],
};

const addressReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: [...action.payload] };
    case 'SET_SEARCH_KEYWORD':
      return { ...state, searchKeyword: action.payload };
    case 'SET_CURRENT_ADDRESS':
      return { ...state, currentAddress: action.payload };
    case 'DELETE_HISTORY':
      return {
        ...state,
        histories: state.histories.filter(({ id }) => id !== action.payload),
      };
    case 'SET_HISTORIES':
      return { ...state, histories: action.payload };
    case 'ADD_HISTORY':
      const payloadIdx = state.histories.findIndex(
        ({ id }) => id === action.payload.id,
      );
      if (payloadIdx > -1) state.histories.splice(payloadIdx, 1);
      return { ...state, histories: [action.payload, ...state.histories] };
    default:
      return state;
  }
};

export { initialState, addressReducer };
