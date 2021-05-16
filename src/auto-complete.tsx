import { Box } from '@chakra-ui/layout';
import { StoreProvider } from 'easy-peasy';
import React, { useEffect } from 'react';
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
}

const AutoCompleteBody = (props: AutoComplete) => {
  const {
    focusInputOnSelect = true,
    highlightFirstOption,
    onChange,
    onSelectOption,
    onOptionHighlight,
  } = props;
  const { children } = props;
  const { setActive } = useStoreActions(actions => actions.options);
  const { setAutoCompleteState } = useStoreActions(
    ({ autocomplete }) => autocomplete
  );
  const { value: inputValue } = useStoreState(state => state.input);
  const { activeOption } = useStoreState(({ options }) => options);

  useEffect(() => {
    setActive(highlightFirstOption ? 0 : -1);
    setAutoCompleteState({ focusInputOnSelect });
    setAutoCompleteState({ onSelectOption });
  }, []);

  useEffect(() => {
    onChange && onChange(inputValue);
  }, [inputValue]);

  useEffect(() => {
    onOptionHighlight && onOptionHighlight(activeOption()?.value);
  }, [activeOption()]);

  return <Box>{children}</Box>;
};

export const AutoComplete = (props: AutoComplete) => {
  return (
    <StoreProvider store={store}>
      <AutoCompleteBody {...props} />
    </StoreProvider>
  );
};
