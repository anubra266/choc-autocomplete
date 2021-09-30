import {
  CSSObject,
  Flex,
  FlexProps,
  forwardRef,
  useMergeRefs,
} from "@chakra-ui/react";
import { omit, pick } from "@chakra-ui/utils";
import React, { useEffect, useRef } from "react";

import { useAutoCompleteContext } from "./autocomplete-context";

export interface AutoCompleteItemProps extends FlexProps {
  value: any;
  label?: string;
  fixed?: boolean;
  _focus?: CSSObject | any;
  disabled?: boolean;
  _fixed?: CSSObject;
  getValue?: (item: AutoCompleteItemProps["value"]) => any;
  groupId?: string;
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
    const { isValidSuggestion, setItemList, value } = itemProps.root;

    const isFocused = focusedValue === value;

    useEffect(() => {
      if (isFocused && interactionRef.current === "keyboard")
        itemRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, [isFocused, interactionRef]);

    useEffect(() => {
      const item = {
        ...pick(props, ["label", "fixed", "disabled", "groupId"]),
        itemVal: props.value,
        value,
      };
      setItemList((itemList: any) => [...itemList, item]);
    }, []);
    const { children, dangerouslySetInnerHTML, ...restProps } = itemProps.item;

    const rest = omit(restProps, ["groupId"] as any);

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

AutoCompleteItem.displayName = "AutoCompleteItem";

export const baseItemStyles: FlexProps = {
  mx: "2",
  px: "2",
  py: "2",
  borderRadius: "md",
  cursor: "pointer",
};
