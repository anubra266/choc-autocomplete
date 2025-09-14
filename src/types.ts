import {
  BoxProps,
  FlexProps,
  InputProps,
  PlacementWithLogical,
  SystemStyleObject,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";

import { AutoCompleteProps } from "./autocomplete";
import { AutoCompleteGroupProps } from "./autocomplete-group";
import { AutoCompleteInputProps } from "./autocomplete-input";
import { AutoCompleteItemProps } from "./autocomplete-item";

export type Dict<T = any> = Record<string, T>;

export type MaybeRenderProp<P> =
  | React.ReactNode
  | ((props: P) => React.ReactNode);

export interface Item {
  value: any;
  label?: any;
  fixed?: boolean;
  disabled?: boolean;
  itemVal?: any;
  noFilter?: boolean;
  creatable?: boolean;
  originalValue?: any;
}

export type UseAutoCompleteProps = Partial<{
  closeOnBlur: boolean;
  closeOnSelect: boolean;
  prefocusFirstItem: boolean;
  creatable: boolean;
  defaultEmptyStateProps: FlexProps;
  defaultIsOpen: boolean;
  defaultValue: Item["value"];
  defaultValues: Item["value"][];
  disableFilter: boolean;
  emphasize: boolean | SystemStyleObject;
  emptyState: boolean | MaybeRenderProp<{ query: Item["value"] }>;
  filter: (
    query: string,
    optionValue: Item["value"],
    optionLabel: Item["label"]
  ) => boolean;
  focusInputOnSelect: boolean;
  freeSolo: boolean;
  isLoading: boolean;
  isPortalled: boolean;
  isReadOnly: boolean;
  listAllValuesOnFocus: boolean;
  matchWidth: boolean;
  maxSelections: number;
  maxSuggestions: number;
  multiple: boolean;
  onChange: (
    value: Item["value"] | Item["value"][],
    item: Item | Item[]
  ) => void;
  onCreateOption: (params: {
    item: Item;
    selectMethod: "mouse" | "keyboard" | null;
  }) => boolean | void;
  onSelectOption: (params: {
    item: Item;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput?: boolean;
  }) => boolean | void;
  onOptionFocus: (params: {
    item: Item;
    focusMethod: "mouse" | "keyboard" | null;
    isNewInput?: boolean;
  }) => boolean | void;
  onTagRemoved: (
    removedTag: Item["value"],
    item: Item,
    tags: ItemTag[]
  ) => void;
  onReady: (params: OnReadyProps) => void;
  openOnFocus: boolean;
  placement: PlacementWithLogical;
  restoreOnBlurIfEmpty: boolean;
  rollNavigation: boolean;
  selectOnFocus: boolean;
  shouldRenderSuggestions: (value: string) => boolean;
  submitKeys: string[];
  suggestWhenEmpty: boolean;
  value: Item["value"];
  values: Item["value"][];
}>;

export type ItemTag = { label: any; onRemove: () => void };

export type OnReadyProps = {
  tags: ItemTag[];
};

export type InputReturnProps = {
  wrapper: {
    onClick: React.MouseEventHandler<HTMLDivElement>;
    ref: React.RefObject<HTMLDivElement>;
  } & BoxProps;
  input: InputProps;
};

export type ItemReturnProps = {
  item: FlexProps;
  root: {
    isValidSuggestion: boolean;
    value: AutoCompleteItemProps["value"];
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
  defaultEmptyStateProps: FlexProps;
  filteredList: Item[];
  filteredResults: Item[];
  focusedValue: Item["value"];
  getEmptyStateProps: (component: any) => any;
  getGroupProps: (props: AutoCompleteGroupProps) => GroupReturnProps;
  getInputProps: (
    props: AutoCompleteInputProps,
    themeInput?: any
  ) => InputReturnProps;
  getItemProps: (
    props: AutoCompleteItemProps,
    creatable?: boolean
  ) => ItemReturnProps;
  inputRef: React.RefObject<HTMLInputElement>;
  interactionRef: React.RefObject<"mouse" | "keyboard" | null>;
  isOpen: boolean;
  isLoading: boolean;
  itemList: Item[];
  listRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onOpen: () => void;
  placement: PlacementWithLogical;
  query: string;
  removeItem: (valueToRemove?: Item["value"], focusInput?: boolean) => void;
  resetItems: (focusInput?: boolean) => void;
  setQuery: Dispatch<SetStateAction<any>>;
  tags: ItemTag[];
  value: Item["value"];
  values: Item["value"][];
};

export type AutoCompleteRefMethods =
  | {
      removeItem: UseAutoCompleteReturn["removeItem"];
      resetItems: UseAutoCompleteReturn["resetItems"];
    }
  | undefined;
