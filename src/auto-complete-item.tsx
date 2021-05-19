import { Flex, FlexProps } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { StoreContext } from './store';

interface AutoCompleteItem extends FlexProps {
  value: string;
  optionKey?: never;
}

export const AutoCompleteItem = (props: AutoCompleteItem) => {
  const { children, optionKey, ...rest } = props;
  console.log("🚀 ~ file: auto-complete-item.tsx ~ line 12 ~ AutoCompleteItem ~ optionKey", optionKey)
  const { state, dispatch } = useContext(StoreContext);
  console.log(state, dispatch);

  return (
    <Flex {...baseStyles} {...activeStyles} {...rest}>
      {children}
    </Flex>
  );
};

AutoCompleteItem.displayName = 'AutoCompleteItem';

const baseStyles: FlexProps = {
  mx: '2',
  px: '2',
  py: '2',
  rounded: 'md',
  cursor: 'pointer',
};

const activeStyles: FlexProps = {
  bg: 'whiteAlpha.100',
  _light: {
    bg: 'gray.200',
  },
};
