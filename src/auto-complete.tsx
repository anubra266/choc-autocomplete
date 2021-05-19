import React, { useContext, useEffect } from 'react';
import { Box, forwardRef } from '@chakra-ui/react';
import { AutoComplete } from './auto-complete-provider';
import { runIfFn } from './utils/operations';
import { StoreContext } from './store';
import { ListAction } from './store/reducers/list';

export const AutoCompleteBody = forwardRef<AutoComplete, 'div'>(
  (props, ref) => {
    const { children, onChange, ...rest } = props;
    const {
      state: {
        autocomplete: { value: autoCompleteValue },
        list: { visible },
      },
      dispatch,
    } = useContext(StoreContext);

    useEffect(() => {
      runIfFn(onChange, autoCompleteValue);
    }, [autoCompleteValue]);

    return (
      <Box pos="relative" ref={ref} {...rest}>
        {runIfFn(children, {
          isOpen: visible,
          onClose: () => dispatch({ type: ListAction.Hide }),
        })}
      </Box>
    );
  }
);
