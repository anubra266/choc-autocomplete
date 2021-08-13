import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "../../";

function App() {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  // const [value, setValue] = useState("");

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <FormControl id="email" w="80">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <InputGroup>
          <AutoComplete
            openOnFocus
            listAllValuesOnFocus
            freeSolo
            selectOnFocus
            // multiple
            onChange={v => console.log(v)}
          >
            <AutoCompleteInput
              variant="filled"
              // w="600px"
              // value={value}
              // onChange={e => console.log("input", e.target.value)}
            >
              {({ tags }) =>
                tags.map((tag, tid) => (
                  <AutoCompleteTag
                    key={tid}
                    label={tag.label}
                    onRemove={tag.onRemove}
                    disabled={tag.label === "japan"}
                  />
                ))
              }
            </AutoCompleteInput>
            <AutoCompleteList>
              {countries.map((country, cid) => (
                <AutoCompleteItem
                  key={`option-${cid}`}
                  value={country}
                  label={`Say ${country}`}
                  textTransform="capitalize"
                  _selected={{ bg: "whiteAlpha.50" }}
                  _focus={{ bg: "whiteAlpha.100" }}
                >
                  {`Say ${country}`}
                </AutoCompleteItem>
              ))}
              <AutoCompleteItem value="a" disabled>
                Disabled Item
              </AutoCompleteItem>
              <AutoCompleteCreatable>
                {({ value }) => <span>Add {value} to List</span>}
              </AutoCompleteCreatable>
            </AutoCompleteList>
          </AutoComplete>
          <InputRightElement>wow</InputRightElement>
        </InputGroup>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
