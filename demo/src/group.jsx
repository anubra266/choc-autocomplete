import React from "react";
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";

export default function App() {
  const continents = {
    africa: ["nigeria", "south africa"],
    asia: ["japan", "south korea"],
    europe: ["united kingdom", "russia"],
  };
  return (
    <Stack direction="column">
      <Text>Group </Text>
      <AutoComplete openOnFocus>
        <AutoCompleteInput placeholder="Search..." variant="filled" />
        <AutoCompleteList>
          {Object.entries(continents).map(([continent, countries], co_id) => (
            <AutoCompleteGroup key={co_id} showDivider>
              <AutoCompleteGroupTitle textTransform="capitalize">
                {continent}
              </AutoCompleteGroupTitle>
              {countries.map((country, c_id) => (
                <AutoCompleteItem
                  key={c_id}
                  value={country}
                  textTransform="capitalize"
                >
                  {country}
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
