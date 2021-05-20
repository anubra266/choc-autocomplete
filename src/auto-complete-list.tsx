import { Box, BoxProps, chakra, forwardRef } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { AutoCompleteItem } from './auto-complete-item';
import { EmptyState } from './components/empty-state';
import { getItemKeys, handleItemGroup } from './helpers/list';
import { StoreContext } from './store';
import { Item, ItemAction } from './store/reducers/item';
import { isChild } from './utils/components';

interface AutoCompleteList extends BoxProps {}

export const AutoCompleteList = forwardRef<AutoCompleteList, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props;
    const { state, dispatch } = useContext(StoreContext);
    const { autocomplete, item, list, input } = state;

    const filteredItems = item.filtered;
    const emptyState = autocomplete.emptyState;
    const emphasize = autocomplete.emphasize;
    const isVisible = list.visible;
    const inputValue = input.value;

    const isEmpty = filteredItems.length < 1 && !emptyState;
    const itemExists = item.list.some(i => i.value === input.value);

    useEffect(() => {
      const itemValues: Item[] = getItemKeys(children);
      dispatch({ type: ItemAction.SetAll, payload: itemValues });
    }, [children]);

    const emphasizeStyles =
      typeof emphasize === 'object'
        ? emphasize
        : {
            fontWeight: 'extrabold',
          };

    return (
      <Box
        {...baseStyles}
        {...(isVisible && !isEmpty && visibleStyles)}
        ref={ref}
        {...rest}
      >
        {React.Children.map(children, (child: any) =>
          isChild(child, 'AutoCompleteItem')
            ? React.cloneElement(child, { optionKey: child.key })
            : handleItemGroup(child, state)
        )}

        {!!inputValue.length && autocomplete.creatable && !itemExists && (
          <AutoCompleteItem value={inputValue} optionKey="newInput">
            Add &nbsp;
            <chakra.span sx={emphasizeStyles}>"{inputValue}"</chakra.span>
          </AutoCompleteItem>
        )}

        <EmptyState />
      </Box>
    );
  }
);

AutoCompleteList.displayName = 'AutoCompleteList';

const baseStyles: BoxProps = {
  mt: '4',
  py: '4',
  w: 'full',
  opacity: '0',
  bg: '#232934',
  rounded: 'md',
  maxH: '400px',
  shadow: 'base',
  pos: 'absolute',
  zIndex: 'popover',
  overflowY: 'auto',
  visibility: 'hidden',
  transition: '.3s ease',

  _light: {
    bg: '#ffffff',
  },
};

const visibleStyles: BoxProps = {
  opacity: 1,
  visibility: 'visible',
};
