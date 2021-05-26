import {
  forwardRef,
  PopoverContent,
  PopoverContentProps,
  useMergeRefs,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { CreateInput } from './components/create-input';
import { EmptyState } from './components/empty-state';
import { getItemKeys, handleItemGroup, useRefDimensions } from './helpers/list';
import { StoreContext } from './store';
import { Item, ItemAction } from './store/reducers/item';
import { isChild } from './utils/components';

interface AutoCompleteList extends PopoverContentProps {}

export const AutoCompleteList = forwardRef<AutoCompleteList, 'div'>(
  (props, outRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const refs = useMergeRefs(ref, outRef);
    const { children, ...rest } = props;
    const { state, dispatch } = useContext(StoreContext);
    const { input } = state;

    useEffect(() => {
      const itemValues: Item[] = getItemKeys(children);
      dispatch({ type: ItemAction.SetAll, payload: itemValues });
    }, [children]);

    const { width } = useRefDimensions(input.ref);

    return (
      <PopoverContent
        {...baseStyles}
        ref={refs}
        {...rest}
        w={width}
        border="solid 1px red"
      >
        {React.Children.map(children, (child: any) =>
          isChild(child, 'AutoCompleteItem')
            ? React.cloneElement(child, { optionKey: child.key })
            : handleItemGroup(child, state)
        )}

        <CreateInput />

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
