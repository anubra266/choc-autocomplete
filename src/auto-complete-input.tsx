import { forwardRef, Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { runIfFn } from './helpers/runIfFn';
import { Store } from './store';
import { InputAction } from './store/reducers/input';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInput, 'input'>(
  (props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useMergeRefs(ref);

    const { state, dispatch } = useContext(Store);

    const value = state.input.value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      runIfFn(onChange, e);
      dispatch({ type: InputAction.Set, payload: e.target.value });
    };

    return (
      <>
        value:{value}
        <Input onChange={handleChange} ref={inputRef} {...rest} />
      </>
    );
  }
);
