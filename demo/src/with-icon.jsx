import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import {
  Icon,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function App() {
  const options = ["apple", "appoint", "zap", "cap", "japan"];
  return (
    <Stack direction="column">
      <Text>With Icon </Text>
      <AutoComplete rollNavigation>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="inherit"
            fontSize="1.2em"
          >
            <Icon boxSize="16px" viewBox="0 0 24 24" focusable="false">
              <path
                fill="currentColor"
                d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
              ></path>
            </Icon>
          </InputLeftElement>
          <AutoCompleteInput variant="filled" placeholder="Search..." />
        </InputGroup>
        <AutoCompleteList>
          {options.map((option, oid) => (
            <AutoCompleteItem
              key={`option-${oid}`}
              value={option}
              textTransform="capitalize"
            >
              {option}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
