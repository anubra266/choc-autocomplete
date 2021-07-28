import { Flex, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "../../";

interface Props {}

function App(props: Props) {
  const {} = props;
  const [value, setValue] = React.useState("wow");

  return (
    <Flex pt="48" justify="center" align="center" w="full" direction="column">
      <Flex>
        <AutoComplete
          rollNavigation
          onChange={val => console.log(val)}
          // multiple
        >
          <AutoCompleteInput
            variant="filled"
            // w="80"
            // value={value}
            // onChange={e => {
            //   setValue(e.target.value);
            //   console.log("app.tsx", e.target.value);
            // }}
          >
            {({ tags }: any) => (
              <>
                {tags.map((t: any, key: number) => (
                  <AutoCompleteTag
                    key={key}
                    label={t.value}
                    onRemove={t.onRemove}
                  />
                ))}
              </>
            )}
          </AutoCompleteInput>
          <AutoCompleteList>
            <AutoCompleteItem value="apple">Apple</AutoCompleteItem>
            <AutoCompleteItem value="appoint">Appoint</AutoCompleteItem>
            <AutoCompleteItem value="zap">Zap</AutoCompleteItem>
            <AutoCompleteItem value="cap">Cap</AutoCompleteItem>
            <AutoCompleteItem value="Ball">Ball</AutoCompleteItem>
            <AutoCompleteItem value="Table">Table</AutoCompleteItem>
            <AutoCompleteItem value="Korea">Korea</AutoCompleteItem>
            <AutoCompleteItem value="United Kingdom">
              United Kingdom
            </AutoCompleteItem>
            <AutoCompleteItem value="Nigeria">Nigeria</AutoCompleteItem>
            <AutoCompleteItem fixed value="japan">
              Japan
            </AutoCompleteItem>
          </AutoCompleteList>
        </AutoComplete>
      </Flex>
      <Flex aria-disabled={true} _disabled={{ color: "red" }}>
        {value}
      </Flex>
    </Flex>
  );
}

export default App;
