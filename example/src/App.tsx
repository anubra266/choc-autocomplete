import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "../../";

interface Props {}

function App(props: Props) {
  const [value, setValue] = React.useState("wow");

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <AutoComplete rollNavigation openOnFocus>
          <AutoCompleteInput variant="filled" />
          <AutoCompleteList>
            <AutoCompleteItem value="japan">Japan</AutoCompleteItem>
            <AutoCompleteItem value="United States">
              United States
            </AutoCompleteItem>
            <AutoCompleteGroup showDivider>
              <AutoCompleteGroupTitle>Africa</AutoCompleteGroupTitle>
              <AutoCompleteItem value="Nigeria">Nigeria</AutoCompleteItem>
              <AutoCompleteItem value="South Africa">
                South Africa
              </AutoCompleteItem>
              <AutoCompleteItem value="Kenya">Kenya</AutoCompleteItem>
            </AutoCompleteGroup>
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
