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
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
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
        <Flex justify="center" mb="6">
          <ToggleColorMode />
        </Flex>
        <Stack spacing="150px" mt="150px">
          <AutoComplete
            id="1"
            renderEmpty={null}
            emphasize={{ color: 'blue.400', fontWeight: 'bold' }}
          >
            <AutoCompleteInput variant="filled" placeholder="Search..." />
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
          </AutoComplete>
          {/* <AutoComplete id="1" suggestWhenEmpty>
            <AutoCompleteInput variant="filled" placeholder="Search..." />
            <AutoCompleteList rollNavigation>
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
            </AutoCompleteList>
          </AutoComplete>

          <AutoComplete id="2">
            <AutoCompleteInput variant="filled" placeholder="Search..." />
            <AutoCompleteList rollNavigation>
              {europeans.map((person, oid) => (
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
            </AutoCompleteList>
          </AutoComplete> */}
        </Stack>
      </Box>
    </Box>
  );
};
export default App;
