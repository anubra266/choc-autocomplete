import { BoxProps, CSSObject, forwardRef } from '@chakra-ui/react';
import { MaybeRenderProp } from '@chakra-ui/react-utils';

import React, { ReactNode, useMemo, useReducer } from 'react';
import { AutoCompleteBody } from './auto-complete';
import { OnSelectOptionParams } from './helpers/autocomplete-props/onSelectOption';
import { useParseProps } from './helpers/provider';
import StoreProvider, { State } from './store';
import { AutoCompleteReducer } from './store/reducers/autocomplete';
import { inputReducer } from './store/reducers/input';
import { itemReducer } from './store/reducers/item';
import { listReducer } from './store/reducers/list';

export type ChildrenProps = {
  isOpen: boolean;
  onClose: () => void;
  inputIsEmpty: boolean;
  resetInput: () => void;
};

export interface AutoComplete extends Omit<BoxProps, 'onChange'> {
  children?: MaybeRenderProp<ChildrenProps>;
  onChange?: (value: string) => void;
  emptyState?: boolean | ReactNode;
  rollNavigation?: boolean;
  focusInputOnSelect?: boolean;
  freeSolo?: boolean;
  creatable?: boolean;
  selectOnFocus?: boolean;
  openOnFocus?: boolean;
  emphasize?: boolean | CSSObject;
  defaultIsOpen?: boolean;
  onSelectOption?: (params: OnSelectOptionParams) => boolean | void;
  onOptionHighlight?: (optionValue: string) => boolean;
  suggestWhenEmpty?: boolean;
  closeOnselect?: boolean;
  closeOnBlur?: boolean;
}

export const AutoComplete = forwardRef<AutoComplete, 'div'>((props, ref) => {
  const {
    emptyState = true,
    rollNavigation,
    focusInputOnSelect,
    freeSolo,
    creatable,
    selectOnFocus,
    openOnFocus,
    emphasize,
    defaultIsOpen,
    onSelectOption,
    onOptionHighlight,
    suggestWhenEmpty,
    closeOnselect = true,
    closeOnBlur = true,
    ...rest
  } = props;

  const initialState: State = {
    autocomplete: {
      value: '',
      emptyState,
      rollNavigation,
      focusInputOnSelect,
      freeSolo,
      creatable,
      selectOnFocus,
      openOnFocus,
      emphasize,
      onSelectOption,
      onOptionHighlight,
      suggestWhenEmpty,
      closeOnselect,
      closeOnBlur,
    },
    input: {
      value: '',
      ref: undefined,
    },
    item: {
      active: -1,
      list: [],
      filtered: [],
    },
    list: {
      visible: defaultIsOpen || false,
      ref: undefined,
    },
  };

  const mainReducer = (
    { autocomplete, input, item, list }: State,
    action: any
  ) => ({
    autocomplete: AutoCompleteReducer(autocomplete, action),
    input: inputReducer(input, action),
    item: itemReducer(item, action),
    list: listReducer(list, action),
  });

  const [state, dispatch] = useReducer(mainReducer, initialState);

  const providerValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  useParseProps(props);

  return (
    <StoreProvider value={providerValue}>
      <AutoCompleteBody ref={ref} {...rest} />
    </StoreProvider>
  );
});
