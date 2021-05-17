import { Box, BoxProps } from '@chakra-ui/layout';
import { StoreProvider } from 'easy-peasy';
import React, { ReactNode } from 'react';
import { createStore } from 'easy-peasy';
import storeModel from './store/model';

type ChildrenProps = { isOpen: boolean; onClose: () => void };
interface AutoComplete extends Omit<BoxProps, 'onChange'> {
  children: ((props?: ChildrenProps) => ReactNode) | ReactNode;
}

const AutoCompleteBody = (props: AutoComplete) => {
  const {
    children,

    ...rest
  } = props;

  return (
    <Box {...rest}>
      {typeof children === 'function' ? children() : children}
    </Box>
  );
};

export const AutoComplete = (props: AutoComplete) => {
  const { ...rest } = props;

  const store = createStore(storeModel, {
    name: `AutoComplete${props.id || ''}Store`,
    initialState: {},
  });

  return (
    <StoreProvider store={store} key={`autocomplete-provider${props.key}`}>
      <AutoCompleteBody {...rest} />
    </StoreProvider>
  );
};
