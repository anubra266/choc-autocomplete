import { chakra } from '@chakra-ui/system';
import React, { useContext } from 'react';
import { AutoCompleteItem } from '../auto-complete-item';
import { StoreContext } from '../store';

export const CreateInput = () => {
  const {
    state: {
      item,
      autocomplete: { creatable, emphasize },
      input: { value: inputValue },
    },
  } = useContext(StoreContext);

  const itemExists = item.list.some(i => i.value === inputValue);

  const emphasizeStyles =
    typeof emphasize === 'object'
      ? emphasize
      : {
          fontWeight: 'extrabold',
        };

  return (
    <>
      {!!inputValue.trim().length && creatable && !itemExists && (
        <AutoCompleteItem value={inputValue} optionKey="newInput">
          Add &nbsp;
          <chakra.span sx={emphasizeStyles}>"{inputValue}"</chakra.span>
        </AutoCompleteItem>
      )}
    </>
  );
};
