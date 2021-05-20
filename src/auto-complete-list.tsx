import { Box, BoxProps, Flex, FlexProps, forwardRef } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { getItemKeys, handleItemGroup } from './helpers/list';
import { StoreContext } from './store';
import { Item, ItemAction } from './store/reducers/item';
import { isChild } from './utils/components';

interface AutoCompleteList extends BoxProps {}

export const AutoCompleteList = forwardRef<AutoCompleteList, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props;
    const { state, dispatch } = useContext(StoreContext);

    const filteredItems = state.item.filtered;
    const emptyState = state.autocomplete.emptyState;
    const isVisible = state.list.visible;

    const isEmpty = filteredItems.length < 1 && !emptyState;

    useEffect(() => {
      const itemValues: Item[] = getItemKeys(children);
      dispatch({ type: ItemAction.SetAll, payload: itemValues });
    }, [children]);

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

        {filteredItems.length < 1 &&
          emptyState &&
          (typeof emptyState === 'boolean' ? (
            <Flex {...emptyStyles}>No options found!</Flex>
          ) : (
            emptyState
          ))}
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

const emptyStyles: FlexProps = {
  fontSize: 'sm',
  align: 'center',
  justify: 'center',
  fontWeight: 'bold',
  fontStyle: 'italic',
};
