import { createContext, Dispatch } from 'react';

import {
  AddressAction,
  AddressContextState,
  initialState,
} from './addressSearch';

interface AddressContextType {
  state: AddressContextState;
  dispatch: Dispatch<AddressAction>;
}

export const AddressContext = createContext<AddressContextType>({
  state: initialState,
  dispatch: () => null,
});
