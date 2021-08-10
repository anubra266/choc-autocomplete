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
  const { placeholder, defaultKeyword, queryKeyword, onSearch }:any = {
    placeholder: "search",
    defaultKeyword: [],
    queryKeyword: (text:any) => {
      console.log("input change",text);
      return new Promise((relove) => {
        relove([{ id: makeId(), label: text, value: text }]);
      });
    },
    onSearch: (text:any) => {
      console.log("select change",text);
    }
  };

  const [options, setOptions] = React.useState(
    defaultKeyword.map((i:any) => ({ ...i, disabled: false }))
  );

  function changeOptions(options:any) {
    setOptions(options.map((i:any) => ({ ...i, disabled: false })));
  }

  function onInputChange(event:any) {
    const searchText = event.target.value;
    if (searchText.length) {
      queryKeyword(searchText)
        .then((result:any) => {
          changeOptions(result);
        })
        .catch((_:any) => {
          changeOptions([]);
        });
    } else {
      changeOptions(defaultKeyword);
    }
  }

  function onSelectChange(val:any) {
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
          {options.map(({ label, value, id }:any) => (
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
