import React, { useReducer } from 'react';

import { AddressContext } from './AddressContext';
import { initialState, addressReducer } from './addressSearch';

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(addressReducer, initialState);

  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
};
