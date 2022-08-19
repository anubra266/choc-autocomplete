import {
  useDimensions,
  useDisclosure,
  useUpdateEffect,
  useControllableState,
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
import { omit } from "@chakra-ui/utils";

import { useEffect, useRef, useState } from "react";

import { AutoCompleteProps } from "./autocomplete";
import {
  defaultFilterMethod,
  getDefItemValue,
  getFocusedStyles,
  getItemList,
  setEmphasis,
} from "./helpers/items";
import { getMultipleWrapStyles } from "./helpers/input";
import { hasChildren, hasFirstItem, hasLastItem } from "./helpers/group";
import { Item, UseAutoCompleteReturn } from "./types";

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
    emphasize,
    emptyState = true,
    freeSolo,
    isReadOnly,
    listAllValuesOnFocus,
    maxSuggestions,
    multiple,
    defaultValue,
    defaultValues = defaultValue ? [defaultValue] : [],
    onReady,
    defaultIsOpen,
    disableFilter,
    restoreOnBlurIfEmpty = !freeSolo,
    shouldRenderSuggestions = () => true,
    submitKeys = [],
    suggestWhenEmpty,
    value,
    values: valuesProp = value
      ? typeof value === "string"
        ? [value]
        : [...value]
      : undefined,
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

  const [listAll, setListAll] = useState(false);

  let defaultQuery = "";
  if (multiple) defaultQuery = "";
  else if (!isUndefined(defaultValues)) defaultQuery = defaultValues[0];
  else if (!isUndefined(valuesProp)) defaultQuery = valuesProp[0];

  const [query, setQuery] = useState<string>(defaultQuery ?? "");
  const filteredResults = disableFilter
    ? itemList
    : itemList
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
        .filter((i, index) =>
          maxSuggestions ? i.fixed || index < maxSuggestions : true
        );

  // Add Creatable to Filtered List
  const creatableArr: Item[] = creatable
    ? [{ value: query, noFilter: true, creatable: true }]
    : [];

  const filteredList = [...filteredResults, ...creatableArr];
  const [values, setValues] = useControllableState({
    defaultValue: defaultValues,
    value: valuesProp,
    onChange: (newValues: any[]) => {
      const item = filteredList.find(opt => opt.value === newValues[0]);
      const items = newValues.map(val =>
        filteredList.find(opt => opt.value === val)
      );
      runIfFn(
        autoCompleteProps.onChange,
        multiple ? newValues : newValues[0],
        multiple ? items : item
      );
    },
  });

  const [focusedValue, setFocusedValue] = useState<Item["value"]>(
    itemList[0]?.value
  );

  const maxSelections = autoCompleteProps.maxSelections || values.length + 1;

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
    if (!isOpen) setFocusedValue(itemList[0]?.value);
  }, [isOpen]);

  useEffect(() => {
    const focusedItem = itemList.find(i => i.value === focusedValue);
    runIfFn(autoCompleteProps.onOptionFocus, {
      item: focusedItem!,
      focusMethod: interactionRef.current,
      isNewInput: focusedItem?.creatable,
    });
  }, [focusedValue, autoCompleteProps.onOptionFocus]);

  const selectItem = (optionValue: Item["value"]) => {
    if (!values.includes(optionValue) && values.length < maxSelections) {
      setValues(v => (multiple ? [...v, optionValue] : [optionValue]));
    }

    const option = filteredList.find(i => i.value === optionValue);

    if (multiple) {
      inputRef.current?.focus();
    }
    if (autoCompleteProps.focusInputOnSelect) inputRef.current?.focus();
    runIfFn(autoCompleteProps.onSelectOption, {
      item: option!,
      selectMethod: interactionRef.current,
      isNewInput: option?.creatable,
    });
    if (option?.creatable) {
      runIfFn(autoCompleteProps.onCreateOption, {
        item: omit(option!, ["noFilter"]),
        selectMethod: interactionRef.current,
      });
    }

    const optionLabel = option?.label || option?.value;
    setQuery(() => (multiple ? "" : optionLabel ?? ""));

    if (closeOnSelect) onClose();
  };

  const removeItem: UseAutoCompleteReturn["removeItem"] = (
    itemValue,
    focusInput
  ) => {
    setValues(prevValues => {
      const item = itemList.find(opt => opt.value === itemValue);
      runIfFn(autoCompleteProps.onTagRemoved, itemValue, item, prevValues);
      return prevValues.filter(i => i !== itemValue);
    });
    if (query === itemValue) setQuery("");
    if (focusInput) inputRef.current?.focus();
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

  useEffect(() => {
    runIfFn(onReady, { tags });
  }, [values]);

  // @ts-ignore
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
        ...getMultipleWrapStyles(themeInput, multiple),
        ...rest,
      },
      input: {
        isReadOnly,
        onFocus: e => {
          runIfFn(onFocus, e);
          if (autoCompleteProps.openOnFocus && !isReadOnly) onOpen();
          if (autoCompleteProps.selectOnFocus) e.target.select();
          if (listAllValuesOnFocus) setListAll(true);
        },
        onBlur: e => {
          runIfFn(onBlur, e);

          const listIsFocused =
            e.relatedTarget === listRef?.current ||
            listRef.current?.contains(e.relatedTarget as any);
          const inputWrapperIsFocused = inputWrapperRef.current?.contains(
            e.relatedTarget as any
          );
          if (!listIsFocused && !inputWrapperIsFocused) {
            if (closeOnBlur) onClose();
            if (!values.includes(e.target.value) && restoreOnBlurIfEmpty) {
              const latestValue = getLastItem(values);
              const latestValueItem = itemList.find(
                i => i.value === latestValue
              );
              const latestValueLabel =
                latestValueItem?.label || latestValueItem?.value || "";
              setQuery(latestValueLabel);
            }
          }
        },
        onChange: e => {
          const newValue = e.target.value;
          runIfFn(onChange, e);
          setQuery(newValue);
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
          if (["Enter", ...submitKeys].includes(key)) {
            if (focusedItem && !focusedItem?.disabled)
              selectItem(focusedItem?.value);
            else inputRef.current?.focus();
            e.preventDefault();
            return;
          }

          if (key === "ArrowDown") {
            setFocusedValue(nextItem?.value);
            e.preventDefault();
            return;
          }

          if (key === "ArrowUp") {
            setFocusedValue(prevItem?.value);

            e.preventDefault();
            return;
          }

          if (key === "Tab") {
            setFocusedValue(nextItem?.value);

            if (isOpen) {
              e.preventDefault();
            }

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

  const wrapperDim = useDimensions(inputWrapperRef, true);
  const inputDim = useDimensions(inputRef, true);
  const getListProps: UseAutoCompleteReturn["getListProps"] = () => {
    const width = autoCompleteProps.multiple
      ? (wrapperDim?.marginBox.width as number)
      : (inputDim?.marginBox.width as number);
    return {
      width,
    };
  };

  const getItemProps: UseAutoCompleteReturn["getItemProps"] = (
    props,
    creatable
  ) => {
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
    const value = creatable ? valueProp : getValue(valueProp)?.toString();
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
        value,
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
    removeItem,
    resetItems,
    setQuery,
    tags,
    values,
  };
}
