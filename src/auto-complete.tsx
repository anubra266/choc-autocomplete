import React, { useContext } from 'react';
import { Box, forwardRef } from '@chakra-ui/react';
import { AutoComplete } from './auto-complete-provider';
import { runIfFn } from './utils/runIfFn';
import { StoreContext } from './store';

export const AutoCompleteBody = forwardRef<AutoComplete, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props;
    const { state } = useContext(StoreContext);

    return (
      <Box pos="relative" ref={ref} {...rest}>
        {runIfFn(children, { value: state.input.value })}
      </Box>
    );
  }
);
