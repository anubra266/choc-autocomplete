import { Box, BoxProps, forwardRef } from '@chakra-ui/react';
import React from 'react';

interface AutoCompleteList extends BoxProps {}

export const AutoCompleteList = forwardRef<AutoCompleteList, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props;

    const baseStyles: BoxProps = {
      pos: 'absolute',
      w: 'full',
      zIndex: 'popover',
    };

    return (
      <Box {...baseStyles} ref={ref} {...rest}>
        {children}
      </Box>
    );
  }
);

AutoCompleteList.displayName = 'AutoCompleteList';
