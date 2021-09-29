import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
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
        <AutoComplete openOnFocus multiple>
          {({ resetItems, tags }) => (
            <>
              {tags.map((tag, tid) => (
                <Tag key={tid}>
                  <TagLabel>{tag.label}</TagLabel>
                  <TagCloseButton onClick={() => tag.onRemove(tag)} />
                </Tag>
              ))}
              <Button onClick={() => resetItems(false)}>Reset</Button>
              <AutoCompleteInput variant="filled" />
              <AutoCompleteList>
                {Object.entries(continents).map(
                  ([continent, countries], co_id) => (
                    <AutoCompleteGroup key={co_id} showDivider id={continent}>
                      <AutoCompleteGroupTitle textTransform="capitalize">
                        {continent}
                      </AutoCompleteGroupTitle>
                      {countries.map((country, c_id) => (
                        <AutoCompleteItem
                          key={c_id}
                          value={{ id: c_id, country: country }}
                          getValue={value => value.country}
                          groupId={continent}
                          textTransform="capitalize"
                        >
                          {country}
                        </AutoCompleteItem>
                      ))}
                    </AutoCompleteGroup>
                  )
                )}
              </AutoCompleteList>
            </>
          )}
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
