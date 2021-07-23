import {
  forwardRef,
  PopoverContent,
  PopoverContentProps,
  Portal,
  useMergeRefs,
} from "@chakra-ui/react";
import { __DEV__ } from "@chakra-ui/utils";
import React from "react";
import { useAutoCompleteContext } from "./autocomplete-context";

export const AutoCompleteList = forwardRef<PopoverContentProps, "div">(
  (props, forwardedRef) => {
    const { children, ...rest } = props;
    const { listRef, getListProps } = useAutoCompleteContext();
    const ref = useMergeRefs(forwardedRef, listRef);

    return (
      <Portal>
        <PopoverContent
          maxHeight="16.5rem"
          overflow="auto"
          zIndex="popover"
          ref={ref}
          {...getListProps()}
          {...rest}
        >
          {children}
        </PopoverContent>
      </Portal>
    );
  }
);

if (__DEV__) {
  AutoCompleteList.displayName = "AutoCompleteList";
}
