import { Flex, FlexProps } from '@chakra-ui/layout';
import React from 'react';

type AutoCompleteDivider = FlexProps;

export const AutoCompleteDivider = (props: AutoCompleteDivider) => {
  return (
    <Flex
      border="0"
      borderBottom="solid 1px"
      borderColor="inherit"
      my="0.5rem"
      opacity="0.6"
      {...props}
    />
  );
};
