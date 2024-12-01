import { createContext, Dispatch } from 'react';

import { initialState } from './safeAreaReducer';
import type { SafeAreaAction } from './safeAreaReducer';

interface SafeAreaContextType {
  state: typeof initialState;
  dispatch: Dispatch<SafeAreaAction>;
}

export const SafeAreaContext = createContext<SafeAreaContextType>({
  state: initialState,
  dispatch: () => null,
});
