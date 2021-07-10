import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteProps,
} from '../.';
import {
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from '@chakra-ui/icons';

const App = () => {
  const defOptions = ['apple', 'appoint', 'zap', 'cap', 'japan'];
  const [options, setOptions] = React.useState(defOptions);
  const shouldRenderSuggestions: AutoCompleteProps['shouldRenderSuggestions'] = value => {
    return value.trim().length > 0;
  };

  return (
    <Flex justify="center" pt="150px">
      <AutoComplete rollNavigation>
        {({ isOpen }) => (
          <>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon />}
              />
              <AutoCompleteInput variant="filled" placeholder=" Search..." />
              <InputRightElement
                pointerEvents="none"
                children={
                  <Icon as={isOpen ? ChevronRightIcon : ChevronDownIcon} />
                }
              />
            </InputGroup>
            <AutoCompleteList>
              {options.map((option, oid) => (
                <AutoCompleteItem
                  key={`optio-${oid}`}
                  value={option}
                  textTransform="capitalize"
                  align="center"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </>
        )}
      </AutoComplete>
      {/* <Button
        zIndex="tooltip"
        mt="150px"
        onClick={() => setOptions(o => [...o, 'new'])}
      >
        Add Option
      </Button> */}
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
