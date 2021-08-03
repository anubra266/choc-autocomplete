import {
  forwardRef,
  Input,
  InputProps,
  useMergeRefs,
  useMultiStyleConfig,
  Wrap,
} from "@chakra-ui/react";
import { __DEV__, runIfFn } from "@chakra-ui/utils";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import React, { useEffect } from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { UseAutoCompleteReturn } from "./types";

export interface AutoCompleteInputProps extends InputProps {
  children?: MaybeRenderProp<{ tags: UseAutoCompleteReturn["tags"] }>;
}

export const AutoCompleteInput = forwardRef<AutoCompleteInputProps, "input">(
  (props, forwardedRef) => {
    const {
      inputRef,
      getInputProps,
      setQuery,
      tags,
    } = useAutoCompleteContext();

    const ref = useMergeRefs(forwardedRef, inputRef);

    const { children: childrenProp, value, ...rest } = props;

    useEffect(() => {
      setQuery(value ?? "");
    }, [value]);

    const themeInput: any = useMultiStyleConfig("Input", {
      variant: props.variant,
    });

    const inputProps = getInputProps(rest, themeInput);

    const children = runIfFn(childrenProp, { tags });

    return (
      <Wrap {...inputProps.wrapper}>
        {children}
        <Input {...inputProps.input} ref={ref} />
      </Wrap>
    );
  }
);

if (__DEV__) {
  AutoCompleteInput.displayName = "Input";
}

AutoCompleteInput.id = "Input";
