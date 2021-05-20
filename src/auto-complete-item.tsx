import { CSSObject, Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import React, { MouseEventHandler, useContext } from 'react';
import { StoreContext } from './store';
import { AutoCompleteAction } from './store/reducers/autocomplete';
import { InputAction } from './store/reducers/input';
import { ItemAction } from './store/reducers/item';
import { ListAction } from './store/reducers/list';
import { returnT, runIfFn } from './utils/operations';

interface AutoCompleteItem extends FlexProps {
  value: string;
  _focus?: CSSObject | any;
  optionKey?: string;
}

export const AutoCompleteItem = forwardRef<AutoCompleteItem, 'div'>(
  (props, ref) => {
    const {
      children,
      value: itemValue,
      optionKey,
      _hover,
      _focus,
      onMouseOver,
      onClick,
      sx,
      ...rest
    } = props;
    const {
      state: {
        autocomplete: { focusInputOnSelect, emphasize },
        input: { ref: inputRef, value: inputValue },
        item,
      },
      dispatch,
    } = useContext(StoreContext);
    const activeItem = item.filtered[item.active];
    const isActiveItem = activeItem?.key === optionKey;
    const isValidSuggestion = item.filtered.some(i => i.key === optionKey);

    const handleMouseOver: MouseEventHandler<HTMLDivElement> = e => {
      runIfFn(onMouseOver, e);
      dispatch({ type: ItemAction.SetWithKey, payload: optionKey || '' });
    };

    const handleOnClick: MouseEventHandler<HTMLDivElement> = e => {
      runIfFn(onClick, e);
      dispatch({ type: InputAction.Set, payload: itemValue });
      dispatch({ type: AutoCompleteAction.Set, payload: itemValue });
      returnT(inputRef?.current).value = itemValue;
      if (focusInputOnSelect) inputRef?.current?.focus();
      dispatch({ type: ListAction.Hide });
    };

    const emphasizer =
      typeof children === 'string' ? children.toString() : itemValue;
    const emphasizedChildString = emphasizer.replace(
      new RegExp(inputValue, 'gi'),
      (match: any) => `<a class="emphasizedResult">${match}</a>`
    );
    const emphasizedChild = (
      <span dangerouslySetInnerHTML={{ __html: emphasizedChildString }} />
    );
    const isNewInput = optionKey === 'newInput';
    const itemChild = isNewInput || !emphasize ? children : emphasizedChild;
    const emphasizeStyles =
      typeof emphasize === 'object'
        ? emphasize
        : {
            fontWeight: 'extrabold',
          };

    return isValidSuggestion ? (
      <Flex
        onMouseOver={handleMouseOver}
        onClick={handleOnClick}
        {...baseStyles}
        _hover={_hover}
        {...(isActiveItem && (_focus || activeStyles))}
        sx={{
          ...sx,
          '.emphasizedResult': emphasizeStyles,
        }}
        ref={ref}
        {...rest}
      >
        {itemChild}
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
