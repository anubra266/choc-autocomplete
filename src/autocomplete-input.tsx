import {
  forwardRef,
  Input,
  InputProps,
  useMergeRefs,
  Wrap,
} from "@chakra-ui/react";
import { __DEV__ } from "@chakra-ui/utils";
import React, { useEffect } from "react";

import { useAutoCompleteContext } from "./autocomplete-context";

export interface AutoCompleteInputProps extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInputProps, "input">(
  (props, forwardedRef) => {
    const { inputRef, getInputProps, setQuery } = useAutoCompleteContext();

    const ref = useMergeRefs(forwardedRef, inputRef);

    const { value, ...rest } = props;

    useEffect(() => {
      setQuery(value ?? "");
    }, [value]);

    const inputProps = getInputProps(rest);

    return (
      <Wrap {...inputProps.wrapper}>
        <Input {...inputProps.input} ref={ref} />
      </Wrap>
    );
  }
);

if (__DEV__) {
  AutoCompleteInput.displayName = "Input";
}

AutoCompleteInput.id = "Input";
