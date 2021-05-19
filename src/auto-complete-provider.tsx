import { BoxProps, forwardRef } from '@chakra-ui/react';
import React, { ReactNode, useMemo, useReducer } from 'react';
import { AutoCompleteBody } from './auto-complete';
import StoreProvider, { State } from './store';
import { AutoCompleteReducer } from './store/reducers/autocomplete';
import { inputReducer } from './store/reducers/input';
import { itemReducer } from './store/reducers/item';
import { listReducer } from './store/reducers/list';

type ChildrenProps = { isOpen: boolean; onClose: () => void };

export interface AutoComplete extends Omit<BoxProps, 'onChange'> {
  children: ((props?: ChildrenProps) => ReactNode) | ReactNode;
  onChange: (value: string) => void;
  emptyState?: boolean | ReactNode;
  rollNavigation?: boolean;
  focusInputOnSelect?: boolean;
}

export const AutoComplete = forwardRef<AutoComplete, 'div'>((props, ref) => {
  const { emptyState, rollNavigation, focusInputOnSelect, ...rest } = props;

  const initialState: State = {
    autocomplete: {
      value: '',
      emptyState,
      rollNavigation,
      focusInputOnSelect,
    },
    input: {
      value: '',
      ref: undefined,
    },
    item: {
      active: -1,
      list: [],
      filtered: [],
    },
    list: {
      visible: false,
    },
  };

  const mainReducer = (
    { autocomplete, input, item, list }: State,
    action: any
  ) => ({
    autocomplete: AutoCompleteReducer(autocomplete, action),
    input: inputReducer(input, action),
    item: itemReducer(item, action),
    list: listReducer(list, action),
  });

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const providerValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <StoreProvider value={providerValue}>
      <AutoCompleteBody ref={ref} {...rest} />
    </StoreProvider>
  );
});
