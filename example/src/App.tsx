import { Flex, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "../../";

function App() {
  const continents = {
    africa: ["nigeria", "south africa"],
    asia: ["japan", "south korea"],
    europe: ["united kingdom", "russia"],
  };

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <AutoComplete openOnFocus>
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            {Object.entries(continents).map(([continent, countries], co_id) => (
              <AutoCompleteGroup key={co_id} showDivider>
                <AutoCompleteGroupTitle>{continent}</AutoCompleteGroupTitle>
                {countries.map((country, c_id) => (
                  <AutoCompleteItem key={c_id} value={country}>
                    {country}
                  </AutoCompleteItem>
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
