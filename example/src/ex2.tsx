import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList
} from "../../";
import { nanoid } from "nanoid";

export function makeId() {
  return nanoid(32);
}

export default function App() {
  const { placeholder, defaultKeyword, queryKeyword, onSearch } = {
    placeholder: "search",
    defaultKeyword: [],
    queryKeyword: (text:any) => {
      console.log("input change",text);
      return new Promise((relove) => {
        relove([{ id: makeId(), label: text, value: text }]);
      });
    },
    onSearch: (text) => {
      console.log("select change",text);
    }
  };

  const [options, setOptions] = React.useState(
    defaultKeyword.map((i) => ({ ...i, disabled: false }))
  );

  function changeOptions(options) {
    setOptions(options.map((i) => ({ ...i, disabled: false })));
  }

  function onInputChange(event) {
    const searchText = event.target.value;
    if (searchText.length) {
      queryKeyword(searchText)
        .then((result) => {
          changeOptions(result);
        })
        .catch((_) => {
          changeOptions([]);
        });
    } else {
      changeOptions(defaultKeyword);
    }
  }

  function onSelectChange(val) {
    if (typeof val === "string") {
      onSearch(val);
    }
  }

  return (
    <Flex
      boxSize="full"
      h="100vh"
      pos="absolute"
      bg={useColorModeValue("gray.400", "gray.600")}
      p={30}
      justifyContent="center"
    >
      <AutoComplete
        freeSolo
        openOnFocus
        rollNavigation
        onChange={onSelectChange}
      >
        <AutoCompleteInput
          placeholder={placeholder}
          variant="filled"
          onChange={onInputChange}
        />
        <AutoCompleteList>
          {options.map(({ label, value, id }) => (
            <AutoCompleteItem
              key={`option-${id}`}
              textTransform="capitalize"
              value={value}
            >
              {label}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Flex>
  );
}
