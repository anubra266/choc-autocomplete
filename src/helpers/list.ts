import React, { ReactNode, useState } from 'react';
import innerText from 'react-innertext';

import { State, StoreDispatch } from '../store';
import { Item } from '../store/reducers/item';
import { ListAction } from '../store/reducers/list';
import { isChild } from '../utils/components';

export const handleListChild = (child: any, state: State) => {
  const type = child.type.displayName;
  switch (type) {
    case 'AutoCompleteItem':
      return assignChildKey(child);

    case 'AutoCompleteGroup':
      return handleItemGroup(child, state);

    case 'AutoCompleteFixedItem':
      return assignChildKey(child);

    default:
      return child;
  }
};

export const handleItemGroup = (group: any, state: State) => {
  const isValidItem = (child: any) =>
    state.item.filtered.some(i => i.key === child.key) ||
    isChild(child, 'AutoCompleteFixedItem');

  if (isChild(group, 'AutoCompleteGroup')) {
    const children: any[] = group.props.children;
    const childrenWithKeys = children.reduce((acc, child) => {
      acc.push(
        isChild(child, 'AutoCompleteItem') ||
          isChild(child, 'AutoCompleteFixedItem')
          ? assignChildKey(child)
          : child
      );
      return acc;
    }, []);
    return group.props.children.every(
      (groupChild: any) => !isValidItem(groupChild)
    )
      ? null
      : React.cloneElement(group, { children: childrenWithKeys });
  } else return group;
};

export const assignChildKey = (child: any) =>
  React.cloneElement(child, {
    optionKey: child.key || child.props.children.toString(),
  });

export const getItemKeys: string[] | any = (children: ReactNode) => {
  const items: Item[] = [];

  React.Children.map(children, (child: any) => {
    if (isChild(child, 'AutoCompleteItem')) items.push(getChildProps(child));
    else if (isChild(child, 'AutoCompleteGroup'))
      return child.props.children?.map((option: any) => {
        if (isChild(option, 'AutoCompleteItem'))
          items.push(getChildProps(option));
        else if (isChild(option, 'AutoCompleteFixedItem'))
          items.push(getChildProps(option, true));
        else return;
      });
    else if (isChild(child, 'AutoCompleteFixedItem'))
      items.push(getChildProps(child, true));
  });
  return items;
};

const getChildProps = (child: any, fixed?: boolean) => ({
  key: child.key || child.props.children.toString(),
  value: child.props.value || '',
  label: innerText(child.props.children),
  fixed,
});

export const useRefDimensions = (
  ref: React.RefObject<HTMLInputElement> | undefined
) => {
  const [dimensions, setDimensions] = useState({ width: 1, height: 2 });
  React.useEffect(() => {
    if (ref?.current) {
      const { current } = ref;
      const boundingRect = current.getBoundingClientRect();
      const { width, height } = boundingRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    }
  }, [ref]);
  return dimensions;
};

export const closeList = (dispatch: StoreDispatch) => {
  dispatch({ type: ListAction.Hide });
};
