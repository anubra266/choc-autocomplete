import { forwardRef, Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { runIfFn } from './utils/runIfFn';
import { StoreContext } from './store';
import { InputAction } from './store/reducers/input';
import { useOptionsFilter } from './helpers/input';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInput, 'input'>(
  (props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useMergeRefs(ref);

    const { dispatch } = useContext(StoreContext);

    useOptionsFilter();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      const newValue = e.target.value;
      runIfFn(onChange, e);
      dispatch({ type: InputAction.Set, payload: newValue });
    };

    const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
      
    };

    return (
      <>
        <Input
          onChange={handleChange}
          onKeyDown={handleOnKeyDown}
          ref={inputRef}
          {...rest}
        />
      </>
    );
  }
);
