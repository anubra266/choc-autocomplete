import React, { createContext, Dispatch, ProviderProps } from 'react';
import { InputActions } from './reducers/input';

export interface State {
  input: { value: string };
}

export type ActionMap<M extends Record<string, any>> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type ContextValue = {
  state: State;
  dispatch: Dispatch<InputActions>;
};

export const Store = createContext({} as ContextValue);

const StoreProvider = (props: ProviderProps<ContextValue>) => (
  <Store.Provider {...props} />
);

export default StoreProvider;
