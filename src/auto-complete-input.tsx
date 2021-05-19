import { forwardRef, Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { runIfFn } from './utils/operations';
import { StoreContext } from './store';
import { InputAction } from './store/reducers/input';
import { handleNavigation, useOptionsFilter } from './helpers/input';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInput, 'input'>(
  (props, ref) => {
    const { onChange, onKeyDown, onFocus, onBlur, ...rest } = props;
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergeRefs(ref, internalRef);

    const { state, dispatch } = useContext(StoreContext);
    const { autocomplete } = state;

    useOptionsFilter();
    useEffect(() => {
      dispatch({ type: InputAction.SetRef, payload: internalRef });
    }, []);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const newValue = e.target.value;
      runIfFn(onChange, e);
      dispatch({ type: InputAction.Set, payload: newValue });
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      runIfFn(onKeyDown, e);
      handleNavigation(e, state, dispatch, internalRef);
    };

    const handleFocus: React.FocusEventHandler<HTMLInputElement> = e => {
      runIfFn(onFocus, e);
    };

    const handleBlur: React.FocusEventHandler<HTMLInputElement> = e => {
      runIfFn(onBlur, e);
      const newValue = e.target.value;
      if (newValue !== autocomplete.value) {
        runIfFn(onChange, e);
        dispatch({ type: InputAction.Set, payload: newValue });
      }
    };

    return (
      <>
        <Input
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          {...rest}
        />
      </>
    );
  }
);
