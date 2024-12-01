import { createContext, Dispatch } from 'react';

import { initialState } from './safeAreaReducer';
import type { SafeAreaAction } from './safeAreaReducer';

export type SafeAreaState = typeof initialState;
interface SafeAreaContextType {
  state: SafeAreaState;
  dispatch: Dispatch<SafeAreaAction>;
}

export const SafeAreaContext = createContext<SafeAreaContextType>({
  state: initialState,
  dispatch: () => null,
});
