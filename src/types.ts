import {
  BoxProps,
  CSSObject,
  FlexProps,
  InputProps,
  WrapProps,
} from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import React, { Dispatch, SetStateAction } from "react";

import { AutoCompleteGroupProps } from "./autocomplete-group";
import { AutoCompleteInputProps } from "./autocomplete-input";
import { AutoCompleteProps } from "./autocomplete";
import { AutoCompleteItemProps } from "./autocomplete-item";

export interface Item {
  value: any;
  label?: any;
  fixed?: boolean;
  disabled?: boolean;
  itemVal?: any;
  noFilter?: boolean;
  groupId?: string;
}

export type UseAutoCompleteProps = Partial<{
  closeOnBlur: boolean;
  closeOnSelect: boolean;
  creatable: boolean;
  defaultIsOpen: boolean;
  defaultValues: Item["value"] | Item["value"][];
  emphasize: boolean | CSSObject;
  emptyState: boolean | MaybeRenderProp<{ value: Item["value"] }>;
  emptyStateLabel: string
  filter: (
    query: string,
    optionValue: Item["value"],
    optionLabel: Item["label"]
  ) => boolean;
  focusInputOnSelect: boolean;
  freeSolo: boolean;
  isReadOnly: boolean;
  listAllValuesOnFocus: boolean;
  maxSelections: number;
  maxSuggestions: number;
  multiple: boolean;
  onChange: (
    value: Item["value"] | Item["value"][],
    item: Item | Item[]
  ) => void;
  onSelectOption: (params: {
    optionValue: Item["value"];
    optionLabel: Item["label"];
    item: Item;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput: boolean;
  }) => boolean | void;
  onOptionFocus: (params: {
    optionValue: Item["value"];
    optionLabel: Item["label"];
    item: Item;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput: boolean;
  }) => boolean | void;
  onTagRemoved: (
    removedTag: Item["value"],
    item: Item,
    tags: Item["value"][]
  ) => void;
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
  } & WrapProps;
  input: InputProps;
};

export type ItemReturnProps = {
  item: FlexProps;
  root: {
    isValidSuggestion: boolean;
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
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

export type Tag = {
  label: string;
  onRemove: (tag: Tag) => void;
};

export type ChildRenderProp = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  removeItem: (itemValue: Item["value"]) => void;
  resetItems: (focusInput: boolean) => void;
  tags: Tag[];
};

export type UseAutoCompleteReturn = {
  autoCompleteProps: AutoCompleteProps;
  children: MaybeRenderProp<ChildRenderProp>;
  filteredList: Item[];
  filteredResults: Item[];
  focusedValue: Item["value"];
  emptyStateLabel: string
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
  tags: Dict[];
  values: Item["value"][];
};
