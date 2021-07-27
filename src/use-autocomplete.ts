import {
  FlexProps,
  InputProps,
  useDimensions,
  useDisclosure,
} from "@chakra-ui/react";
import {
  callAll,
  getFirstItem,
  getLastItem,
  getNextItem,
  getPrevItem,
  runIfFn,
} from "@chakra-ui/utils";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";

import { AutoCompleteInputProps } from "./autocomplete-input";
import { AutoCompleteProps } from "./autocomplete";
import { AutoCompleteItemProps, Item } from "./autocomplete-item";
import { getFocusedStyles, getItemList } from "./helpers/items";
import { fuzzyScore } from "./helpers/fuzzySearch";

export type UseAutoCompleteProps = Partial<{
  multiple: boolean;
  onChange: (value: string) => void;
  rollNavigation: boolean;
}>;

export type InputReturnProps = {
  wrapper: {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    ref: React.RefObject<HTMLDivElement>;
  };
  input: InputProps;
};

export type ItemReturnProps = {
  item: FlexProps;
  root: {
    isValidSuggestion: boolean;
  };
};

export type ListReturnProps = {
  width: number;
};

export type UseAutoCompleteReturn = {
  children: React.ReactNode;
  filteredList: Item[];
  focusedValue: Item["value"];
  getInputProps: (props: AutoCompleteInputProps) => InputReturnProps;
  getItemProps: (props: AutoCompleteItemProps) => ItemReturnProps;
  getListProps: () => ListReturnProps;
  inputRef: React.RefObject<HTMLInputElement>;
  interactionRef: React.RefObject<"mouse" | "keyboard" | null>;
  isOpen: boolean;
  itemList: Item[];
  listRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onOpen: () => void;
  setQuery: Dispatch<SetStateAction<any>>;
  values: Item["value"][];
};

/**
 * useAutoComplete that provides all the state and focus management logic
 * for the autocomplete component. It is consumed by the `Autocomplete` component
 *
 */

export function useAutoComplete(
  autoCompleteProps: AutoCompleteProps
): UseAutoCompleteReturn {
  const { isOpen, onClose, onOpen } = useDisclosure({});

  const children = runIfFn(autoCompleteProps.children);
  const itemList: Item[] = getItemList(children);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<"mouse" | "keyboard" | null>(null);

  const [focusedValue, setFocusedValue] = useState<Item["value"]>(
    itemList[0].value
  );

  const [query, setQuery] = useState("");

  const [values, setValues] = useState<any[]>([]);

  const defaultSort = (value: Item["value"]) => {
    return fuzzyScore(query, value) >= 0.5 || value.indexOf(query) >= 0;
  };

  const filteredList = itemList.filter(i => {
    return i.fixed || runIfFn(defaultSort, i.value);
  });

  const selectItem = (itemValue: Item["value"]) => {
    setValues(v =>
      autoCompleteProps.multiple ? [...v, itemValue] : [itemValue]
    );
    setQuery(itemValue);
    runIfFn(autoCompleteProps.onChange, itemValue);
  };

  const focusedIndex = filteredList.findIndex(i => i.value === focusedValue);
  const nextItem = getNextItem(
    focusedIndex,
    filteredList,
    !!autoCompleteProps.rollNavigation
  );
  const prevItem = getPrevItem(
    focusedIndex,
    filteredList,
    !!autoCompleteProps.rollNavigation
  );
  const firstItem = getFirstItem(filteredList);
  const lastItem = getLastItem(filteredList);

  const getInputProps: UseAutoCompleteReturn["getInputProps"] = props => {
    const { onBlur, onChange, onFocus, onKeyDown, ...rest } = props;

    return {
      wrapper: {
        onClick: () => {
          inputRef?.current?.focus();
        },
        ref: inputWrapperRef,
      },
      input: {
        onFocus: () => {
          runIfFn(onFocus);
          onOpen();
        },
        onBlur: e => {
          runIfFn(onBlur);
          const listIsFocused = e.relatedTarget === listRef?.current;
          if (!listIsFocused) onClose();
        },
        onChange: e => {
          runIfFn(onChange, e);
          setQuery(e.target.value);
        },
        onKeyDown: e => {
          runIfFn(onKeyDown, e);
          interactionRef.current = "keyboard";

          const { key } = e;

          if (key === "Enter") {
            selectItem(filteredList[focusedIndex].value);
            e.preventDefault();
            return;
          }

          if (key === "ArrowDown") {
            setFocusedValue(nextItem.value);
            e.preventDefault();
            return;
          }

          if (key === "ArrowUp") {
            setFocusedValue(prevItem.value);

            e.preventDefault();
            return;
          }

          if (key === "Tab") {
            setFocusedValue(nextItem.value);
            e.preventDefault();
            return;
          }

          if (key === "Home") {
            setFocusedValue(firstItem?.value);
            e.preventDefault();
            return;
          }

          if (key === "End") {
            setFocusedValue(lastItem?.value);
            e.preventDefault();
            return;
          }

          if (key === "Escape") {
            callAll(onClose, e.preventDefault);
          }
        },
        value: query,
        ...rest,
      },
    };
  };

  const getListProps: UseAutoCompleteReturn["getListProps"] = () => {
    const dim = useDimensions(inputWrapperRef, true);
    const width = dim?.marginBox.width as number;

    return {
      width,
    };
  };

  const getItemProps: UseAutoCompleteReturn["getItemProps"] = props => {
    const { _fixed, _focus, value, fixed, onClick, ...rest } = props;
    const isFocused = value === focusedValue;
    const isValidSuggestion =
      filteredList.findIndex(i => i.value === value) >= 0;
    return {
      item: {
        onClick: e => {
          runIfFn(onClick, e);
          selectItem(value);
        },
        onMouseOver: () => {
          setFocusedValue(value);
          interactionRef.current = "mouse";
        },
        ...(isFocused && (_focus || getFocusedStyles())),
        ...(fixed && _fixed),
        ...rest,
      },
      root: {
        isValidSuggestion,
      },
    };
  };

  return {
    children,
    filteredList,
    focusedValue,
    getInputProps,
    getItemProps,
    getListProps,
    inputRef,
    interactionRef,
    isOpen,
    itemList,
    listRef,
    onClose,
    onOpen,
    setQuery,
    values,
  };
}
