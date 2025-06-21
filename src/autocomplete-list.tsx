import {
  Center, 
  forwardRef,
  PopoverContent,
  PopoverContentProps,
  Portal,
  Spinner, 
  useMergeRefs,
} from "@chakra-ui/react";
import React from "react";
import { useAutoCompleteContext } from "./autocomplete-context";
import { EmptyState } from "./components/empty-state";
import { siblingInfo } from "./helpers/list";

export interface AutoCompleteListProps extends PopoverContentProps {
  loadingState?: React.ReactNode
};

export const AutoCompleteList = forwardRef<AutoCompleteListProps, "div">(
  (props, forwardedRef) => {
    const { children, loadingState, ...rest } = props;
    const { listRef, isLoading } = useAutoCompleteContext();
    const ref = useMergeRefs(forwardedRef, listRef);
    const [autoCompleteItems, nonAutoCompleteItems] = siblingInfo(children);

    return (
      <Portal appendToParentPortal={false}>
        <PopoverContent ref={ref} w='inherit' {...baseStyles} {...rest}>
          { isLoading && (
            <Center>
              { loadingState || <Spinner size="md" /> }
            </Center>
          )}
          { !isLoading && (
            <>
              {autoCompleteItems}
              <EmptyState />
              {nonAutoCompleteItems}
            </>
          )}
        </PopoverContent>
      </Portal>
    );
  }
);

AutoCompleteList.displayName = "AutoCompleteList";

const baseStyles: PopoverContentProps = {
  py: "4",
  opacity: "0",
  bg: "#232934",
  rounded: "md",
  maxH: "350px",
  border: "none",
  shadow: "base",
  zIndex: "popover",
  overflowY: "auto",

  _light: {
    bg: "#ffffff",
  },

  _focus: {
    boxShadow: "none",
  },
};