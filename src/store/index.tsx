import React, { createContext, Dispatch, ProviderProps } from 'react';
import { AutoComplete } from '../auto-complete-provider';
import { AutoCompleteActions } from './reducers/autocomplete';
import { InputActions } from './reducers/input';
import { Item, ItemActions } from './reducers/item';
import { ListActions } from './reducers/list';

export interface State {
  autocomplete: { value: string } & Pick<
    AutoComplete,
    'emptyState' | 'rollNavigation' | 'focusInputOnSelect'
  >;
  input: {
    value: string;
    ref: React.RefObject<HTMLInputElement> | undefined;
  };
  item: { active: number; list: Item[]; filtered: Item[] };
  list: { visible: boolean };
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
  dispatch: Dispatch<
    AutoCompleteActions | InputActions | ItemActions | ListActions
  >;
};

export const StoreContext = createContext({} as ContextValue);

const StoreProvider = (props: ProviderProps<ContextValue>) => (
  <StoreContext.Provider {...props} />
);

export default StoreProvider;
