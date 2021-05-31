import {
  CSSObject,
  Flex,
  FlexProps,
  forwardRef,
  useMergeRefs,
} from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { itemActiveStyles, itemBaseStyles } from './auto-complete-item';
import { StoreContext } from './store';
import { ItemAction } from './store/reducers/item';

type SelectMethod = 'click' | 'keyboard';
export interface AutoCompleteFixedItemProps extends FlexProps {
  optionKey?: string;
  _focus?: CSSObject | any;
  onItemSelect?: (method?: SelectMethod) => void;
}

export const AutoCompleteFixedItem = forwardRef<
  AutoCompleteFixedItemProps,
  'div'
>((props, outerRef) => {
  const ref = useRef<any>(null);
  const refs = useMergeRefs(outerRef, ref);

  const {
    optionKey = '',
    _focus,
    onMouseOver,
    onItemSelect,
    onClick,
    ...rest
  } = props;

  const {
    state: {
      item: { filtered: filterdItems, active: activeItemIndex },
    },
    dispatch,
  } = useContext(StoreContext);

  useEffect(() => {
    dispatch({
      type: ItemAction.AddFixedRef,
      payload: { key: optionKey, ref },
    });
  }, [ref]);

  const activeItem = filterdItems[activeItemIndex];
  const isActiveItem = activeItem?.key === optionKey;

  const handleMouseOver: MouseEventHandler<HTMLDivElement> = e => {
    runIfFn(onMouseOver, e);
    dispatch({ type: ItemAction.SetWithKey, payload: optionKey });
  };

  const onItemSelected = (method: SelectMethod) => {
    runIfFn(onItemSelect, method);
  };

  const handleClick: MouseEventHandler<HTMLDivElement> = e => {
    runIfFn(onClick, e);
    onItemSelected('click');
  };

  useImperativeHandle(ref, () => ({
    onKeyboardSelect: () => {
      onItemSelected('keyboard');
    },
  }));

  return (
    <Flex
      onMouseOver={handleMouseOver}
      onClick={handleClick}
      {...itemBaseStyles}
      {...(isActiveItem && (_focus || itemActiveStyles))}
      ref={refs}
      {...rest}
    />
  );
});

AutoCompleteFixedItem.displayName = 'AutoCompleteFixedItem';
