import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '../.';
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

const App = () => {
  const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];
  return (
    <Box pos="fixed" boxSize="full" top="10" left="0">
      <Box pos="absolute" left="50%" transform="translateX(-50%)">
        {/* <Flex justify="center" mb="6">
          <ToggleColorMode />
        </Flex> */}

        <Stack spacing="150px" mt="150px">
          <AutoComplete>
            {({ isOpen }) => (
              <>
                <InputGroup>
                  <AutoCompleteInput variant="filled" placeholder="Search..." />
                  <InputRightElement
                    children={
                      <Icon as={isOpen ? ChevronRightIcon : ChevronDownIcon} />
                    }
                  />
                </InputGroup>
                <AutoCompleteList rollNavigation>
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
        </Stack>
      </Box>
    </Box>
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
