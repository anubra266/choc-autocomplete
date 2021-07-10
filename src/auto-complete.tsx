import React, { useEffect } from 'react';
import { Box, forwardRef, Popover } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { AutoComplete } from './auto-complete-provider';
import { useAutoCompleteContext } from './store';
import { InputAction } from './store/reducers/input';
import { AutoCompleteAction } from './store/reducers/autocomplete';
import { closeList } from './helpers/list';

export const AutoCompleteBody = forwardRef<AutoComplete, 'div'>(
  (props, ref) => {
    const { children, onChange, sx, ...rest } = props;

    const { state, dispatch } = useAutoCompleteContext();

    const {
      autocomplete: { value: autoCompleteValue },
      list: { visible: isOpen },
      input: { value: inputValue, ref: inputRef },
    } = state;

    useEffect(() => {
      runIfFn(onChange, autoCompleteValue);
    }, [autoCompleteValue]);

    const onClose = () => closeList(dispatch);

    const resetInput = () => {
      if (inputRef?.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
      dispatch({ type: InputAction.Set, payload: '' });
      dispatch({ type: AutoCompleteAction.Set, payload: '' });
    };

    const inputIsEmpty = !(
      !!inputValue.length || !!inputRef?.current?.value.length
    );

    const childProps = {
      isOpen,
      onClose,
      inputIsEmpty,
      resetInput,
    };

    return (
      <Popover
        autoFocus={false}
        closeOnBlur={true}
        placement="bottom"
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box
          ref={ref}
          sx={{
            '.chakra-popover__popper': { position: 'unset !important' },
            ...sx,
          }}
          {...rest}
        >
          {runIfFn(children, childProps)}
        </Box>
      </Popover>
    );
  }
);
