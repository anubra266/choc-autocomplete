import { Flex, FlexProps } from "@chakra-ui/react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { isEmpty, runIfFn } from "@chakra-ui/utils";

import React from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { baseItemStyles } from "./autocomplete-item";

interface AutoCompleteCreatableProps extends Omit<FlexProps, "children"> {
  children?: MaybeRenderProp<{ value: any }>;
  alwaysDisplay?: boolean;
}

export function AutoCompleteCreatable(props: AutoCompleteCreatableProps) {
  const { alwaysDisplay, children: childrenProp, ...rest } = props;
  const {
    autoCompleteProps,
    getItemProps,
    query,
    filteredResults,
  } = useAutoCompleteContext();

  const { children, ...itemProps } = getItemProps(
    {
      ...props,
      value: query,
      children: runIfFn(childrenProp, {
        value: query,
      }),
    },
    true
  ).item;

  const queryExistsInList = filteredResults.some(i => i.value === query);
  const showWhenEmpty = isEmpty(query) ? alwaysDisplay : true;
  const showCreatable =
    autoCompleteProps.creatable && showWhenEmpty && !queryExistsInList;

  return showCreatable ? (
    <Flex {...baseItemStyles} {...itemProps} {...rest}>
      {children || `Add ${query}`}
    </Flex>
  ) : null;
}

AutoCompleteCreatable.displayName = "AutoCompleteCreatable";
