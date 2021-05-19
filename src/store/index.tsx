import React, { createContext, Dispatch, ProviderProps } from 'react';
import { AutoComplete } from '../auto-complete-provider';
import { InputActions } from './reducers/input';
import { Item, ItemActions } from './reducers/item';

export interface State {
  autocomplete: Pick<AutoComplete, 'emptyState'>;
  input: { value: string };
  item: { active: number; list: Item[]; filtered: Item[] };
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
  dispatch: Dispatch<InputActions | ItemActions>;
};

export const StoreContext = createContext({} as ContextValue);

const StoreProvider = (props: ProviderProps<ContextValue>) => (
  <StoreContext.Provider {...props} />
);

export default StoreProvider;
