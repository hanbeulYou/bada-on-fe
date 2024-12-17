import React, { useReducer } from 'react';

import { SafeAreaContext } from './SafeAreaContext';
import { initialState, safeAreaReducer } from './safeAreaReducer';

export const SafeAreaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(safeAreaReducer, initialState);

  return (
    <SafeAreaContext.Provider value={{ state, dispatch }}>
      {children}
    </SafeAreaContext.Provider>
  );
};
