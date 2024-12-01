import { createContext } from 'react';

import { initialState } from './safeAreaReducer';

export const SafeAreaContext = createContext({ state: initialState });
