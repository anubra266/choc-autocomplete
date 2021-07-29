import React from "react";

export const siblingInfo = (children: React.ReactNode) => {
  return React.Children.map(children, (child: any, i) => {
    if (child.type.displayName === "AutoCompleteGroup") {
      const sibling: any = React.Children.toArray(children)[i + 1];
      return React.cloneElement(child, {
        groupSibling: sibling
          ? sibling.type.displayName === "AutoCompleteGroup"
          : false,
      });
    }
    return child;
  });
};
