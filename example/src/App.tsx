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

  const [value, setValue] = useState<string | null>("japan");
  const [valueM, setValueM] = useState(["two"]);

  return (
    <Flex pt="48" justify="center" align="center" w="full">
      {/* <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <Button onClick={() => setValue("")}>Reset</Button>
        <Input />
        <Input />
        <Input />
        <Input />
        <AutoComplete
          // value={value}
          // freeSolo

          defaultValue="japan"
          onChange={a => {
            // setValue(a);
          }}
          listAllValuesOnFocus
          selectOnFocus
          openOnFocus
          // multiple
        >
          <InputGroup>
            <AutoCompleteInput variant="filled" w="60">
              {({ tags }) => {
                return tags.map((tag, tid) => (
                  <AutoCompleteTag
                    key={tid}
                    label={tag.label}
                    onRemove={tag.onRemove}
                  />
                ));
              }}
            </AutoCompleteInput>
            <InputRightElement>
              <Spinner />
            </InputRightElement>
          </InputGroup>
          <AutoCompleteList>
            {countries.map((country, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={country}
                // label={country}
                textTransform="capitalize"
                _selected={{ bg: "whiteAlpha.50" }}
                _focus={{ bg: "whiteAlpha.100" }}
              >
                {country}
              </AutoCompleteItem>
            ))}
            <AutoCompleteCreatable />
          </AutoCompleteList>
        </AutoComplete>
        <Button onClick={() => setValue("")}>Reset</Button>

        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl> */}
      {/* ///////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////// */}
      {/* ///////////////////////////////////////////////// */}

      <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <Button onClick={() => setValueM([])}>Reset</Button>
        <AutoComplete
          values={valueM}
          onChange={a => {
            setValueM(a);
          }}
          multiple
          listAllValuesOnFocus
          selectOnFocus
          openOnFocus
        >
          <InputGroup>
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
            <InputRightElement>
              <Spinner />
            </InputRightElement>
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
