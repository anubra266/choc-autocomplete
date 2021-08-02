import {
  BoxProps,
  CSSObject,
  FlexProps,
  InputProps,
  useDimensions,
  useDisclosure,
  useUpdateEffect,
} from "@chakra-ui/react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import {
  callAll,
  getFirstItem,
  getLastItem,
  getNextItem,
  getPrevItem,
  isObject,
  isEmpty,
  isUndefined,
  runIfFn,
} from "@chakra-ui/utils";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import { AutoCompleteInputProps } from "./autocomplete-input";
import { AutoCompleteProps } from "./autocomplete";
import { AutoCompleteItemProps, Item } from "./autocomplete-item";
import {
  defaultFilterMethod,
  getFocusedStyles,
  getItemList,
  setEmphasis,
} from "./helpers/items";
import { getMultipleWrapStyles } from "./helpers/input";
import { AutoCompleteGroupProps } from "./autocomplete-group";
import { hasChildren, hasFirstItem, hasLastItem } from "./helpers/group";

export type UseAutoCompleteProps = Partial<{
  closeOnBlur: boolean;
  closeOnSelect: boolean;
  creatable: boolean;
  defaultIsOpen: boolean;
  defaultValues: Item["value"] | Item["value"][];
  emphasize: boolean | CSSObject;
  emptyState: boolean | MaybeRenderProp<{ value: Item["value"] }>;
  filter: (query: string, itemValue: Item["value"]) => boolean;
  focusInputOnSelect: boolean;
  freeSolo: boolean;
  isReadOnly: boolean;
  maxSelections: number;
  maxSuggestions: number;
  multiple: boolean;
  onChange: (value: string | Item["value"][]) => void;
  onSelectOption: (params: {
    optionValue: string;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput: boolean;
  }) => boolean | void;
  onOptionFocus: (params: {
    optionValue: string;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput: boolean;
  }) => boolean | void;
  onTagRemoved: (removedTag: Item["value"], tags: Item["value"][]) => void;
  openOnFocus: boolean;
  rollNavigation: boolean;
  selectOnFocus: boolean;
  shouldRenderSuggestions: (value: string) => boolean;
  suggestWhenEmpty: boolean;
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

export type GroupReturnProps = {
  divider: {
    hasFirstChild: boolean;
    hasLastChild: boolean;
  };
  group: BoxProps;
};

export type UseAutoCompleteReturn = {
  autoCompleteProps: AutoCompleteProps;
  children: React.ReactNode;
  filteredList: Item[];
  focusedValue: Item["value"];
  getEmptyStateProps: (component: any) => any;
  getGroupProps: (props: AutoCompleteGroupProps) => GroupReturnProps;
  getInputProps: (
    props: AutoCompleteInputProps,
    themeInput?: any
  ) => InputReturnProps;
  getItemProps: (props: AutoCompleteItemProps) => ItemReturnProps;
  getListProps: () => ListReturnProps;
  inputRef: React.RefObject<HTMLInputElement>;
  interactionRef: React.RefObject<"mouse" | "keyboard" | null>;
  isOpen: boolean;
  itemList: Item[];
  listRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onOpen: () => void;
  query: string;
  setQuery: Dispatch<SetStateAction<any>>;
  tags: {
    label: Item["value"];
    onRemove: () => void;
  }[];
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
  let {
    closeOnBlur = true,
    closeOnSelect,
    creatable,
    defaultValues = [],
    emphasize,
    emptyState = true,
    freeSolo,
    isReadOnly,
    maxSuggestions,
    multiple,
    defaultIsOpen,
    shouldRenderSuggestions = () => true,
    suggestWhenEmpty,
  } = autoCompleteProps;

  closeOnSelect = closeOnSelect ? closeOnSelect : multiple ? false : true;

  freeSolo = freeSolo ? freeSolo : multiple ? true : autoCompleteProps.freeSolo;

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen });

  const children = runIfFn(autoCompleteProps.children, {
    isOpen,
    onClose,
    onOpen,
  });
  const itemList: Item[] = getItemList(children);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<"mouse" | "keyboard" | null>(null);

  const [query, setQuery] = useState<string>("");

  const [values, setValues] = useState<any[]>(defaultValues);
  const [focusedValue, setFocusedValue] = useState<Item["value"]>(
    itemList[0]?.value
  );

  const maxSelections = autoCompleteProps.maxSelections || values.length + 1;

  const filteredResults = itemList
    .filter(
      i =>
        i.fixed ||
        runIfFn(autoCompleteProps.filter || defaultFilterMethod, query, i.value)
    )
    .filter((_, index) => (maxSuggestions ? index < maxSuggestions : true));

  // Add Creatable to Filtered List
  const filteredList = [...filteredResults, { value: query, noFilter: true }];

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

  useUpdateEffect(() => {
    setFocusedValue(firstItem?.value);
  }, [query]);

  useEffect(() => {
    runIfFn(autoCompleteProps.onChange, multiple ? values : values[0]);
  }, [values]);

  useEffect(() => {
    runIfFn(autoCompleteProps.onOptionFocus, {
      optionValue: focusedValue,
      selectMethod: interactionRef.current,
      isNewInput: false,
    });
  }, [focusedValue]);

  const selectItem = (itemValue: Item["value"]) => {
    if (!values.includes(itemValue) && values.length < maxSelections)
      setValues(v => (multiple ? [...v, itemValue] : [itemValue]));

    setQuery(itemValue);
    if (multiple) {
      setQuery("");
      inputRef.current?.focus();
    }
    if (autoCompleteProps.focusInputOnSelect) inputRef.current?.focus();
    runIfFn(autoCompleteProps.onSelectOption, {
      optionValue: itemValue,
      selectMethod: interactionRef.current,
      isNewInput: false,
    });
    if (closeOnSelect) onClose();
  };

  const removeItem = (itemValue: Item["value"]) => {
    const newValues = values.filter(i => i !== itemValue);
    setValues(newValues);
    runIfFn(autoCompleteProps.onTagRemoved, itemValue, newValues);
    if (query === itemValue) setQuery("");
  };

  const tags = multiple
    ? values.map(tag => ({
        label: tag,
        onRemove: () => removeItem(tag),
      }))
    : [];

  const getInputProps: UseAutoCompleteReturn["getInputProps"] = (
    props,
    themeInput
  ) => {
    const { onBlur, onChange, onFocus, onKeyDown, variant, ...rest } = props;

    return {
      wrapper: {
        ref: inputWrapperRef,
        onClick: () => {
          inputRef?.current?.focus();
        },
        tabIndex: 0,
        ...(multiple && getMultipleWrapStyles(themeInput)),
      },
      input: {
        isReadOnly,
        onFocus: e => {
          runIfFn(onFocus);
          if (autoCompleteProps.openOnFocus && !isReadOnly) onOpen();
          if (autoCompleteProps.selectOnFocus) e.target.select();
        },
        onBlur: e => {
          runIfFn(onBlur);
          const listIsFocused = e.relatedTarget === listRef?.current;
          const inputWrapperIsFocused = inputWrapperRef.current?.contains(
            e.relatedTarget as any
          );
          if (!listIsFocused && !inputWrapperIsFocused) {
            if (closeOnBlur) onClose();
            if (!values.includes(e.target.value) && !freeSolo)
              setQuery(getLastItem(values) ?? "");
          }
        },
        onChange: e => {
          const newValue = e.target.value;
          runIfFn(onChange, e);
          setQuery(e.target.value);
          const queryIsEmpty = isEmpty(newValue);
          if (
            runIfFn(shouldRenderSuggestions, newValue) &&
            (!queryIsEmpty || suggestWhenEmpty)
          )
            onOpen();
          else onClose();
        },
        onKeyDown: e => {
          runIfFn(onKeyDown, e);
          interactionRef.current = "keyboard";

          const { key } = e;
          const focusedItem = filteredList[focusedIndex];
          if (key === "Enter") {
            if (!focusedItem.disabled) selectItem(focusedItem.value);
            else inputRef.current?.focus();
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
        variant: multiple ? "unstyled" : variant,
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
    const {
      _fixed,
      _focus,
      children: itemChild,
      disabled,
      value,
      fixed,
      onClick,
      onMouseOver,
      sx,
      ...rest
    } = props;
    const isFocused = value === focusedValue;
    const isValidSuggestion =
      filteredList.findIndex(i => i.value === value) >= 0;
    return {
      item: {
        ...(typeof itemChild !== "string" || !emphasize
          ? { children: itemChild }
          : {
              dangerouslySetInnerHTML: {
                __html: setEmphasis(itemChild, query),
              },
            }),
        "aria-selected": values.includes(value),
        "aria-disabled": disabled,
        _disabled: { opacity: 0.4, cursor: "not-allowed", userSelect: "none" },
        onClick: e => {
          runIfFn(onClick, e);
          if (!disabled) selectItem(value);
          else inputRef.current?.focus();
        },
        onMouseOver: e => {
          runIfFn(onMouseOver, e);
          setFocusedValue(value);
          interactionRef.current = "mouse";
        },
        sx: {
          ...sx,
          mark: {
            color: "inherit",
            bg: "transparent",
            ...(isObject(emphasize)
              ? emphasize
              : {
                  fontWeight: emphasize ? "extrabold" : "inherit",
                }),
          },
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

  const getGroupProps: UseAutoCompleteReturn["getGroupProps"] = props => {
    const hasItems = hasChildren(props.children, filteredList);
    return {
      divider: {
        hasFirstChild: hasFirstItem(props.children, firstItem),
        hasLastChild: hasLastItem(
          props.children,
          getLastItem(filteredList.filter(i => isUndefined(i?.noFilter)))
        ),
      },
      group: {
        display: hasItems ? "initial" : "none",
      },
    };
  };

  const getEmptyStateProps: UseAutoCompleteReturn["getEmptyStateProps"] = defaultEmptyState => {
    const noSuggestions = filteredList.every(i => i.noFilter);
    if (noSuggestions && emptyState && !creatable) {
      return typeof emptyState === "boolean"
        ? defaultEmptyState
        : runIfFn(emptyState, { query });
    }
  };

  return {
    autoCompleteProps,
    children,
    filteredList,
    focusedValue,
    getEmptyStateProps,
    getGroupProps,
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
    query,
    setQuery,
    tags,
    values,
  };
}
