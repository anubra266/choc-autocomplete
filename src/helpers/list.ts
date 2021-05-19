import React, { ReactNode } from 'react';
import { isChild } from '../utils/components';

export const setGroupItemKeys = (group: any) => {
  if (isChild(group, 'AutoCompleteGroup')) {
    //TODO return null if there's no valid child here
    const children: any[] = group.props.children;
    const childrenWithKeys = children.reduce((acc, child) => {
      acc.push(
        isChild(child, 'AutoCompleteItem')
          ? React.cloneElement(child, { optionKey: child.key })
          : child
      );
      return acc;
    }, []);
    return React.cloneElement(group, { children: childrenWithKeys });
  } else return group;
};

export const getItemKeys: string[] | any = (children: ReactNode) => {
  return React.Children.map(children, (child: any) => {
    return (
      isChild(child, 'AutoCompleteItem') ||
      child.props.children?.map((item: any) =>
        isChild(item, 'AutoCompleteItem')
      )
    );
  });
};
