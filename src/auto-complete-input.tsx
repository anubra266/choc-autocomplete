import { forwardRef, Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { runIfFn } from '@chakra-ui/utils';
import { StoreContext } from './store';
import { InputAction } from './store/reducers/input';
import { handleNavigation, useOptionsFilter } from './helpers/input';
import { ListAction } from './store/reducers/list';
import { AutoCompleteAction } from './store/reducers/autocomplete';
import { closeList } from './helpers/list';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInput, 'input'>(
  (props, ref) => {
    const { onChange, onKeyDown, onFocus, onBlur, onClick, ...rest } = props;
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergeRefs(ref, internalRef);

    const { state, dispatch } = useContext(StoreContext);
    const {
      autocomplete,
      list: { ref: listRef, visible: listIsVisible },
      item,
    } = state;
    const {
      freeSolo,
      emptyState,
      suggestWhenEmpty,
      closeOnBlur,
      closeOnselect,
    } = autocomplete;

    const isEmpty = item.filtered.length < 1 && !emptyState;
    const hideList = () => closeList(state, dispatch);

    useOptionsFilter();
    useEffect(() => {
      dispatch({ type: InputAction.SetRef, payload: internalRef });
    }, []);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      runIfFn(onChange, e);
      const value = e.target.value;
      dispatch({ type: InputAction.Set, payload: value });
      if (freeSolo) dispatch({ type: AutoCompleteAction.Set, payload: value });
      const inputIsEmpty = value?.length < 1;
      if (!isEmpty) {
        if (!inputIsEmpty) dispatch({ type: ListAction.Show });
        else if (!suggestWhenEmpty) hideList();
      }
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      runIfFn(onKeyDown, e);
      handleNavigation(e, state, dispatch);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      runIfFn(onFocus, e);
      if (autocomplete.selectOnFocus) e.target.select();
      if (autocomplete.openOnFocus) dispatch({ type: ListAction.Show });
      const focusedFromList = e.relatedTarget === listRef?.current;
      if (focusedFromList && closeOnselect && listIsVisible) {
        hideList();
      }
    };

    const handleClick: React.MouseEventHandler<HTMLInputElement> = e => {
      runIfFn(onClick, e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      runIfFn(onBlur, e);
      const listIsFocused = e.relatedTarget === listRef?.current;
      if (!listIsFocused && closeOnBlur) hideList();
    };

    return (
      <>
        <Input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
          ref={inputRef}
          {...rest}
        />
      </>
    );
  }
);
