import { chakra, ChakraComponent } from '@chakra-ui/system';
import { runIfFn } from '@chakra-ui/utils';
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

  const EmphasizedValue: CreatableProps['Emphasize'] = props => (
    <chakra.span sx={emphasizeStyles} {...props}>
      &nbsp; {props.children}
    </chakra.span>
  );

  return (
    <>
      {!!inputValue.trim().length && creatable && !itemExists && (
        <AutoCompleteItem value={inputValue} optionKey="newInput">
          {typeof creatable === 'boolean' ? (
            <>
              Add<EmphasizedValue>"{inputValue}"</EmphasizedValue>
            </>
          ) : (
            runIfFn(creatable, {
              newInput: inputValue,
              Emphasize: EmphasizedValue,
            } as CreatableProps)
          )}
        </AutoCompleteItem>
      )}
    </>
  );
};

export type CreatableProps = {
  newInput: string;
  Emphasize: ChakraComponent<'span', {}>;
};
