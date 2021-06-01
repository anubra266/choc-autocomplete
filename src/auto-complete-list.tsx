import {
  forwardRef,
  PopoverContent,
  PopoverContentProps,
  useMergeRefs,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { CreateInput } from './components/create-input';
import { EmptyState } from './components/empty-state';
import {
  closeList,
  getItemKeys,
  handleListChild,
  useRefDimensions,
} from './helpers/list';
import { useAutoCompleteContext } from './store';
import { Item, ItemAction } from './store/reducers/item';
import { ListAction } from './store/reducers/list';

export interface AutoCompleteListProps extends PopoverContentProps {}

export const AutoCompleteList = forwardRef<AutoCompleteListProps, 'div'>(
  (props, outRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const refs = useMergeRefs(ref, outRef);
    const { children, ...rest } = props;
    const childCount = React.Children.count(children);
    const { state, dispatch } = useAutoCompleteContext();
    const { input } = state;

    useEffect(() => {
      dispatch({ type: ListAction.SetRef, payload: ref });
    }, []);

    useEffect(() => {
      const itemValues: Item[] = getItemKeys(children);
      dispatch({ type: ItemAction.SetAll, payload: itemValues });
    }, [childCount]);

    const { width } = useRefDimensions(input.ref);

    return (
      <PopoverContent
        tabIndex={0}
        {...baseStyles}
        ref={refs}
        w={width}
        _focus={{ boxShadow: 'none' }}
        {...rest}
      >
        {React.Children.map(children, child => handleListChild(child, state))}
        <CreateInput />
        <EmptyState
          onClick={() => {
            closeList(dispatch);
          }}
        />
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
  border: 'none',
  shadow: 'base',
  pos: 'absolute',
  zIndex: 'popover',
  overflowY: 'auto',

  _light: {
    bg: '#ffffff',
  },
};
