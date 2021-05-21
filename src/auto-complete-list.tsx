import {
  chakra,
  forwardRef,
  PopoverContent,
  PopoverContentProps,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { AutoCompleteItem } from './auto-complete-item';
import { EmptyState } from './components/empty-state';
import { getItemKeys, handleItemGroup, useRefDimensions } from './helpers/list';
import { StoreContext } from './store';
import { Item, ItemAction } from './store/reducers/item';
import { isChild } from './utils/components';

interface AutoCompleteList extends PopoverContentProps {}

export const AutoCompleteList = forwardRef<AutoCompleteList, 'div'>(
  (props, ref) => {
    const { children, ...rest } = props;
    const { state, dispatch } = useContext(StoreContext);
    const { autocomplete, item, input } = state;

    const emphasize = autocomplete.emphasize;
    const inputValue = input.value;

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

    const { width } = useRefDimensions(input.ref);

    return (
      <PopoverContent {...baseStyles} ref={ref} {...rest} w={width}>
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
      </PopoverContent>
    );
  }
);

AutoCompleteList.displayName = 'AutoCompleteList';

const baseStyles: PopoverContentProps = {
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

  _light: {
    bg: '#ffffff',
  },
};
