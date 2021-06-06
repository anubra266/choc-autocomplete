import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteChildProps,
  AutoCompleteFixedItem,
  AutoCompleteProps,
} from '../.';
import { Button, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';

const App = () => {
  const defOptions = ['apple', 'appoint', 'zap', 'cap', 'japan'];
  const [options, setOptions] = React.useState(defOptions);
  // const [outValue, setOutValue] = React.useState('');
  // const handleChange = (e: any) => {
  //   console.log(e.target.value);
  //   setOutValue(e.target.value);
  // };
  const shouldRenderSuggestions: AutoCompleteProps['shouldRenderSuggestions'] = value => {
    return value.trim().length > 2;
  };

  return (
    <Flex justify="center" pt="150px">
      <AutoComplete
        rollNavigation
        // focusInputOnSelect
        // openOnFocus
        emphasize
        // freeSolo
        // creatable
        suggestWhenEmpty
        // closeOnselect={false}
        shouldRenderSuggestions={shouldRenderSuggestions}
      >
        <AutoCompleteInput variant="filled" placeholder="Search..." autoFocus />
        <AutoCompleteList>
          {options.map((option, oid) => (
            <AutoCompleteItem
              textTransform="capitalize"
              value={option}
              key={`option-${oid}`}
              disabled={option === 'zap'}
            >
              {option}{' '}
            </AutoCompleteItem>
          ))}
          <AutoCompleteGroup title="fruits" showDivider>
            {fruits.map((fruit, fid) => (
              <AutoCompleteItem value={fruit} key={`fruit-${fid}`}>
                {fruit}{' '}
              </AutoCompleteItem>
            ))}
          </AutoCompleteGroup>
          <AutoCompleteFixedItem
            onItemSelect={method => {
              console.log('me', method);
              setOptions(o => [...o, 'new']);
            }}
          >
            Create New
          </AutoCompleteFixedItem>
        </AutoCompleteList>
      </AutoComplete>
      {/* <Button
        zIndex="tooltip"
        mt="150px"
        onClick={() => setOptions(o => [...o, 'new'])}
      >
        Add Option
      </Button> */}
      {/* <AutoComplete
        rollNavigation
        focusInputOnSelect
        freeSolo
        emphasize
        openOnFocus
        creatable={({ newInput, Emphasize }) => (
          <>
            Create<Emphasize>"{newInput}"</Emphasize>
          </>
        )}
        defaultIsOpen
        onSelectOption={({ optionValue, isNewInput }) => {
          console.log('wow :>> ', optionValue, isNewInput);
          return false;
        }}
      >
        {({ inputIsEmpty, resetInput }: AutoCompleteChildProps) => (
          <>
            <InputGroup>
              <AutoCompleteInput
                variant="filled"
                placeholder="Search..."
                defaultValue="app"
                // autoFocus
              />
              {!inputIsEmpty && (
                <InputRightElement cursor="pointer" onClick={resetInput}>
                  ❌
                </InputRightElement>
              )}
            </InputGroup>
            <AutoCompleteList>
              {options.map((option, oid) => (
                <AutoCompleteItem
                  textTransform="capitalize"
                  value={option}
                  key={`option-${oid}`}
                >
                  {option}{' '}
                </AutoCompleteItem>
              ))}
              <AutoCompleteGroup title="fruits" showDivider>
                {fruits.map((fruit, fid) => (
                  <AutoCompleteItem value={fruit} key={`fruit-${fid}`}>
                    {fruit}{' '}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteGroup>
            </AutoCompleteList>
          </>
        )}
      </AutoComplete> */}
    </Flex>
  );
};
export default App;

const fruits = ['Banana', 'Grape', 'Pawpaw'];
const countries = ['Korea', 'Nigeria', 'India'];
const europeans = [
  { name: 'Dan Abramov', image: 'https://bit.ly/dan-abramov' },
  { name: 'Kent Dodds', image: 'https://bit.ly/kent-c-dodds' },
  { name: 'Ryan Florence', image: 'https://bit.ly/ryan-florence' },
];
const nigerians = [
  { name: 'Segun Adebayo', image: 'https://bit.ly/sage-adebayo' },
  { name: 'Prosper Otemuyiwa', image: 'https://bit.ly/prosper-baba' },
];

{
  /* <Flex justify="center" mb="6">
          <ToggleColorMode />
        </Flex> */
}
