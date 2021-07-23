import {
  forwardRef,
  Input,
  InputProps,
  PopoverTrigger,
  useMergeRefs,
  Wrap,
} from "@chakra-ui/react";
import { __DEV__ } from "@chakra-ui/utils";
import React from "react";

import { useAutoCompleteContext } from "./autocomplete-context";

interface AutoCompleteInputProps extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInputProps, "input">(
  (props, forwardedRef) => {
    const { ...rest } = props;
    const { inputRef, getInputProps } = useAutoCompleteContext();

    const ref = useMergeRefs(forwardedRef, inputRef);

    return (
      <PopoverTrigger>
        <Wrap {...getInputProps()}>
          <Input {...rest} ref={ref} />
        </Wrap>
      </PopoverTrigger>
    );
  }
);

if (__DEV__) {
  AutoCompleteInput.displayName = "Input";
}

AutoCompleteInput.id = "Input";
