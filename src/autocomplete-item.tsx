import {
  CSSObject,
  Flex,
  FlexProps,
  forwardRef,
  useMergeRefs,
} from "@chakra-ui/react";
import { __DEV__ } from "@chakra-ui/utils";
import React, { useEffect, useRef } from "react";

import { useAutoCompleteContext } from "./autocomplete-context";

export interface AutoCompleteItemProps extends FlexProps {
  value: string;
  fixed?: boolean;
  _focus?: CSSObject | any;
  disabled?: boolean;
  _fixed?: CSSObject;
}

export interface Item {
  value: any;
  fixed?: boolean;
  disabled?: boolean;
  noFilter?: boolean;
}

export const AutoCompleteItem = forwardRef<AutoCompleteItemProps, "div">(
  (props, forwardedRef) => {
    const {
      focusedValue,
      getItemProps,
      interactionRef,
    } = useAutoCompleteContext();
    const itemRef = useRef<any>();
    const ref = useMergeRefs(forwardedRef, itemRef);

    const itemProps = getItemProps(props);
    const { isValidSuggestion } = itemProps.root;

    const isFocused = focusedValue === props.value;

    useEffect(() => {
      if (isFocused && interactionRef.current === "keyboard")
        itemRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, [isFocused]);

    const { children, dangerouslySetInnerHTML, ...rest } = itemProps.item;

    return isValidSuggestion ? (
      <Flex ref={ref} {...baseItemStyles} {...rest}>
        {children ? (
          children
        ) : (
          <span dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
        )}
      </Flex>
    ) : null;
  }
);

if (__DEV__) {
  AutoCompleteItem.displayName = "AutoCompleteItem";
}

export const baseItemStyles: FlexProps = {
  mx: "2",
  px: "2",
  py: "2",
  rounded: "md",
  cursor: "pointer",
};
