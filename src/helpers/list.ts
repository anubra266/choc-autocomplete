import React from "react";

const VALID_AUTOCOMPLETE_LIST_CHILDREN = [
  "AutoCompleteGroup",
  "AutoCompleteItem",
  "AutoCompleteCreatable",
];

export const siblingInfo = (children: React.ReactNode) => {
  const items = React.Children.map(children, (child: any, i) => {
    if (child?.type?.displayName === "AutoCompleteGroup") {
      const sibling: any = React.Children.toArray(children)[i + 1];
      return React.cloneElement(child, {
        groupSibling: sibling
          ? sibling.type.displayName === "AutoCompleteGroup"
          : false,
      });
    }
    return child;
  }) as React.ReactNode;

  const nonAutocompleteItems = React.Children.toArray(items).filter(
    (child: any) => {
      return !VALID_AUTOCOMPLETE_LIST_CHILDREN.includes(
        child?.type?.displayName
      );
    }
  );

  const autoCompleteItems = React.Children.toArray(items).filter(
    (child: any) => {
      return VALID_AUTOCOMPLETE_LIST_CHILDREN.includes(
        child?.type?.displayName
      );
    }
  );

  return [autoCompleteItems, nonAutocompleteItems] as const;
};
