import React from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";

export default function App() {
  const options = ["apple", "appoint", "zap", "cap", "japan"];
  return (
    <Stack direction="column">
      <Text>Creatable </Text>
      <AutoComplete multiple rollNavigation creatable>
        <AutoCompleteInput
          variant="filled"
          placeholder="Search basic..."
          autoFocus
        >
          {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.value}
                onRemove={tag.onRemove}
                disabled={tag.label === "japan"}
              />
            ))
          }
        </AutoCompleteInput>
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
          <AutoCompleteCreatable />
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
