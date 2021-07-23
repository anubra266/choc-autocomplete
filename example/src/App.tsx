import { Flex, InputGroup, InputLeftElement, Wrap } from "@chakra-ui/react";
import * as React from "react";
import { AutoComplete, AutoCompleteInput, AutoCompleteList } from "../../";

interface Props {}

function App(props: Props) {
  const {} = props;

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <AutoComplete>
        <AutoCompleteInput variant="filled" w="48" />
        <AutoCompleteList>wow</AutoCompleteList>
      </AutoComplete>
      aaaaa
    </Flex>
  );
}

export default App;
