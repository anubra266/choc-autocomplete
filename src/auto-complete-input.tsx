import { forwardRef, Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { runIfFn } from './utils/runIfFn';
import { StoreContext } from './store';
import { InputAction } from './store/reducers/input';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = forwardRef<AutoCompleteInput, 'input'>(
  (props, ref) => {
    const { onChange, ...rest } = props;
    const inputRef = useMergeRefs(ref);

    const { dispatch } = useContext(StoreContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      runIfFn(onChange, e);
      dispatch({ type: InputAction.Set, payload: e.target.value });
    };

    return (
      <>
        <Input onChange={handleChange} ref={inputRef} {...rest} />
      </>
    );
  }
);
