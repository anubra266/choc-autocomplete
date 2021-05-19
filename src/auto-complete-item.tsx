import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import React, { MouseEventHandler, useContext } from 'react';
import { StoreContext } from './store';
import { ItemAction } from './store/reducers/item';
import { runIfFn } from './utils/runIfFn';

interface AutoCompleteItem extends FlexProps {
  value: string;
  optionKey?: never;
}

export const AutoCompleteItem = forwardRef<AutoCompleteItem, 'div'>(
  (props, ref) => {
    const { children, optionKey = '', onMouseOver, ...rest } = props;
    const {
      state: { item },
      dispatch,
    } = useContext(StoreContext);
    const activeItem = item.filtered[item.active];
    const isActiveItem = activeItem?.key === optionKey;
    const isValidSuggestion =item.filtered.some(
      i => i.key === optionKey
    );
 
    const handleMouseOver: any = (e: MouseEventHandler<HTMLDivElement>) => {
      runIfFn(onMouseOver, e);
      dispatch({ type: ItemAction.SetWithKey, payload: optionKey });
    };

    return isValidSuggestion ? (
      <Flex
        onMouseOver={handleMouseOver}
        {...baseStyles}
        {...(isActiveItem && activeStyles)}
        ref={ref}
        {...rest}
      >
        {children}
      </Flex>
    ) : null;
  }
);

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
