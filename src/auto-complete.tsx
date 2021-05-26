import React, { useContext, useEffect } from 'react';
import { Box, forwardRef, Popover } from '@chakra-ui/react';
import { AutoComplete } from './auto-complete-provider';
import { returnT, runIfFn } from './utils/operations';
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
        list: { visible },
        input: { value: inputValue, ref: inputRef },
      },
      dispatch,
    } = useContext(StoreContext);

    useEffect(() => {
      runIfFn(onChange, autoCompleteValue);
    }, [autoCompleteValue]);

    const handleClose = () => {
      dispatch({ type: ListAction.Hide });
      if (inputValue !== autoCompleteValue && !freeSolo) {
        dispatch({ type: InputAction.Set, payload: autoCompleteValue });
        returnT(inputRef?.current).value = autoCompleteValue;
      }
    };

    return (
      <Popover
        autoFocus={false}
        closeOnBlur={true}
        placement="bottom"
        isOpen={visible}
        onClose={handleClose}
        returnFocusOnClose={!focusInputOnSelect}
      >
        {({ isOpen, onClose }) => (
          <Box ref={ref} {...rest}>
            {runIfFn(children, {
              isOpen,
              onClose,
            })}
          </Box>
        )}
      </Popover>
    );
  }
);
