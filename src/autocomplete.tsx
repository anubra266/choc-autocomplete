import React, { useImperativeHandle } from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";

import { AutoCompleteProvider } from "./autocomplete-context";
import { useAutoComplete } from "./use-autocomplete";
import { chakra, forwardRef, Popover } from "@chakra-ui/react";
import { AutoCompleteRefMethods, UseAutoCompleteProps } from "./types";

export type AutoCompleteChildProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export interface AutoCompleteProps extends UseAutoCompleteProps {
  children: MaybeRenderProp<AutoCompleteChildProps>;
  ref?: React.RefObject<AutoCompleteRefMethods>;
}

export const AutoComplete = forwardRef<AutoCompleteProps, "div">(
  (props, ref) => {
    const context = useAutoComplete(props);
    const {
      children,
      isOpen,
      onClose,
      onOpen,
      placement, 
      resetItems,
      removeItem,
    } = context;

    useImperativeHandle(ref, () => ({
      resetItems,
      removeItem,
    }));

    const { matchWidth = true } = context.autoCompleteProps;

    return (
      <AutoCompleteProvider value={context}>
        <Popover
          isLazy
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          autoFocus={false}
          placement={placement}
          closeOnBlur={true}
          matchWidth={matchWidth}
        >
          <chakra.div
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
