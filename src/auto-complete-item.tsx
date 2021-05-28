import { CSSObject, Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import React, { MouseEventHandler, useContext } from 'react';
import { useOnOptionHighlight } from './helpers/autocomplete-props/onOptionHighlight';
import { runOnSelect } from './helpers/autocomplete-props/onSelectOption';
import { useEmphasizer } from './helpers/item';
import { StoreContext } from './store';
import { ItemAction } from './store/reducers/item';

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
    const { state, dispatch } = useContext(StoreContext);
    const {
      autocomplete: { emphasize },
      input: { value: inputValue },
      item,
    } = state;
    const activeItem = item.filtered[item.active];
    const isActiveItem = activeItem?.key === optionKey;
    useOnOptionHighlight(activeItem);
    const isValidSuggestion = item.filtered.some(i => i.key === optionKey);

    const handleMouseOver: MouseEventHandler<HTMLDivElement> = e => {
      runIfFn(onMouseOver, e);
      dispatch({ type: ItemAction.SetWithKey, payload: optionKey || '' });
    };

    const handleOnClick: MouseEventHandler<HTMLDivElement> = e => {
      runOnSelect(state, dispatch, 'click', () => runIfFn(onClick, e));
    };

    const { itemChild, emphasizeStyles } = useEmphasizer({
      emphasize,
      inputValue,
      optionKey,
      children,
      itemValue,
    });

    const isNewInput = optionKey === 'newInput';

    return isValidSuggestion ? (
      <Flex
        onMouseOver={handleMouseOver}
        onClick={handleOnClick}
        {...baseStyles}
        _hover={_hover}
        {...(isActiveItem && (_focus || activeStyles))}
        sx={{
          ...sx,
          '.emphasizedItem': emphasizeStyles,
        }}
        ref={ref}
        {...rest}
      >
        {isNewInput ? children : itemChild}
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
