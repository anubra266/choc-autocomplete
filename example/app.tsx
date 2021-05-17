import * as React from 'react';
import { AutoComplete, AutoCompleteInput } from '../.';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import ToggleColorMode from './toggle-color-mode';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

const App = () => {
  const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];
  const [state, setState] = React.useState(options);
  const [value, setValue] = React.useState('');

  return (
    <Flex mt="150px" justify="center">
      <AutoComplete>
        <AutoCompleteInput
          variant="filled"
          placeholder="Search..."
          defaultValue="red"
          onChange={e => console.log(e.target.value)}
        />
      </AutoComplete>
    </Flex>
  );
};
export default App;

const fruits = ['Apple', 'Grape', 'Pawpaw'];
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
