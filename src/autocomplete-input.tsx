import {
  Input,
  InputProps,
  Spinner,
  SystemStyleObject,
  //useMultiStyleConfig,
  Box,
} from "@chakra-ui/react";
import { PopoverAnchor } from "@chakra-ui/react";
import { omit, runIfFn, useMergeRefs } from "./utils";
import { useEffect, forwardRef } from "react";

import { useAutoCompleteContext } from "./autocomplete-context";
import { MaybeRenderProp, UseAutoCompleteReturn } from "./types";
import { InputGroup } from "./components/ui/input-group";

export interface AutoCompleteInputProps extends Omit<InputProps, "children"> {
  children?: MaybeRenderProp<{ tags: UseAutoCompleteReturn["tags"] }>;
  wrapStyles?: SystemStyleObject;
  hidePlaceholder?: boolean;
  loadingIcon?: React.ReactNode;
}

const AutoCompleteInputComponent = forwardRef<HTMLInputElement, AutoCompleteInputProps>((props, forwardedRef) => {
  const { isLoading } = useAutoCompleteContext();
  const { loadingIcon, ...restProps } = props;

  const inputProps = omit(restProps, ['children', 'wrapStyles', 'hidePlaceholder']);

  const inputElement = <Input {...inputProps} ref={forwardedRef} />;

  if(isLoading) {
    return (
      <InputGroup endElement={loadingIcon || <Spinner />}>
        {inputElement}
      </InputGroup>
    );
  }

  return inputElement;
});

export const AutoCompleteInput = forwardRef<HTMLInputElement, AutoCompleteInputProps>(
  (props, forwardedRef) => {
    const {
      autoCompleteProps,
      inputRef,
      getInputProps,
      tags,
      setQuery,
      value,
      itemList,
    } = useAutoCompleteContext();

    // const ref = useMergeRefs(forwardedRef, inputRef);

    const {
      children: childrenProp,
      hidePlaceholder,
      ...rest
    } = props;

    const { value: inputValue } = rest;

    useEffect(() => {
      if (
        value !== undefined &&
        (typeof value === "string" || value instanceof String)
      ) {
        const item = itemList.find(l => l.value === value);

        const newQuery = item === undefined ? value : item.label;

        setQuery(newQuery);
      }
    }, [value]);

    useEffect(() => {
      if (
        inputValue !== undefined &&
        (typeof inputValue === "string" || inputValue instanceof String)
      ) {
        setQuery(inputValue);
      }
    }, [inputValue]);

    const themeInput: any = {};//useMultiStyleConfig("Input", props);

    let { wrapper, input: inputProps } = getInputProps(rest, themeInput);
    const { ref: wrapperRef, ...wrapperProps } = wrapper;
    const ref = useMergeRefs(forwardedRef, inputRef);

    const children = runIfFn(childrenProp, { tags });
    if (hidePlaceholder) {
      inputProps = {
        ...inputProps,
        placeholder:
          Array.isArray(children) && children.length
            ? undefined
            : inputProps.placeholder,
      };
    }

    const simpleInput = (
      <AutoCompleteInputComponent
        {...(inputProps as any)}
        ref={ref}
      />
    );

    const multipleInput = (
      <Box {...wrapperProps} ref={wrapperRef}>
        {children}
        {simpleInput}
      </Box>
    );

    return (
      <PopoverAnchor w="full">
        {autoCompleteProps.multiple ? multipleInput : simpleInput}
      </PopoverAnchor>
    );
  }
);

AutoCompleteInput.displayName = "Input";
