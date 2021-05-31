import { CSSObject, Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import React, { MouseEventHandler } from 'react';
import { useOnOptionHighlight } from './helpers/autocomplete-props/onOptionHighlight';
import { runOnSelect } from './helpers/autocomplete-props/onSelectOption';
import { useEmphasizer } from './helpers/item';
import { useAutoCompleteContext } from './store';
import { ItemAction } from './store/reducers/item';

export interface AutoCompleteItemProps extends FlexProps {
  value: string;
  _focus?: CSSObject | any;
  optionKey?: string;
  // disabled?: boolean;
}

export const AutoCompleteItem = forwardRef<AutoCompleteItemProps, 'div'>(
  (props, ref) => {
    const {
      children,
      value: itemValue,
      optionKey = '',
      _hover,
      _focus,
      onMouseOver,
      onClick,
      sx,
      // disabled,
      ...rest
    } = props;
    const { state, dispatch } = useAutoCompleteContext();
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
      dispatch({ type: ItemAction.SetWithKey, payload: optionKey });
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
        {...itemBaseStyles}
        _hover={_hover}
        {...(isActiveItem && (_focus || itemActiveStyles))}
        sx={{
          ...sx,
          '.emphasizedItem': emphasizeStyles,
        }}
        ref={ref}
        {...rest}
        // {...(disabled && disabledStyles)}
      >
        {isNewInput ? children : itemChild}
      </Flex>
    ) : null;
  }
);

AutoCompleteItem.displayName = 'AutoCompleteItem';
export const itemBaseStyles: FlexProps = {
  mx: '2',
  px: '2',
  py: '2',
  rounded: 'md',
  cursor: 'pointer',
};

export const itemActiveStyles: FlexProps = {
  bg: 'whiteAlpha.100',
  _light: {
    bg: 'gray.200',
  },
};

//TODO
// const disabledStyles: FlexProps = {
//   pointerEvents: 'none',
//   userSelect: 'none',
// };
