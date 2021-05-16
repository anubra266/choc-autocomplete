import { useOutsideClick } from '@chakra-ui/hooks';
import { Box, BoxProps } from '@chakra-ui/layout';
import { StoreProvider } from 'easy-peasy';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from './store/hooks';
import { createStore } from 'easy-peasy';
import storeModel from './store/model';
import { CSSObject } from '@chakra-ui/styled-system';

interface AutoComplete extends BoxProps {
  children: React.ReactNode;
  focusInputOnSelect?: boolean;
  onChange?: (value: string) => void;
  onSelectOption?: (
    optionValue: string,
    selectMethod: 'click' | 'keyboard'
  ) => void;
  onOptionHighlight?: (optionValue: string) => void;
  shouldRenderSuggestions?: (value: string) => void;
  suggestWhenEmpty?: boolean;
  closeOnSelect?: boolean;
  closeOnBlur?: boolean;
  renderEmpty?: ReactNode;
  emphasize?: boolean | CSSObject;
}

const AutoCompleteBody = (props: AutoComplete) => {
  const {
    children,
    onChange,
    onSelectOption,
    onOptionHighlight,
    shouldRenderSuggestions,
    closeOnSelect,
    closeOnBlur,
    ...rest
  } = props;
  const { setAutoCompleteState, setIsVisible } = useStoreActions(
    ({ autocomplete }) => autocomplete
  );
  const { value: inputValue } = useStoreState(state => state.input);
  const { activeOption } = useStoreState(({ options }) => options);
  const { closeOnBlur: shouldCloseOnBlur } = useStoreState(
    ({ autocomplete }) => autocomplete
  );

  useEffect(() => {
    setAutoCompleteState({ onSelectOption });
    setAutoCompleteState({ shouldRenderSuggestions });
    setAutoCompleteState({ closeOnSelect });
    setAutoCompleteState({ closeOnBlur });
  }, []);

  useEffect(() => {
    onChange && onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    onOptionHighlight && onOptionHighlight(activeOption()?.value);
  }, [activeOption()]);

  const ref = useRef();
  useOutsideClick({
    ref,
    handler: () => {
      if (shouldCloseOnBlur) setIsVisible(false);
    },
  });

  return (
    <Box {...rest} ref={ref}>
      {children}
    </Box>
  );
};

export const AutoComplete = (props: AutoComplete) => {
  const {
    emphasize,
    suggestWhenEmpty,
    focusInputOnSelect,
    renderEmpty,
    ...rest
  } = props;

  const store = createStore(storeModel, {
    name: `AutoComplete${props.id}`,
    initialState: {
      autocomplete: {
        emphasize,
        suggestWhenEmpty,
        focusInputOnSelect,
        renderEmpty,
      },
    },
  });

  return (
    <StoreProvider store={store} key={`autocomplete-provider${props.key}`}>
      <AutoCompleteBody {...rest} />
    </StoreProvider>
  );
};
