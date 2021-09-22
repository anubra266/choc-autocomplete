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
  noFilter?: boolean;
}

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
  listAllValuesOnFocus: boolean;
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
  } & WrapProps;
  input: InputProps;
};

export type ItemReturnProps = {
  item: FlexProps;
  root: {
    isValidSuggestion: boolean;
    setItemList: React.Dispatch<React.SetStateAction<Item[]>>;
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
  filteredResults: Item[];
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
  tags: Dict[];
  values: Item["value"][];
};
