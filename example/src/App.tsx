import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  InputGroup,
  Spinner,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteRefMethods,
  AutoCompleteTag,
  ItemTag,
} from "../../";

function App() {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];
  const options = [
    { label: "apple", value: "one" },
    { label: "appoint", value: "two" },
    { label: "zap", value: "three" },
    { label: "cap", value: "four" },
    { label: "japan", value: "five" },
  ];

  const [valueM, setValueM] = useState<string[]>(["one", "two"]);

  return (
    <Flex pt="48" justify="center" align="center" w="full">
      <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <Button onClick={() => setValueM([])}>Reset</Button>
        <AutoComplete
          values={valueM}
          onChange={setValueM}
          openOnFocus
          rollNavigation
          listAllValuesOnFocus
          multiple
        >
          {/* <InputGroup> */}
            <AutoCompleteInput variant="filled" w="48">
              {({ tags }) =>
                tags.map((tag, tid) => (
                  <AutoCompleteTag
                    key={tid}
                    label={tag.label}
                    onRemove={tag.onRemove}
                  />
                ))
              }
            </AutoCompleteInput>
            {/* <InputRightElement>
              <Spinner />
            </InputRightElement> */}
          </InputGroup>
          <AutoCompleteList>
            {options.map(option => (
              <AutoCompleteItem
                key={`option-${option.value}`}
                value={`${option.value}`}
                label={option.label}
                textTransform="capitalize"
              />
            ))}
            <AutoCompleteCreatable />
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
