import React from "react";

import { AutoCompleteProvider } from "./autocomplete-context";
import { useAutoComplete } from "./use-autocomplete";
import { chakra, forwardRef, Popover } from "@chakra-ui/react";
import { UseAutoCompleteProps, UseAutoCompleteReturn } from "./types";

export interface AutoCompleteProps extends UseAutoCompleteProps {
  children: UseAutoCompleteReturn["children"];
}

export const AutoComplete = forwardRef<AutoCompleteProps, "div">(
  (props, ref) => {
    const context = useAutoComplete(props);
    const { children, isOpen, onClose, onOpen } = context;

    return (
      <AutoCompleteProvider value={context}>
        <Popover
          isLazy
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          autoFocus={false}
          placement="bottom"
          closeOnBlur={true}
        >
          <chakra.div
            sx={{
              ".chakra-popover__popper": {
                position: "unset !important",
              },
            }}
            w="full"
            ref={ref}
          >
            {children}
          </chakra.div>
        </Popover>
      </AutoCompleteProvider>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
