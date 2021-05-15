import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useStoreState } from './store/hooks';

interface AutoCompleteItem extends FlexProps {
  value: string;
  _focus?: FlexProps;
  optionKey?: string;
}

export const AutoCompleteItem = (props: AutoCompleteItem) => {
  const { value: _value, optionKey, _focus, ...rest } = props;

  const activeOption = useStoreState(state => state.options.activeKey);
  const isActive = activeOption === optionKey;

  const activeStyles: FlexProps = _focus || {
    bg: useColorModeValue('gray.200', 'whiteAlpha.100'),
  };

  const hoverStyles = activeStyles;

  return (
    <Flex
      mx="2"
      px="2"
      py="2"
      rounded="md"
      cursor="pointer"
      _hover={hoverStyles}
      {...(isActive && activeStyles)}
      {...rest}
    />
  );
};

AutoCompleteItem.displayName = 'AutoCompleteItem';
