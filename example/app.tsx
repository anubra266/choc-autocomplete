import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteDivider,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '../.';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import ToggleColorMode from './toggle-color-mode';

const App = () => {
  const iconColor = useColorModeValue('gray.800', 'gray.300');
  const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];
  const options2 = ['clap', 'rape', 'trap'];
  const [value, setValue] = React.useState('');
  return (
    <Box pos="fixed" boxSize="full" top="0" left="0">
      <Box
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Flex justify="center" mb="6">
          <ToggleColorMode />
        </Flex>
        <AutoComplete
          highlightFirstOption
          onOptionHighlight={value => console.log(value)}
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color={iconColor}
              fontSize="1.2em"
              children="$"
            />
            <AutoCompleteInput
              variant="filled"
              placeholder="Search..."
              pl="10"
              defaultValue="ap"
              autoFocus
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </InputGroup>
          <AutoCompleteList rollNavigation>
            {options.map((option, oid) => (
              <AutoCompleteItem
                key={`option-${oid}`}
                value={option}
                textTransform="capitalize"
              >
                {option}
              </AutoCompleteItem>
            ))}
            <AutoCompleteDivider />
            <AutoCompleteGroup title="title">
              {options2.map((option, oid) => (
                <AutoCompleteItem
                  key={`option2-${oid}`}
                  value={option}
                  textTransform="capitalize"
                >
                  {option}
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
          </AutoCompleteList>
        </AutoComplete>
        <Input variant="filled" placeholder="Search..." mt="4" />
      </Box>
    </Box>
  );
};
export default App;
