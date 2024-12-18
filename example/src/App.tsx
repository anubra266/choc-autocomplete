import {
  Box, 
} from "@chakra-ui/react"
import { AutoComplete, 
  AutoCompleteInput, 
  AutoCompleteList, 
  AutoCompleteItem} from '../../src/index';

const options = [
  { label: "apple", value: "one" },
  { label: "appoint", value: "two" },
  { label: "zap", value: "three" },
  { label: "cap", value: "four" },
  { label: "japan", value: "five" },
];

export default function Page() {
  return (
    <Box textAlign="center" fontSize="xl" pt="30vh" w='300px' mx='auto' justifyContent='center' alignItems='center'>
      <AutoComplete
        openOnFocus
        rollNavigation
        listAllValuesOnFocus 
        closeOnBlur={false}>
          <AutoCompleteInput variant="subtle" />
          <AutoCompleteList>
            {options.map(option => (
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
  )
}
