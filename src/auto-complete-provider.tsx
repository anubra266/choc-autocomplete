import { BoxProps, forwardRef } from '@chakra-ui/react';
import React, { ReactNode, useMemo, useReducer } from 'react';
import { AutoCompleteBody } from './auto-complete';
import StoreProvider, { State } from './store';
import { AutoCompleteReducer } from './store/reducers/autocomplete';
import { inputReducer } from './store/reducers/input';
import { itemReducer } from './store/reducers/item';

type ChildrenProps = { isOpen: boolean; onClose: () => void };

export interface AutoComplete extends BoxProps {
  children: ((props?: ChildrenProps) => ReactNode) | ReactNode;
  emptyState?: boolean | ReactNode;
}

export const AutoComplete = forwardRef<AutoComplete, 'div'>((props, ref) => {
  const { emptyState, ...rest } = props;

  const initialState = {
    autocomplete: {
      emptyState,
    },
    input: {
      value: '',
    },
    item: {
      active: -1,
      list: [],
      filtered: [],
    },
  };

  const mainReducer = ({ autocomplete, input, item }: State, action: any) => ({
    autocomplete: AutoCompleteReducer(autocomplete, action),
    input: inputReducer(input, action),
    item: itemReducer(item, action),
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
