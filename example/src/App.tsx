import {
  Box,
  Button,
  InputGroup, 
} from "@chakra-ui/react"
import { AutoComplete, 
  AutoCompleteInput, 
  AutoCompleteList, 
  AutoCompleteItem} from '../../src/index';
import { useCallback, useEffect, useState } from "react";

const options = [
  { label: "apple", value: "one" },
  { label: "appoint", value: "two" },
  { label: "zap", value: "three" },
  { label: "cap", value: "four" },
  { label: "japan", value: "five" },
];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  const loadItems = useCallback(() => {
    setIsLoading(true);

    sleep(3000)
      .then(() => {
        setIsLoading(false);
        setItems(options);
      })
  }, [setIsLoading, setItems]);
  return (
    <Box border="1px solid #999" textAlign="center" fontSize="xl" pt="30vh" w='300px' mx='auto' justifyContent='center' alignItems='center'>
      <Button onClick={loadItems}>Trigger Loading State</Button>
      <AutoComplete
        openOnFocus
        rollNavigation
        listAllValuesOnFocus 
        closeOnBlur={false} 
        isLoading={isLoading}>
          <AutoCompleteInput variant="subtle" />
          <AutoCompleteList>
            {items.map(option => (
              <AutoCompleteItem
                key={`option-${option.value}`}
                value={{ title: `${option.value}` }}
                // getValue={a => a.title}
                label={option.label}
                textTransform="capitalize"
              />
            ))}
        </AutoCompleteList>
      </AutoComplete>

<Box mt={5}>
  <AutoComplete>
    <InputGroup endElement={"X"}>
      <AutoCompleteInput variant="subtle" />
    </InputGroup>
          <AutoCompleteList>
            {items.map(option => (
              <AutoCompleteItem
                key={`option-${option.value}`}
                value={{ title: `${option.value}` }}
                // getValue={a => a.title}
                label={option.label}
                textTransform="capitalize"
              />
            ))}
        </AutoCompleteList>
  </AutoComplete>
  </Box>
    </Box>
  )
}
