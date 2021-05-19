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

    const { dispatch } = useContext(Store);

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
