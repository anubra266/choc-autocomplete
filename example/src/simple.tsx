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
  
  const countries = ["nigeria", "japan", "india", "united states", "south korea"];
  
  function App() {
    // const [value, setValue] = useState("");
  
    return (
      <Flex pt="48" justify="center" align="center" w="full" direction="column">
        <FormControl id="email" w="60">
          <FormLabel>Olympics Soccer Winner</FormLabel>
          <AutoComplete
            openOnFocus
            multiple
            onChange={vals => console.log(vals)}
            creatable
          >
            <AutoCompleteInput variant="filled">
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
            <SearchList />
          </AutoComplete>
          <FormHelperText>Who do you support.</FormHelperText>
        </FormControl>
      </Flex>
    );
  }
  
  export default App;
  
  const SearchList = () => {
    return (
      <AutoCompleteList>
        {countries.map((country, cid) => (
          <AutoCompleteItem
            key={`option-${cid}`}
            value={country}
            label={country}
            textTransform="capitalize"
            _selected={{ bg: "whiteAlpha.50" }}
            _focus={{ bg: "whiteAlpha.100" }}
          >
            {country}
          </AutoCompleteItem>
        ))}
        <AutoCompleteCreatable />
      </AutoCompleteList>
    );
  };
  