import React, { useContext, useEffect } from 'react';
import { Box, forwardRef, Popover } from '@chakra-ui/react';
import { runIfFn } from '@chakra-ui/utils';
import { AutoComplete } from './auto-complete-provider';
import { returnT } from './utils/operations';
import { StoreContext } from './store';
import { ListAction } from './store/reducers/list';
import { InputAction } from './store/reducers/input';

export const AutoCompleteBody = forwardRef<AutoComplete, 'div'>(
  (props, ref) => {
    const { children, onChange, ...rest } = props;

    const {
      state: {
        autocomplete: {
          value: autoCompleteValue,
          freeSolo,
          focusInputOnSelect,
        },
        list: { visible: isOpen },
        input: { value: inputValue, ref: inputRef },
      },
      dispatch,
    } = useContext(StoreContext);

    useEffect(() => {
      runIfFn(onChange, autoCompleteValue);
    }, [autoCompleteValue]);

    const onClose = () => {
      dispatch({ type: ListAction.Hide });
      if (inputValue !== autoCompleteValue && !freeSolo) {
        dispatch({ type: InputAction.Set, payload: autoCompleteValue });
        returnT(inputRef?.current).value = autoCompleteValue;
      }
    };

    const resetInput = () => {
      if (inputRef?.current) {
        inputRef.current.value = '';
        inputRef.current.focus();
      }
    };

    const inputIsEmpty = inputValue.length < 1;

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
        returnFocusOnClose={!focusInputOnSelect}
      >
        <Box ref={ref} {...rest}>
          {runIfFn(children, childProps)}
        </Box>
      </Popover>
    );
  }
);
