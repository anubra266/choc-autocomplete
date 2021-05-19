import { Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import React, { MouseEventHandler, useContext } from 'react';
import { StoreContext } from './store';
import { AutoCompleteAction } from './store/reducers/autocomplete';
import { InputAction } from './store/reducers/input';
import { ItemAction } from './store/reducers/item';
import { returnT, runIfFn } from './utils/operations';

interface AutoCompleteItem extends FlexProps {
  value: string;
  optionKey?: never;
}

export const AutoCompleteItem = forwardRef<AutoCompleteItem, 'div'>(
  (props, ref) => {
    const {
      children,
      value: itemValue,
      optionKey = '',
      onMouseOver,
      onClick,
      ...rest
    } = props;
    const {
      state: {
        autocomplete: { focusInputOnSelect },
        input: { ref: inputRef },
        item,
      },
      dispatch,
    } = useContext(StoreContext);
    const activeItem = item.filtered[item.active];
    const isActiveItem = activeItem?.key === optionKey;
    const isValidSuggestion = item.filtered.some(i => i.key === optionKey);

    const handleMouseOver: MouseEventHandler<HTMLDivElement> = e => {
      runIfFn(onMouseOver, e);
      dispatch({ type: ItemAction.SetWithKey, payload: optionKey });
    };

    const handleOnClick: MouseEventHandler<HTMLDivElement> = e => {
      runIfFn(onClick, e);
      dispatch({ type: InputAction.Set, payload: itemValue });
      dispatch({ type: AutoCompleteAction.Set, payload: itemValue });
      returnT(inputRef?.current).value = itemValue;
      if (focusInputOnSelect) inputRef?.current?.focus();
    };

    return isValidSuggestion ? (
      <Flex
        onMouseOver={handleMouseOver}
        onClick={handleOnClick}
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
