import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import React from 'react';
import { itemActiveStyles, itemBaseStyles } from './auto-complete-item';

export const AutoCompleteFixedItem = forwardRef<FlexProps, 'div'>(
  (props, ref) => {
    return (
      <Flex
        {...itemBaseStyles}
        _hover={itemActiveStyles}
        ref={ref}
        {...props}
      />
    );
  }
);

AutoCompleteFixedItem.displayName = 'AutoCompleteFixedItem';
