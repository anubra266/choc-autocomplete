import { BoxProps, forwardRef } from '@chakra-ui/react';
import React, { ReactNode, useMemo, useReducer } from 'react';
import { AutoCompleteBody } from './auto-complete';
import StoreProvider, {  State } from './store';
import { inputReducer } from './store/reducers/input';

type ChildrenProps = { isOpen: boolean; onClose: () => void };

export interface AutoComplete extends BoxProps {
  children: ((props?: ChildrenProps) => ReactNode) | ReactNode;
}

export const AutoComplete = forwardRef<AutoComplete, 'div'>((props, ref) => {
  const { ...rest } = props;

  const mainReducer = ({ input }: State, action: any) => ({
    input: inputReducer(input, action),
  });

  const initialState = {
    input: {
      value: 'wow',
    },
  };

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
