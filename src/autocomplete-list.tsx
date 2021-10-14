import {
  forwardRef,
  PopoverContent,
  PopoverContentProps,
  useMergeRefs,
} from "@chakra-ui/react";
import React from "react";
import { useAutoCompleteContext } from "./autocomplete-context";
import { EmptyState } from "./components/empty-state";
import { siblingInfo } from "./helpers/list";

export type AutoCompleteListProps = PopoverContentProps;

export const AutoCompleteList = forwardRef<AutoCompleteListProps, "div">(
  (props, forwardedRef) => {
    const { children, ...rest } = props;
    const { listRef, getListProps } = useAutoCompleteContext();
    const ref = useMergeRefs(forwardedRef, listRef);
    const listProps = getListProps();

    return (
      <PopoverContent ref={ref} {...baseStyles} {...listProps} {...rest}>
        {siblingInfo(children)}
        <EmptyState />
      </PopoverContent>
    );
  }
);

AutoCompleteList.displayName = "AutoCompleteList";

const baseStyles: PopoverContentProps = {
  mt: "4",
  py: "4",
  opacity: "0",
  bg: "#232934",
  borderRadius: "md",
  maxH: "350px",
  border: "none",
  boxShadow: "base",
  pos: "absolute",
  zIndex: "popover",
  overflowY: "auto",

  _light: {
    bg: "#ffffff",
  },

  _focus: {
    boxShadow: "none",
  },
};
