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
      mt: '4',
      py: '4',
      bg: 'blackAlpha.200',
      shadow: 'base',
      rounded: 'md',
      maxH: '400px',
      overflowY: 'auto',
      // opacity: '0',
      // visibility: 'hidden',
      // transition: '.3s ease',
    };

    return (
      <Box {...baseStyles} ref={ref} {...rest}>
        {children}
      </Box>
    );
  }
);

AutoCompleteList.displayName = 'AutoCompleteList';
