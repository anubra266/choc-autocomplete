import React, { ReactNode } from 'react';
import { State } from '../store';
import { Item } from '../store/reducers/item';
import { isChild } from '../utils/components';

export const handleItemGroup = (group: any, state: State) => {
  const isValidItem = (child: any) =>
    state.item.filtered.some(i => i.key === child.key);

  if (isChild(group, 'AutoCompleteGroup')) {
    const children: any[] = group.props.children;
    const childrenWithKeys = children.reduce((acc, child) => {
      acc.push(
        isChild(child, 'AutoCompleteItem')
          ? React.cloneElement(child, { optionKey: child.key })
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

export const getItemKeys: string[] | any = (children: ReactNode) => {
  const items: Item[] = [];

  React.Children.map(children, (child: any) => {
    if (isChild(child, 'AutoCompleteItem')) items.push(getChildProps(child));
    else
      return child.props.children?.map((option: any) => {
        if (isChild(option, 'AutoCompleteItem'))
          items.push(getChildProps(option));
        else return;
      });
  });
  return items;
};

const getChildProps = (child: any) => ({
  key: child.key,
  value: child.props.value,
});
