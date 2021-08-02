import { Flex, FlexProps } from "@chakra-ui/react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { __DEV__, isEmpty, runIfFn } from "@chakra-ui/utils";

import React from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { baseItemStyles } from "./autocomplete-item";

interface AutoCompleteCreatableProps extends FlexProps {
  children?: MaybeRenderProp<{ value: any }>;
}

export function AutoCompleteCreatable(props: AutoCompleteCreatableProps) {
  const { children: childrenProp, ...rest } = props;
  const {
    autoCompleteProps,
    getItemProps,
    query,
    filteredList,
  } = useAutoCompleteContext();

  const queryValue = <mark>{query}</mark>;
  const { children, ...itemProps } = getItemProps({
    ...props,
    value: query,
    children: runIfFn(childrenProp, {
      value: queryValue,
    }),
  }).item;

  const queryExistsInList = filteredList.some(i => i.value === query);
  const showCreatable =
    autoCompleteProps.creatable && !isEmpty(query) && !queryExistsInList;

  return showCreatable ? (
    <Flex {...baseItemStyles} {...itemProps} {...rest}>
      {children || `Add ${query}`}
    </Flex>
  ) : null;
}

if (__DEV__) {
  AutoCompleteCreatable.displayName = "AutoCompleteCreatable";
}
