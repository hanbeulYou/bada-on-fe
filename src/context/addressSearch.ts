import { Address } from '../apis/search/useKakaoSearchQuery';
export interface AddressContextState {
  searchResults: Address[];
  searchKeyword: string;
  currentAddress: Address;
  histories: Address[];
  location: {
    latitude: number;
    longitude: number;
  };
}

export type AddressAction =
  | { type: 'SET_SEARCH_RESULTS'; payload: Address[] }
  | { type: 'SET_SEARCH_KEYWORD'; payload: string }
  | { type: 'SET_CURRENT_ADDRESS'; payload: Address }
  | { type: 'SET_LOCATION'; payload: { latitude: number; longitude: number } }
  | { type: 'DELETE_HISTORY'; payload: string | number }
  | { type: 'SET_HISTORIES'; payload: Address[] }
  | { type: 'ADD_HISTORY'; payload: Address };

const initialState: AddressContextState = {
  searchResults: [],
  searchKeyword: '',
  currentAddress: {} as Address,
  histories: [],
  location: {} as { latitude: number; longitude: number },
};

const addressReducer = (state: AddressContextState, action: AddressAction) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_SEARCH_KEYWORD':
      return { ...state, searchKeyword: action.payload };
    case 'SET_CURRENT_ADDRESS':
      return { ...state, currentAddress: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'DELETE_HISTORY':
      return {
        ...state,
        histories: state.histories.filter(({ id }) => id !== action.payload),
      };
    case 'SET_HISTORIES':
      return { ...state, histories: action.payload };
    case 'ADD_HISTORY': {
      const payloadIdx = state.histories.findIndex(
        ({ id }) => id === action.payload.id,
      );
      if (payloadIdx > -1) {
        const newHistories = [...state.histories];
        newHistories.splice(payloadIdx, 1);
        return { ...state, histories: [action.payload, ...newHistories] };
      }
      return { ...state, histories: [action.payload, ...state.histories] };
    }
    default:
      return state;
  }
};

export { initialState, addressReducer };
