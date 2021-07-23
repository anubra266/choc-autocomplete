import { Flex, InputGroup, InputLeftElement, Wrap } from "@chakra-ui/react";
import * as React from "react";
import { AutoComplete, AutoCompleteInput, AutoCompleteList } from "../../";

interface Props {}

function App(props: Props) {
  const {} = props;

  return (
    <Flex pt="48" justify="center" w="full" direction="column">
      <AutoComplete>
        <InputGroup>
          <InputLeftElement>hey</InputLeftElement>
          <AutoCompleteInput variant="filled" w="48" />
        </InputGroup>
        <AutoCompleteList>wow</AutoCompleteList>
      </AutoComplete>
      aaaaa
    </Flex>
  );
}

export default App;
