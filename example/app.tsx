import * as React from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '../.';
import { Button, Flex } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';

const App = () => {
  const defOptions = ['apple', 'appoint', 'zap', 'cap', 'japan'];
  const [options, setOptions] = React.useState(defOptions);
  const [outValue, setOutValue] = React.useState('');
  const handleChange = (e: any) => {
    console.log(e.target.value);
    setOutValue(e.target.value);
  };
  return (
    <Flex mt="150px" align="center" direction="column">
      <AutoComplete>
        <AutoCompleteInput
          variant="filled"
          placeholder="Search..."
          value={outValue}
          onChange={handleChange}
        />
        <AutoCompleteList>
          {options.map((option, oid) => (
            <AutoCompleteItem value={option} key={`option-${oid}`}>
              {option}{' '}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      {/* <Button mt="150px" onClick={() => setOptions(o => [...o, 'new'])}>
        Add Option
      </Button> */}
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
