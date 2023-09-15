import React from "react";
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Avatar, Stack, Text } from "@chakra-ui/react";

export default function App() {
  const europeans = [
    { name: "Dan Abramov", image: "https://bit.ly/dan-abramov" },
    { name: "Kent Dodds", image: "https://bit.ly/kent-c-dodds" },
    { name: "Ryan Florence", image: "https://bit.ly/ryan-florence" },
  ];
  const nigerians = [
    { name: "Segun Adebayo", image: "https://bit.ly/sage-adebayo" },
    { name: "Prosper Otemuyiwa", image: "https://bit.ly/prosper-baba" },
  ];
  return (
    <Stack direction="column">
      <Text>Custom Render </Text>
      <AutoComplete rollNavigation>
        <AutoCompleteInput variant="filled" placeholder="Search..." />
        <AutoCompleteList>
          <AutoCompleteGroup title="Nigerians" showDivider>
            {nigerians.map((person, oid) => (
              <AutoCompleteItem
                key={`nigeria-${oid}`}
                value={person.name}
                textTransform="capitalize"
                align="center"
              >
                <Avatar size="sm" name={person.name} src={person.image} />
                <Text ml="4">{person.name}</Text>
              </AutoCompleteItem>
            ))}
          </AutoCompleteGroup>
          <AutoCompleteGroup title="Europeans" showDivider>
            {europeans.map((person, oid) => (
              <AutoCompleteItem
                key={`europe-${oid}`}
                value={person.name}
                textTransform="capitalize"
                align="center"
              >
                <Avatar size="sm" name={person.name} src={person.image} />
                <Text ml="4">{person.name}</Text>
              </AutoCompleteItem>
            ))}
          </AutoCompleteGroup>
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
