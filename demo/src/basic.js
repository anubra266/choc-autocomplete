import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";

export default function App() {
  const options = ["apple", "appoint", "zap", "cap", "japan"];
  return (
    <Stack direction="column">
      <Text>Basic </Text>
      <AutoComplete rollNavigation>
        <AutoCompleteInput
          variant="filled"
          placeholder="Search basic..."
          autoFocus
        />
        <AutoCompleteList>
          {options.map((option, oid) => (
            <AutoCompleteItem
              key={`option-${oid}`}
              value={option}
              label={option}
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
