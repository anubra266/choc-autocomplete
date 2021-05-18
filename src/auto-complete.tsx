import React from 'react';
import { Box, forwardRef } from '@chakra-ui/react';
import { AutoComplete } from './auto-complete-provider';
import { runIfFn } from './helpers/runIfFn';

export const AutoCompleteBody = forwardRef<AutoComplete, 'div'>(
  (props, ref) => {
    const {
      children,

      ...rest
    } = props;

    return (
      <Box pos="relative" ref={ref} {...rest}>
        {runIfFn(children, {})}
      </Box>
    );
  }
);
