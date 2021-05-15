import { StoreProvider } from 'easy-peasy';
import * as React from 'react';
import store from './store';

interface AutoComplete {
  children: React.ReactNode;
}

export const AutoComplete = (props: AutoComplete) => {
  const { children } = props;
  return <StoreProvider store={store}>{children}</StoreProvider>;
};
