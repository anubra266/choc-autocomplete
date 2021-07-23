import React from "react";
import { runIfFn, __DEV__ } from "@chakra-ui/utils";

import { AutoCompleteProvider } from "./autocomplete-context";
import { UseAutoCompleteProps, useAutoComplete } from "./use-autocomplete";
import { Box, Popover } from "@chakra-ui/react";

export interface AutoCompleteProps extends UseAutoCompleteProps {
  children: React.ReactNode;
}

export const AutoComplete = (props: AutoCompleteProps) => {
  const context = useAutoComplete(props);
  const { isOpen, onClose, onOpen } = context;

  const children = runIfFn(props.children, context);

  return (
    <AutoCompleteProvider value={context}>
      <Popover
        isLazy
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        autoFocus={false}
        placement="bottom"
        returnFocusOnClose={false}
      >
        <Box
          sx={{
            ".chakra-popover__popper": { position: "unset !important" },
          }}
        >
          {children}
        </Box>
      </Popover>
    </AutoCompleteProvider>
  );
};

if (__DEV__) {
  AutoComplete.displayName = "AutoComplete";
}
