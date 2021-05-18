import { Flex, FlexProps } from '@chakra-ui/layout';
import React from 'react';

interface AutoCompleteItem extends FlexProps {
  value: string;
}

export const AutoCompleteItem = (props: AutoCompleteItem) => {
  const { children, ...rest } = props;
  return <Flex {...rest}>{children}</Flex>;
};
