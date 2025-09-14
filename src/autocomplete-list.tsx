import {
  Center, 
  PopoverBodyProps,
  Spinner, 
} from "@chakra-ui/react";
import { PopoverBody, PopoverContent } from "./components/ui/popover";
import React from "react";
import { useAutoCompleteContext } from "./autocomplete-context";
import { EmptyState } from "./components/empty-state";
import { siblingInfo } from "./helpers/list";
import { useMergeRefs } from "./utils";
import { forwardRef } from "react";

export interface AutoCompleteListProps extends PopoverBodyProps {
  loadingState?: React.ReactNode
};

export const AutoCompleteList = forwardRef<HTMLDivElement, AutoCompleteListProps>(
  (props, forwardedRef) => {
    const { children, loadingState, ...rest } = props;
    const { listRef, isLoading, autoCompleteProps: { isPortalled } } = useAutoCompleteContext();
    const ref = useMergeRefs(forwardedRef, listRef);
    const [autoCompleteItems, nonAutoCompleteItems] = siblingInfo(children);

    return (
      <PopoverContent width="auto" portalled={isPortalled}>
        <PopoverBody ref={ref} w='inherit' {...baseStyles} {...rest}>
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
        </PopoverBody>
      </PopoverContent>
    );
  }
);

AutoCompleteList.displayName = "AutoCompleteList";

const baseStyles: PopoverBodyProps = {
 // py: "4",
  //opacity: "0",
  px: "0px", 
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