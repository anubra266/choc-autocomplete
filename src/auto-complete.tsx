import { useOutsideClick } from '@chakra-ui/hooks';
import { Box } from '@chakra-ui/layout';
import { StoreProvider } from 'easy-peasy';
import React, { ReactNode, useEffect, useRef } from 'react';
import store from './store';
import { useStoreActions, useStoreState } from './store/hooks';

interface AutoComplete {
  children: React.ReactNode;
  highlightFirstOption?: boolean;
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
    highlightFirstOption,
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
  const { setActive } = useStoreActions(actions => actions.options);
  const { setAutoCompleteState, setIsVisible } = useStoreActions(
    ({ autocomplete }) => autocomplete
  );
  const { value: inputValue } = useStoreState(state => state.input);
  const { activeOption } = useStoreState(({ options }) => options);
  const { closeOnBlur: shouldCloseOnBlur } = useStoreState(
    ({ autocomplete }) => autocomplete
  );

  useEffect(() => {
    setActive(highlightFirstOption ? 0 : -1);
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
  return (
    <StoreProvider store={store}>
      <AutoCompleteBody {...props} />
    </StoreProvider>
  );
};
