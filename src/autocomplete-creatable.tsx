import { Flex, FlexProps } from "@chakra-ui/react";
import { __DEV__, runIfFn } from "@chakra-ui/utils";

import React from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { baseItemStyles } from "./autocomplete-item";

interface AutoCompleteCreatableProps extends FlexProps {
  children?: React.ReactNode;
}

export function AutoCompleteCreatable(props: AutoCompleteCreatableProps) {
  const { children: childrenProp, ...rest } = props;
  const { autoCompleteProps, getItemProps, query } = useAutoCompleteContext();

  const queryValue = <mark>{query}</mark>;
  const { children, ...itemProps } = getItemProps({
    ...props,
    value: query,
    children: runIfFn(childrenProp, {
      value: queryValue,
    }),
  }).item;

  return autoCompleteProps.creatable ? (
    <Flex {...baseItemStyles} {...itemProps} {...rest}>
      {children || `Add ${query}`}
    </Flex>
  ) : null;
}

if (__DEV__) {
  AutoCompleteCreatable.displayName = "AutoCompleteCreatable";
}
