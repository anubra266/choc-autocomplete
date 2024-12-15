import React, { useImperativeHandle, forwardRef } from "react";

import { AutoCompleteProvider } from "./autocomplete-context";
import { useAutoComplete } from "./use-autocomplete";
import { chakra } from "@chakra-ui/react";
import { PopoverRoot } from "./components/ui/popover";
import {
  AutoCompleteRefMethods,
  UseAutoCompleteProps,
  MaybeRenderProp,
} from "./types";

export type AutoCompleteChildProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};
export interface AutoCompleteProps extends UseAutoCompleteProps {
  children: MaybeRenderProp<AutoCompleteChildProps>;
  ref?: React.RefObject<AutoCompleteRefMethods>;
}

export const AutoComplete = forwardRef<AutoCompleteRefMethods, AutoCompleteProps>(
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
        <PopoverRoot
          open={isOpen}
          autoFocus={false}
          positioning={{placement, sameWidth: matchWidth}} 
          present={isOpen}
        >
          <chakra.div w="full" ref={ref}>
            {children}
          </chakra.div>
        </PopoverRoot>
      </AutoCompleteProvider>
    );
  }
);

AutoComplete.displayName = "AutoComplete";
