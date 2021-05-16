import { useOutsideClick } from '@chakra-ui/hooks';
import { Box, BoxProps } from '@chakra-ui/layout';
import { StoreProvider } from 'easy-peasy';
import React, { ReactNode, useEffect, useRef } from 'react';
import { useStoreActions, useStoreState } from './store/hooks';
import { createStore } from 'easy-peasy';
import storeModel from './store/model';

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
}

const AutoCompleteBody = (props: AutoComplete) => {
  const {
    children,
    focusInputOnSelect,
    onChange,
    onSelectOption,
    onOptionHighlight,
    shouldRenderSuggestions,
    suggestWhenEmpty,
    closeOnSelect,
    closeOnBlur,
    renderEmpty,
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
    setAutoCompleteState({ focusInputOnSelect });
    setAutoCompleteState({ onSelectOption });
    setAutoCompleteState({ shouldRenderSuggestions });
    setAutoCompleteState({ suggestWhenEmpty });
    setAutoCompleteState({ closeOnSelect });
    setAutoCompleteState({ closeOnBlur });
    setAutoCompleteState({ renderEmpty });
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
  const store = createStore(storeModel, {
    name: `AutoComplete${props.id}`,
  });

  return (
    <StoreProvider store={store} key={`autocomplete-provider${props.key}`}>
      <AutoCompleteBody {...props} />
    </StoreProvider>
  );
};
