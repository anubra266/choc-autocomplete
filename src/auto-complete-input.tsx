import { forwardRef, Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { runIfFn } from './utils/operations';
import { StoreContext } from './store';
import { InputAction } from './store/reducers/input';
import { handleNavigation, useOptionsFilter } from './helpers/input';
import { ListAction } from './store/reducers/list';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInput, 'input'>(
  (props, ref) => {
    const { onChange, onKeyDown, onFocus, onClick, ...rest } = props;
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergeRefs(ref, internalRef);

    const { state, dispatch } = useContext(StoreContext);
    const { autocomplete, item } = state;
    const isEmpty = item.filtered.length < 1 && !autocomplete.emptyState;

    useOptionsFilter();
    useEffect(() => {
      dispatch({ type: InputAction.SetRef, payload: internalRef });
    }, []);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const newValue = e.target.value;
      runIfFn(onChange, e);
      dispatch({ type: InputAction.Set, payload: newValue });
      if (!isEmpty) dispatch({ type: ListAction.Show });
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      runIfFn(onKeyDown, e);
      handleNavigation(e, state, dispatch, internalRef);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      runIfFn(onFocus, e);
      if (autocomplete.selectOnFocus) e.target.select();
      if (autocomplete.openOnFocus) dispatch({ type: ListAction.Show });
    };

    const handleClick: React.MouseEventHandler<HTMLInputElement> = e => {
      runIfFn(onClick, e);
      e.stopPropagation();
    };

    return (
      <>
        <Input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onClick={handleClick}
          ref={inputRef}
          {...rest}
        />
      </>
    );
  }
);
