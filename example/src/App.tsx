import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteRefMethods,
  AutoCompleteTag,
  ItemTag,
} from "../../";

function App() {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  const [tags, setTags] = useState<ItemTag[]>([]);
  // const [reset, setReset] = useState<any>();
  // let reset;

  const ref = React.useRef<AutoCompleteRefMethods>();

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <FormControl id="email" w="60">
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <Button onClick={() => ref.current?.resetItems}>Reset</Button>
        <AutoComplete
          openOnFocus
          defaultValues={["nigeria", "japan", "india"]}
          ref={ref}
          multiple
          onChange={console.log}
          creatable
          onReady={({ tags }) => {
            setTags(tags);
          }}
        >
          <HStack>
            {tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.label}
                onRemove={tag.onRemove}
              />
            ))}
          </HStack>
          <AutoCompleteInput variant="filled"></AutoCompleteInput>
          <AutoCompleteList>
            {countries.map((country, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={{ id: cid, country: country }}
                getValue={value => value.country}
                label={country}
                textTransform="capitalize"
                _selected={{ bg: "whiteAlpha.50" }}
                _focus={{ bg: "whiteAlpha.100" }}
              >
                {country}
              </AutoCompleteItem>
            ))}
            <AutoCompleteCreatable />
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;
