import {
  useDimensions,
  useDisclosure,
  useUpdateEffect,
} from "@chakra-ui/react";
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
import { useEffect, useRef, useState } from "react";

import { AutoCompleteProps } from "./autocomplete";
import {
  defaultFilterMethod,
  getFocusedStyles,
  setEmphasis,
} from "./helpers/items";
import { getMultipleWrapStyles } from "./helpers/input";
import { hasChildren, hasFirstItem, hasLastItem } from "./helpers/group";
import { Item, UseAutoCompleteReturn } from "./types";
import { AutoCompleteItemProps } from "./autocomplete-item";

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
    listAllValuesOnFocus,
    maxSuggestions,
    multiple,
    defaultIsOpen,
    shouldRenderSuggestions = () => true,
    suggestWhenEmpty,
  } = autoCompleteProps;

  closeOnSelect = closeOnSelect ? closeOnSelect : multiple ? false : true;

  freeSolo = freeSolo ? freeSolo : multiple ? true : autoCompleteProps.freeSolo;

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen });

  const [itemList, setItemList] = useState<Item[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<"mouse" | "keyboard" | null>(null);

  const [query, setQuery] = useState<string>("");

  const [values, setValues] = useState<any[]>(defaultValues);

  useEffect(() => {
    if (!multiple && !isEmpty(defaultValues)) {
      setQuery(defaultValues[0] as any);
    }
  }, []);

  const [focusedValue, setFocusedValue] = useState<Item["value"]>(
    itemList[0]?.value
  );

  const [listAll, setListAll] = useState(false);

  const maxSelections = autoCompleteProps.maxSelections || values.length + 1;

  const filteredResults = itemList
    .filter(
      i =>
        i.fixed ||
        runIfFn(
          autoCompleteProps.filter || defaultFilterMethod,
          query,
          i.value,
          i.label
        ) ||
        listAll
    )
    .filter((_, index) => (maxSuggestions ? index < maxSuggestions : true));

  // Add Creatable to Filtered List
  const creatableArr: any = creatable ? [{ value: query, noFilter: true }] : [];
  const filteredList: Item[] = [...filteredResults, ...creatableArr];

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
    const item = filteredList.find(opt => opt.value === values[0]);
    const items = values.map(val =>
      filteredList.find(opt => opt.value === val)
    );
    runIfFn(
      autoCompleteProps.onChange,
      multiple ? values : values[0],
      multiple ? items : item
    );
  }, [values, multiple]);

  useEffect(() => {
    const focusedItem = itemList.find(i => i.value === focusedValue);
    runIfFn(autoCompleteProps.onOptionFocus, {
      optionValue: focusedValue,
      optionLabel: focusedItem?.label,
      item: focusedItem!,
      selectMethod: interactionRef.current,
      isNewInput: false,
    });
  }, [focusedValue, autoCompleteProps.onOptionFocus]);

  const selectItem = (optionValue: Item["value"]) => {
    if (!values.includes(optionValue) && values.length < maxSelections)
      setValues(v => (multiple ? [...v, optionValue] : [optionValue]));

    const option = filteredList.find(i => i.value === optionValue);

    const optionLabelFromValue = option?.label;
    // use value if label is not available
    const optionLabel = optionLabelFromValue || optionValue;
    setQuery(optionLabel);

    if (multiple) {
      setQuery("");
      inputRef.current?.focus();
    }
    if (autoCompleteProps.focusInputOnSelect) inputRef.current?.focus();
    runIfFn(autoCompleteProps.onSelectOption, {
      optionValue: optionValue,
      optionLabel: optionLabel,
      item: option!,
      selectMethod: interactionRef.current,
      isNewInput: false,
    });
    if (closeOnSelect) onClose();
  };

  const removeItem = (itemValue: Item["value"]) => {
    setValues(prevValues => {
      const item = itemList.find(opt => opt.value === itemValue);
      runIfFn(autoCompleteProps.onTagRemoved, itemValue, item, prevValues);
      return prevValues.filter(i => i !== itemValue);
    });
    if (query === itemValue) setQuery("");
  };

  const resetItems = (focusInput?: boolean) => {
    setValues([]);
    if (focusInput) inputRef.current?.focus();
  };

  const tags = multiple
    ? values.map(tag => ({
        label: itemList.find(item => item.value === tag)?.label || tag,
        onRemove: () => removeItem(tag),
      }))
    : [];

  const children = runIfFn(autoCompleteProps.children, {
    isOpen,
    onClose,
    onOpen,
    tags,
    removeItem,
    resetItems,
  });

  const getInputProps: UseAutoCompleteReturn["getInputProps"] = (
    props,
    themeInput
  ) => {
    const {
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      variant,
      wrapStyles,
      ...rest
    } = props;

    return {
      wrapper: {
        ref: inputWrapperRef,
        onClick: () => {
          inputRef?.current?.focus();
        },
        tabIndex: 0,
        ...getMultipleWrapStyles(themeInput, multiple),
        ...wrapStyles,
      },
      input: {
        isReadOnly,
        onFocus: e => {
          runIfFn(onFocus);
          if (autoCompleteProps.openOnFocus && !isReadOnly) onOpen();
          if (autoCompleteProps.selectOnFocus) e.target.select();
          if (listAllValuesOnFocus) setListAll(true);
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
          setListAll(false);
        },
        onKeyDown: e => {
          runIfFn(onKeyDown, e);
          interactionRef.current = "keyboard";

          const { key } = e;
          const focusedItem = filteredList[focusedIndex];
          if (key === "Enter") {
            if (focusedItem && !focusedItem?.disabled)
              selectItem(focusedItem.value);
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
        value: query ?? "",
        variant: multiple ? "unstyled" : variant,
        ...rest,
      },
    };
  };

  const dim = useDimensions(inputWrapperRef, true);
  const getListProps: UseAutoCompleteReturn["getListProps"] = () => {
    const width = dim?.marginBox.width as number;

    return {
      width,
    };
  };

  const getDefItemValue = (item: AutoCompleteItemProps["value"]) =>
    (typeof item === "string" ? item : item[Object.keys(item)[0]]).toString();

  const getItemProps: UseAutoCompleteReturn["getItemProps"] = props => {
    const {
      _fixed,
      _focus,
      children: itemChild,
      disabled,
      label,
      value: valueProp,
      fixed,
      getValue = getDefItemValue,
      onClick,
      onMouseOver,
      sx,
      ...rest
    } = props;
    const value = getValue(valueProp).toString();
    const isFocused = value === focusedValue;
    const isValidSuggestion =
      filteredList.findIndex(i => i.value === value) >= 0;
    const itemLabel = itemChild || label || value;
    return {
      item: {
        ...(typeof itemLabel !== "string" || !emphasize
          ? { children: itemLabel }
          : {
              dangerouslySetInnerHTML: {
                __html: setEmphasis(itemLabel, query),
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
        setItemList,
        value,
      },
    };
  };

  const getGroupProps: UseAutoCompleteReturn["getGroupProps"] = props => {
    const hasItems = hasChildren(props, filteredList);
    const lastItem = getLastItem(
      filteredList.filter(i => isUndefined(i?.noFilter))
    );
    return {
      divider: {
        hasFirstChild: hasFirstItem(props, firstItem!),
        hasLastChild: hasLastItem(props, lastItem!),
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
    filteredResults,
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
