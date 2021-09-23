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
  AutoCompleteGroup,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
  AutoCompleteGroupTitle,
} from "../../";

const countries = ["nigeria", "japan", "india", "united states", "south korea"];
const continents = {
  africa: ["nigeria", "south africa"],
  asia: ["japan", "south korea"],
  europe: ["united kingdom", "russia"],
};
function App() {
  // const [value, setValue] = useState("");

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <AutoComplete openOnFocus>
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            {Object.entries(continents).map(([continent, countries], co_id) => (
              <AutoCompleteGroup key={co_id} showDivider id={continent}>
                <AutoCompleteGroupTitle textTransform="capitalize">
                  {continent}
                </AutoCompleteGroupTitle>
                {countries.map((country, c_id) => (
                  <Country country={country} key={c_id} groupId={continent} />
                ))}
              </AutoCompleteGroup>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;

const Country = ({ country, groupId }: any) => {
  return (
    <AutoCompleteItem
      value={country}
      groupId={groupId}
      textTransform="capitalize"
    >
      {country}
    </AutoCompleteItem>
  );
};
