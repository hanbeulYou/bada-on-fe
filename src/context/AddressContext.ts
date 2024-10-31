import { createContext } from 'react';

import { initialState } from './addressSearch';

export const AddressContext = createContext({ state: initialState });
