import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '../.';
import { Avatar, Box, Text, useColorModeValue } from '@chakra-ui/react';
import ToggleColorMode from './toggle-color-mode';

const App = () => {
  const iconColor = useColorModeValue('gray.800', 'gray.300');
  const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];
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
  const [value, setValue] = React.useState('');
  return (
    <Box pos="fixed" boxSize="full" top="10" left="0">
      <Box pos="absolute" left="50%" transform="translateX(-50%)">
        {/* <Flex justify="center" mb="6">
          <ToggleColorMode />
        </Flex> */}
        <AutoComplete highlightFirstOption>
          {/* <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color={iconColor}
              fontSize="1.2em"
            >
              <Icon boxSize="16px" viewBox="0 0 24 24" focusable="false">
                <path
                  fill="currentColor"
                  d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
                ></path>
              </Icon>
            </InputLeftElement> */}
          <AutoCompleteInput
            variant="filled"
            placeholder="Search..."
            // pl="10"
            autoFocus
            // value={value}
            // onChange={e => setValue(e.target.value)}
          />
          {/* </InputGroup> */}
          <AutoCompleteList rollNavigation>
            <AutoCompleteGroup title="Nigerians" showDivider>
              {nigerians.map((person, oid) => (
                <AutoCompleteItem
                  key={`nigeria-${oid}`}
                  value={person.name}
                  textTransform="capitalize"
                  align="center"
                >
                  <Avatar size="sm" name={person.name} src={person.image} />
                  <Text ml="4">{person.name}</Text>
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
            <AutoCompleteGroup title="Europeans" showDivider>
              {europeans.map((person, oid) => (
                <AutoCompleteItem
                  key={`europe-${oid}`}
                  value={person.name}
                  textTransform="capitalize"
                  align="center"
                >
                  <Avatar size="sm" name={person.name} src={person.image} />
                  <Text ml="4">{person.name}</Text>
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
            {/* <AutoCompleteGroup title="Fruits" showDivider>
              {fruits.map((option, oid) => (
                <AutoCompleteItem
                  key={`fruits-${oid}`}
                  value={option}
                  textTransform="capitalize"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup> */}
          </AutoCompleteList>
        </AutoComplete>
        {/* <Input variant="filled" placeholder="Search..." mt="4" /> */}
      </Box>
    </Box>
  );
};
export default App;
