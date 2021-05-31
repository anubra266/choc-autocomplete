import { BoxProps } from '@chakra-ui/react';
import { createContext } from '@chakra-ui/react-utils';
import React, { Dispatch } from 'react';
import { AutoComplete } from '../auto-complete-provider';
import { AutoCompleteActions } from './reducers/autocomplete';
import { InputActions } from './reducers/input';
import { Item, ItemActions } from './reducers/item';
import { ListActions } from './reducers/list';

export interface State {
  autocomplete: { value: string } & Omit<AutoComplete, keyof BoxProps>;
  input: {
    value: string;
    ref: React.RefObject<HTMLInputElement> | undefined;
  };
  item: {
    active: number;
    list: Item[];
    filtered: Item[];
    fixed: Record<string, React.RefObject<HTMLDivElement>>;
  };
  list: {
    visible: boolean;
    ref: React.RefObject<HTMLDivElement> | undefined;
  };
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

export type StoreActions =
  | AutoCompleteActions
  | InputActions
  | ItemActions
  | ListActions;

export type StoreDispatch = Dispatch<StoreActions>;

type ContextValue = {
  state: State;
  dispatch: StoreDispatch;
};

export const [AutoCompleteProvider, useAutoCompleteContext] = createContext<
  ContextValue
>({
  name: 'AutoCompleteContext',
});

export default AutoCompleteProvider;
