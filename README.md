<div align="center">

  <h1>
    <br/>
    🏇
    <br />
    @choc-ui/chakra-autocomplete
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@choc-ui/chakra-autocomplete?style=for-the-badge">
       <img src="https://img.shields.io/npm/v/@choc-ui/chakra-autocomplete.svg?style=for-the-badge" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@choc-ui/chakra-autocomplete?style=for-the-badge">
      <img src="https://img.shields.io/npm/dw/@choc-ui/chakra-autocomplete.svg?style=for-the-badge" alt="npm  downloads" />
    </a>
<a>
    <img alt="NPM" src="https://img.shields.io/npm/l/@choc-ui/chakra-autocomplete?style=for-the-badge">
</a>

<a><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/anubra266/choc-autocomplete?logo=github&style=for-the-badge">

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

</a>
    <br />
    AutoComplete Component for the <a href="https://chakra-ui.com">Chakra UI</a> Library.</em>

  </sup>
</div>

## Chakra V3 and V2 Support

AutoComplete Version 6+ supports [Chakra UI V3](https://www.chakra-ui.com/).  If you are using [Chakra UI V2](https://v2.chakra-ui.com/), please continue to use the current choc-autocomplete v5.X [documentation here](https://github.com/anubra266/choc-autocomplete/tree/v5).  We will continue to try and support Chakra V2 but will eventually be removed once V3 becomes more widely adopted.

For help migrating from Chakra UI V2 to V3, please see their [migration guide](https://chakra-ui.com/docs/get-started/migration)

The public API of the AutoComplete components have not changed with this migration.

## Known issues with Chakra V3

There is only 1 known display issue with Chakra V3.  When using the `multiple` prop, it is no longer possible to replicate the same styling to the `Box` wrapper as what the underlying `Input` is using.  We are still looking into ways to resolve this, but neither the Chakra nor next-themes teams have published guidance on this yet. 

## Install

```bash
npm i --save @choc-ui/chakra-autocomplete
#or
yarn add @choc-ui/chakra-autocomplete
```

## Preview

### With Mouse

![](./assets/mouse.gif)

### With Keyboard

![](./assets/keyboard.gif)

## Usage

### Basic Usage

```js
import { Flex, Field } from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";

function App() {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  return (
    <Flex pt="48" justify="center" align="center" w="full">
      <Field.Root w="60">
        <Field.Label>Olympics Soccer Winner</Field.Label>
        <AutoComplete openOnFocus>
          <AutoCompleteInput variant="subtle" />
          <AutoCompleteList>
            {countries.map((country, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={country}
                textTransform="capitalize"
              >
                {country}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <Field.HelperText>Who do you support.</Field.HelperText>
      </Field.Root>
    </Flex>
  );
}

export default App;
```

<img width="792" alt="CleanShot 2021-07-28 at 23 47 57@2x" src="https://user-images.githubusercontent.com/30869823/127406028-1b20b6c7-d2f4-4a27-a0f4-2a07598e7dfa.png">

### Creating Groups

You can create groups with the `AutoCompleteGroup` Component, and add a title with the `AutoCompleteGroupTitle` component.

```js
import React from "react";
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteGroupTitle,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";

export default function App() {
  const continents = {
    africa: ["nigeria", "south africa"],
    asia: ["japan", "south korea"],
    europe: ["united kingdom", "russia"],
  };
  return (
    <Stack direction="column">
      <Text>Group </Text>
      <AutoComplete openOnFocus>
        <AutoCompleteInput placeholder="Search..." variant="subtle" />
        <AutoCompleteList>
          {Object.entries(continents).map(([continent, countries], co_id) => (
            <AutoCompleteGroup key={co_id} showDivider>
              <AutoCompleteGroupTitle textTransform="capitalize">
                {continent}
              </AutoCompleteGroupTitle>
              {countries.map((country, c_id) => (
                <AutoCompleteItem
                  key={c_id}
                  value={country}
                  textTransform="capitalize"
                >
                  {country}
                </AutoCompleteItem>
              ))}
            </AutoCompleteGroup>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
```

<img width="661" alt="CleanShot 2021-07-29 at 01 18 47@2x" src="https://user-images.githubusercontent.com/30869823/127412483-89639ae2-34a7-4f59-9da0-287cd83cd035.png">

## Accessing the internal state

To access the internal state of the `AutoComplete`, use a function as children (commonly known as a render prop). You'll get access to the internal state `isOpen`, with the `onOpen` and `onClose` methods.

```js
import {
  Flex,
  Field, 
  Icon
} from "@chakra-ui/react";
import * as React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";
import { InputGroup } from "./components/ui/input-group";

function App() {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];

  return (
    <Flex pt="48" justify="center" align="center" w="full">
      <Field.Root w="60">
        <Field.Label>Olympics Soccer Winner</Field.Label>
        <AutoComplete openOnFocus>
          {({ isOpen }) => (
            <>
              <InputGroup 
                endElement={<Icon>{isOpen ? <FiChevronRight /> : <FiChevronDown />}</Icon>}
              >
                <AutoCompleteInput variant="subtle" placeholder="Search..." />
              </InputGroup>
              <AutoCompleteList>
                {countries.map((country, cid) => (
                  <AutoCompleteItem
                    key={`option-${cid}`}
                    value={country}
                    textTransform="capitalize"
                  >
                    {country}
                  </AutoCompleteItem>
                ))}
              </AutoCompleteList>
            </>
          )}
        </AutoComplete>
        <Field.HelperText>Who do you support.</Field.HelperText>
      </Field.Root>
    </Flex>
  );
}

export default App;
```

<img width="1002" alt="CleanShot 2021-07-29 at 01 29 46@2x" src="https://user-images.githubusercontent.com/30869823/127413256-053d280f-46b7-4b12-bc49-c482963b857f.png">

## Custom Rendering

You can Render whatever you want. The `AutoComplete` Items are regular `Chakra` Boxes.

```js
import React from "react";
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";
import { Avatar } from "./components/ui/avatar";

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
        <AutoCompleteInput variant="subtle" placeholder="Search..." />
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

```

<img width="541" alt="CleanShot 2021-07-29 at 01 35 03@2x" src="https://user-images.githubusercontent.com/30869823/127413575-9cea8ee8-3fd3-4720-8d87-7e1f996144be.png">

## Multi Select with Tags

Add the `multiple` prop to `AutoComplete` component, the `AutoCompleteInput` will now expose the tags in it's children function.
The `onChange` prop now returns an array of the chosen `values`

Now you can map the tags with the `AutoCompleteTag` component or any other component of your choice. The `label` and the `onRemove` method are now exposed.

**Important** - With Chakra UI V3, it is no longer possible to replicate the same styling to the `Box` wrapper as what the underlying `Input` is using.  We are still looking into ways to resolve this, but neither the Chakra nor next-themes teams have published guidance on this yet. 

```js
import React from "react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";

export default function App() {
  const countries = [
    "nigeria",
    "japan",
    "india",
    "united states",
    "south korea",
  ];
  return (
    <Stack direction="column">
      <Text>Multi select with tags</Text>
      <AutoComplete openOnFocus multiple onChange={(vals) => console.log(vals)}>
        <AutoCompleteInput placeholder="Search..." variant="subtle">
          {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.label}
                onRemove={tag.onRemove}
              />
            ))
          }
        </AutoCompleteInput>
        <AutoCompleteList>
          {countries.map((country, cid) => (
            <AutoCompleteItem
              key={`option-${cid}`}
              value={country}
              textTransform="capitalize"
              _selected={{ bg: "whiteAlpha.50" }}
              _focus={{ bg: "whiteAlpha.100" }}
            >
              {country}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}
```

![Kapture 2021-07-29 at 02 05 53](https://user-images.githubusercontent.com/30869823/127415996-09a5df7c-a356-4a22-ad9c-60d09963cfc6.gif)

## Creatable Items

I know that title hardly expresses the point, but yeah, naming is tough. You might want your users to be able to add extra items when their options are not available in the provided options. e.g. adding a new tag to your Polywork profile.

First add the `creatable` prop to the `AutoComplete` component.
Then add the `AutoCompleteCreatable` component to the bottom of the list. Refer to the references for more info on this component.

```js
import React from "react";
import {
  AutoComplete,
  AutoCompleteCreatable,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { Stack, Text } from "@chakra-ui/react";

export default function App() {
  const options = ["apple", "appoint", "zap", "cap", "japan"];
  return (
    <Stack direction="column">
      <Text>Creatable </Text>
      <AutoComplete multiple rollNavigation creatable>
        <AutoCompleteInput
          variant="subtle"
          placeholder="Search basic..."
          autoFocus
        >
          {({ tags }) =>
            tags.map((tag, tid) => (
              <AutoCompleteTag
                key={tid}
                label={tag.value}
                onRemove={tag.onRemove}
                disabled={tag.label === "japan"}
              />
            ))
          }
        </AutoCompleteInput>
        <AutoCompleteList>
          {options.map((option, oid) => (
            <AutoCompleteItem
              key={`option-${oid}`}
              value={option}
              textTransform="capitalize"
            >
              {option}
            </AutoCompleteItem>
          ))}
          <AutoCompleteCreatable />
        </AutoCompleteList>
      </AutoComplete>
    </Stack>
  );
}

```

<img width="517" alt="CleanShot 2021-07-29 at 02 29 20@2x" src="https://user-images.githubusercontent.com/30869823/127417453-e78b9b48-26e8-4ff0-a264-1d6bb4717ab0.png">

## Loading State

Need to pull data from API, but don't want your users to see a blank screen?  You can enable the loading state by passing the `isLoading` prop to `AutoComplete`.  By doing this, 2 other props will be enabled

1. `loadingIcon` on `AutoCompleteInput` will display some sort of loading icon on the right side of the input.  By default, a `Spinner` will be displayed, but you can pass in any custom element to be rendered

2. `loadingState` on `AutoCompleteList` can display custom loading content when `isLoading` is `true`.  All content will be rendered in the center of the list.  By default, a `Spinner` will be displayed, but you can pass in any custom element to be rendered.

Best practice is to combine `setTimeout` and `useEffect` to create a debounce effect.  This will prevent un-necessary API calls if your user types relatively quickly.

A working code demo can be found [here](https://codesandbox.io/s/choc-ui-chakra-autocomplete-loading-tfc8jz)

## Integration with Form Libraries

It is relatively easy to integrate with form libaries such as `React Hook Form`, `Formik`, and others.  Working examples can be found in the `demos` folder of this repo.  See the [Contributing](#contribute) section of this doc on how to clone and set it up for testing.

Does your favorite form library not have a working example?  Submit a PR to get it added and help others using this library quickly get up and running.

## Autocomplete methods

Assign a ref to the `AutoComplete` component and call the available methods with:

```js
ref.current?.resetItems();
ref.current?.removeItem(itemValue);
```

### Codesandbox Link [Here](https://githubbox.com/anubra266/choc-autocomplete/tree/main/demo)

## API Reference

**NB**: Feel free to request any additional `Prop` in [Issues](https://github.com/anubra266/choc-autocomplete/issues/new/).

### **AutoComplete**

Wrapper and Provider for `AutoCompleteInput` and `AutoCompleteList`

**AutoComplete** composes [**Box**](https://chakra-ui.com/docs/components/box) so you can pass all Box props to change its style.

**NB:** None of the props passed to it are required.

<table>
    <thead>
        <tr>
            <td>Prop</td>
            <td>Type</td>
            <td>Description</td>
            <td>Default</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>closeOnBlur</td>
            <td>boolean</td>
            <td>close suggestions when input is blurred </td>
            <td>true</td>
        </tr>
        <tr>
            <td>closeOnSelect</td>
            <td>boolean</td>
            <td>close suggestions when a suggestions is selected</td>
            <td>true when multiple=false, false when multiple=true</td>
        </tr>
        <tr>
            <td>creatable</td>
            <td>boolean</td>
            <td>Allow addition of arbitrary values not present in suggestions</td>
            <td>false</td>
        </tr>
        <tr>
            <td>defaultIsOpen</td>
            <td>boolean</td>
            <td>Suggestions list is open by default</td>
            <td>false</td>
        </tr>
        <tr>
            <td>prefocusFirstItem</td>
            <td>boolean</td>
            <td>Should prefocus first item intially, on query change, on open, and on filter out of current focused item</td>
            <td>true</td>
        </tr>
         <tr>
            <td>defaultValues</td>
            <td>Array</td>
            <td>Used to predefine tags, or value for the autocomplete component. Just pass an array of the values</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
         <tr>
            <td>disableFilter</td>
            <td>boolean</td>
            <td>disables filtering when set to true</td>
            <td>false</td>
        </tr>
        <tr>
            <td>emphasize</td>
            <td>boolean | SystemStyleObject</td>
            <td>Highlight matching characters in suggestions, you can pass the styles - false</td>
            <td>false</td>
        </tr>
        <tr>
            <td>defaultEmptyStateProps</td>
            <td>FlexProps</td>
            <td>Props to pass into the `Flex` component when using the default empty state.  Does not apply when you supply your own custom `emptyState`</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>emptyState</td>
            <td>

```ts
boolean | MaybeRenderProp<{ value: Item["value"] }>
```

</td>
            <td>render message when no suggestions match query</td>
            <td>true</td>
        </tr>
        <tr>
            <td>filter</td>
            <td>

```ts
(query: string, optionValue: Item["value"], optionLabel: Item["label"]) =>
  boolean;
```

</td>
            <td>custom filter function</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>focusInputOnSelect</td>
            <td>boolean</td>
            <td>focus input after a suggestion is selected </td>
            <td>true</td>
        </tr>
        <tr>
            <td>freeSolo</td>
            <td>boolean</td>
            <td>allow entering of any arbitrary values</td>
            <td>false</td>
        </tr>
        <tr>
            <td>isReadOnly</td>
            <td>boolean</td>
            <td>Make the component read-only</td>
            <td>false</td>
        </tr>
        <tr>
            <td>isLoading</td>
            <td>boolean</td>
            <td>Display loading animation on both the input and list elements</td>
            <td>false</td>
        </tr>
        <tr>
            <td>isPortalled</td>
            <td>boolean</td>
            <td>Determines if the popover content should be rendered in a <a href="https://chakra-ui.com/docs/components/portal">Portal</a>. Set to false to render content in DOM hierarchy.<br /><br />Useful when rendering inside of a Dialog</td>
            <td>true</td>
        </tr>
         <tr>
            <td>listAllValuesOnFocus</td>
            <td>boolean</td>
            <td>Show all suggestions when user focuses the input, while it's not empty.</td>
            <td>false</td>
        </tr>
         <tr>
            <td>matchWidth</td>
            <td>boolean</td>
            <td>Chakra UI <a href="https://chakra-ui.com/docs/components/popover#same-width">Popover.positioning.sameWidth</a> property to match the popover content's width to the width of the container</td>
            <td>true</td>
        </tr>
        <tr>
            <td>maxSelections</td>
            <td>number</td>
            <td>limit possible number of tag selections in multiple mode</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>maxSuggestions</td>
            <td>number</td>
            <td>limit number of suggestions in list</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>multiple</td>
            <td>boolean</td>
            <td>allow tags multi selection</td>
            <td>false</td>
        </tr>
        <tr>
            <td>onChange</td>
            <td>

```ts
(value: string | Item["value"][], item: Item| Item[]) => void
```

</td>
            <td>function to run whenever autocomplete value(s) changes</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>onSelectOption</td>
            <td>

```ts
(params: {
    item: Item;
    selectMethod: "mouse" | "keyboard" | null;
    isNewInput: boolean;
  }) => boolean | void
```
</td>
            <td>method to call whenever a suggestion is selected</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>onOptionFocus</td>
            <td>

```ts
(params: {
    item: Item;
    focusMethod: "mouse" | "keyboard" | null;
    isNewInput: boolean;
  }) => boolean | void
```

</td>
            <td>method to call whenever a suggestion is focused</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>onReady</td>
            <td>

```ts
(props:{tags:ItemTag[]}) => void
```
</td>
            <td>method that exposes variables used in component</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>onTagRemoved</td>
            <td>

```ts
(removedTag: Item["value"],item: Item, tags: Item["value"][]) => void
```
</td>
            <td>method to call whenever a tag is removed</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>openOnFocus</td>
            <td>boolean</td>
            <td>open suggestions when input is focuses</td>
            <td>false</td>
        </tr>
        <tr>
            <td>placement</td>
            <td>PlacementWithLogical</td>
            <td>where autocomplete list will display.  Accepts any valid value from <a href="https://chakra-ui.com/docs/components/popover#placement">Popover</a> component</td>
            <td>bottom</td>
        </tr>
        <tr>
          <td>restoreOnBlurIfEmpty</td>
          <td>boolean</td>
          <td>if false, clearing the value of the input field will also clear the selected option</td>
          <td>true</td>
        </tr>
        <tr>
            <td>rollNavigation</td>
            <td>boolean</td>
            <td>allow keyboard navigation to switch to alternate ends when one end is reached</td>
            <td>false</td>
        </tr>
        <tr>
            <td>selectOnFocus</td>
            <td>boolean</td>
            <td>select the text in input when it's focused</td>
            <td>false</td>
        </tr>
        <tr>
            <td>shouldRenderSuggestions</td>
            <td>

```ts
(value: string) => boolean
```
</td>
            <td>function to decide if suggestions should render, e.g. show suggestions only if there are at least two characters in the query value</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
        <tr>
            <td>submitKeys;
</td>
            <td>

```ts
string[]
```

</td>
            <td>A list of <a href="https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values">KeyboardEvent: key values</a>, except for the "Enter" key, that trigger the click event of the currently selected Item.</td>
            <td>&mdash;&mdash;&mdash;</td>
        </tr>
         <tr>
            <td>suggestWhenEmpty</td>
            <td>boolean</td>
            <td>show suggestions when input value is empty</td>
            <td>false</td>
        </tr>
        <tr>
            <td>value</td>
            <td>any</td>
            <td>value of the component in the controlled state</td>
            <td>---</td>
        </tr>
    </tbody>
</table>

### **AutoCompleteTag**

Tags for multiple mode

**AutoCompleteTag** composes [**Tag**](https://chakra-ui.com/docs/components/tag) so you can pass all Tag props to change its style.

<table>
<thead>
  <tr>
    <th>Prop<br></th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
</thead>
<tbody>
 <tr>
    <td>disabled</td>
    <td>

    string

  </td>
    <td>In the event that you need to lock certain tag so that they can't be removed in the interface, you can set the tags disabled.</td>
    <td>No<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>
  <tr>
    <td>label</td>
    <td>

    string

  </td>
    <td>Label that is displayed on the tag</td>
    <td>Yes<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>
  <tr>
    <td>onRemove</td>
    <td>

```ts
() => void
```

  </td>
    <td>Method to remove the tag from selected values</td>
    <td>Yes<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>

</tbody>
</table>

### **AutoCompleteInput**

Input for `AutoComplete` value.

**AutoCompleteInput** composes [**Input**](https://chakra-ui.com/docs/components/input) so you can pass all Input props to change its style.

<table>
<thead>
  <tr>
    <th>Prop<br></th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>children</td>
    <td>

```ts
type children = MaybeRenderProp<{
  tags: Item & { onRemove: () => void }[];
}>;
```

  </td>
    <td>

callback that returns `ReactNode` and is provided with tags in `multiple` mode
e.g.

```js
<AutoCompleteInput variant="subtle">
  {({ tags }) =>
    tags.map((tag, tid) => (
      <AutoCompleteTag key={tid} label={tag.label} onRemove={tag.onRemove} />
    ))
  }
</AutoCompleteInput>
```

  </td>
    <td>No<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>

  <tr>
    <td>ref</td>
    <td>

```js
RefObject<HTMLInputElement>
```

  </td>
    <td>provides a ref to the input element so the value can be referenced in additional contexts</td>
    <td>No<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>
  <tr>
    <td>hidePlaceholder</td>
    <td>boolean</td>
    <td>hides the placeholder when children is not an empty array. intended usage for

```js
<AutoComplete multiple creatable />
```

  </td>
    <td>No<br></td>
    <td>false</td>

  </tr>
  <tr>
    <td>loadingIcon</td>
    <td>

    React.ReactNode | JSX

  </td>
  <td>Element that will be displayed when isLoading is true</td>
  <td>No</td>
  <td><a href="https://chakra-ui.com/docs/components/spinner">Spinner</a> from Chakra-UI</td>
  </tr>

</tbody>
</table>

### **AutoCompleteList**

Wrapper for `AutoCompleteGroup` and `AutoCompleteItem`

**AutoCompleteList** composes [**Box**](https://chakra-ui.com/docs/components/box) so you can pass all Box props to change its style.

<table>
<thead>
  <tr>
    <th>Prop<br></th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>loadingState</td>
    <td>React.ReactNode | JSX</td>
    <td>Content displayed in list while isLoading is true.  Content will be centered</td>
    <td>No</td>
    <td><a href="https://chakra-ui.com/docs/components/spinner">Spinner</a> from Chakra-UI with an md size</td>
  </tr>
</tbody>
</table>

### **AutoCompleteGroup**

Wrapper for collections of `AutoCompleteItem`s

**AutoCompleteGroup** composes [**Box**](https://chakra-ui.com/docs/components/box) so you can pass all Box props to change its style.

<Table>
<thead>
  <tr>
    <th>Prop<br></th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>showDivider</td>
    <td>boolean</td>
    <td>If true, a divider is shown</td>
    <td>No</td>
    <td>false</td>
  </tr>

  <tr>
    <td>dividerColor</td>
    <td>string</td>
    <td>Color for divider, if present</td>
    <td>No</td>
    <td>inherit</td>
  </tr>
</tbody>

</table>

### **AutoCompleteItem**

This Composes your suggestions

**AutoCompleteItem** composes [**Flex**](https://chakra-ui.com/docs/components/flex) so you can pass all Flex props to change its style.

<table>
<thead>
  <tr>
    <th>Prop<br></th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>getValue</td>
    <td>(value:any) => any</td>
    <td>A method used to determine the key that holds the value, when the value prop is an object</td>
    <td>no<br></td>
    <td>

```js
val => val;
```

</td>
  </tr>
  <tr>
    <td>label</td>
    <td>string</td>
    <td>The label for the Option</td>
    <td>no<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>
  <tr>
    <td>value</td>
    <td>string or Object</td>
    <td>The value of the Option</td>
    <td>yes<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>
  <tr>
    <td>fixed</td>
    <td>

    boolean

</td>
    <td>Make an item visible at all times, regardless of filtering or maxSuggestions</td>
    <td>No</td>
    <td>&mdash;&mdash;&mdash;</td>
</tr>
<tr>
    <td>_fixed</td>
    <td>SystemStyleObject</td>
    <td>Styles for fixed Itemm</td>
    <td>No</td>
    <td>

```js
{
  fontWeight: 'extrabold',
}
```

</td>
</tr>
<tr>
    <td>value</td>
    <td>string</td>
    <td>The value of the Option</td>
    <td>yes<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>
  <tr>
    <td>disabled</td>
    <td>

    boolean

</td>
    <td>Make an item disabled, so it cannot be selected</td>
    <td>No</td>
    <td>&mdash;&mdash;&mdash;</td>
</tr>
<tr>
    <td>_disabled</td>
    <td>SystemStyleObject</td>
    <td>Styles for disabled Item(s)</td>
    <td>No</td>
    <td>

```js
{
  fontWeight: 'extrabold',
}
```

</td>
</tr>
<tr>
    <td>_selected</td>
    <td>SystemStyleObject</td>
    <td>Styles for selected Item(s)</td>
    <td>No</td>
    <td>

```js
{
  fontWeight: 'extrabold',
}
```

</td>
</tr>
<tr>
    <td>_focus</td>
    <td>SystemStyleObject</td>
    <td>Styles for focused Item</td>
    <td>No</td>
    <td>

```js
{
  fontWeight: 'extrabold',
}
```

</td>
</tr>
</tbody>
</table>

### **AutoCompleteCreatable**

Used with the `AutoComplete` component's `creatable` prop, to allow users enter arbitrary values, not available in the provided options.

**AutoCompleteCreatable** composes [**Flex**](https://chakra-ui.com/docs/components/flex) so you can pass all Flex props to change its style.

It also accepts a function as its `children` prop which is provided with the current `inputValue`.

<table>
<thead>
  <tr>
    <th>Prop<br></th>
    <th>Type</th>
    <th>Description</th>
    <th>Required</th>
    <th>Default</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>children</td>
    <td>

```ts
type children = MaybeRenderProp<{ value: any }>;
```

  </td>
    <td>

`ReactNode` or callback that returns `ReactNode`
e.g.

```js
<AutoCompleteCreatable>
  {({ value }) => <span>Add {value} to List</span>}
</AutoCompleteCreatable>
```

  </td>
    <td>No<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>

  <tr>
    <td>alwaysDisplay</td>
    <td>

```ts
boolean;
```

  </td>
    <td>

When true, `AutoCompleteCreatable` is shown even when the `AutoCompleteInput` is empty

  </td>
    <td>No<br></td>
    <td>&mdash;&mdash;&mdash;</td>
  </tr>

</tbody>
</table>

## Contribute

- Clone this repository

```sh
git clone https://github.com/anubra266/choc-autocomplete.git
```

- Install all dependencies (with yarn)

```sh
yarn
```

- Install package example dependencies (with yarn)

```sh
cd example
yarn
```

Start the package server, and the example server

```sh
# root directory
yarn start

# example directory with (cd example)
yarn dev
```

## Sponsors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<p align="center">
  <a href="https://patreon.com/anubra266?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator&utm_content=join_link">
    <img src='https://cdn.jsdelivr.net/gh/anubra266/static@main/sponsors.svg'/>
  </a>
</p>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://anubra266.tk"><img src="https://avatars.githubusercontent.com/u/30869823?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maicon Carraro</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=anubra266" title="Code">💻</a></td>
    <td align="center"><a href="http://margalit.com.au"><img src="https://avatars.githubusercontent.com/u/2268424?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sam Margalit</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=margalit" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/gepd"><img src="https://avatars.githubusercontent.com/u/7091609?v=4?s=100" width="100px;" alt=""/><br /><sub><b>gepd</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=gepd" title="Code">💻</a> <a href="https://github.com/anubra266/choc-autocomplete/issues?q=author%3Agepd" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/spencerkaiser"><img src="https://avatars.githubusercontent.com/u/6445731?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Spencer Kaiser</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=SpencerKaiser" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jcdogo"><img src="https://avatars.githubusercontent.com/u/70533701?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jcdogo</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=jcdogo" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/daliudzius"><img src="https://avatars.githubusercontent.com/u/46355846?v=4?s=100" width="100px;" alt=""/><br /><sub><b>daliudzius</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=daliudzius" title="Code">💻</a></td>
    <td align="center"><a href="https://fabien0102.com"><img src="https://avatars.githubusercontent.com/u/1761469?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Fabien BERNARD</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=fabien0102" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://riccardolorenzi.com/"><img src="https://avatars.githubusercontent.com/u/5848941?v=4" width="100px;" alt=""/><br /><sub><b>Riccardo Lorenzi</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=Richi2293" title="Bug fixes">🐛</a></td>
    <td align="center"><a href="https://github.com/MathisFederico"><img src="https://avatars.githubusercontent.com/u/60117466?v=4" width="100px;" alt=""/><br /><sub><b>Mathis Federico</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=MathisFederico" title="Bug">🐛</a></td>
    <td align="center"><a href="https://github.com/Kysluss"><img src="https://avatars.githubusercontent.com/u/29052043?v=4" width="100px;" alt=""/><br /><sub><b>Kyle Slusser</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=Kysluss" title="Code">💻🐛</a></td>
    <td align="center"><a href="https://github.com/sakerhetspolisen"><img src="https://avatars.githubusercontent.com/u/68159964?v=4" width="100px;" alt=""/><br /><sub><b>Karl F. Sellergren</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=sakerhetspolisen" title="Code">🐛🔧</a></td>
    <td align="center"><a href="https://github.com/JedBh"><img src="https://avatars.githubusercontent.com/u/44101778?v=4" width="100px;" alt=""/><br /><sub><b>Jedediah Benhod</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=jedBh" title="Code">🐛</a></td>
    <td align="center"><a href="https://github.com/Janekk"><img src="https://avatars.githubusercontent.com/u/6827881?v=4" width="100px;" alt=""/><br /><sub><b>Janusz Kacalak</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=janekk" title="Code">🐛</a></td>
    <td align="center"><a href="https://github.com/ThomasHickman"><img src="https://avatars.githubusercontent.com/u/6304200?v=4" width="100px;" alt=""/><br /><sub><b>Thomas Hickman</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=thomashickman" title="Bug">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/chrisregner"><img src="https://avatars.githubusercontent.com/u/26005158?v=4" width="100px;" alt=""/><br /><sub><b>Christopher Regner</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=chrisregner" title="Code">📖🐛</a></td>
    <td align="center"><a href="https://github.com/EinarSnorrason"><img src="https://avatars.githubusercontent.com/u/31321506?v=4" width="100px;" alt=""/><br /><sub><b>EinarSnorrason</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=EinarSnorrason" title="Code">💻🐛🔧</a></td>
    <td align="center"><a href="https://github.com/gbermudez1992"><img src="https://avatars.githubusercontent.com/u/84212735?v=4" width="100px;" alt=""/><br /><sub><b>gbermudez1992</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=gbermudez1992" title="Code">💻🐛🔧</a></td>
    <td align="center"><a href="https://github.com/ido213"><img src="https://avatars.githubusercontent.com/u/163876909?v=4" width="100px;" alt=""/><br /><sub><b>ido213</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=ido213" title="Code">💻🐛🔧</a></td>
    <td align="center"><a href="https://github.com/aeons"><img src="https://avatars.githubusercontent.com/u/1432894?v=4" width="100px;" alt=""/><br /><sub><b>Bjørn Madsen</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=aeons" title="Code">🐛</a></td>
    <td align="center"><a href="https://github.com/SupremeTechnopriest"><img src="https://avatars.githubusercontent.com/u/2261598?v=4" width="100px;" alt=""/><br /><sub><b>Randy Lebeau</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=SupremeTechnopriest" title="Code">🐛</a></td>
    <td align="center"><a href="https://github.com/jayveebustarde"><img src="https://avatars.githubusercontent.com/u/26862076?v=4" width="100px;" alt=""/><br /><sub><b>Jayvee Bustarde</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=jayveebustarde" title="Code">🐛🔧</a></td>
  </tr>
  <tr>
  <td align="center"><a href="https://github.com/zanctor"><img src="https://avatars.githubusercontent.com/u/11874442?v=4" width="100px;" alt=""/><br /><sub><b>Ihor Zinchenko</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=zanctor" title="Code">🐛🔧</a></td>
  <td align="center"><a href="https://github.com/bwalendz"><img src="https://avatars.githubusercontent.com/u/6239158?v=4" width="100px;" alt=""/><br /><sub><b>Brian Walendzinski</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=bwalendz" title="Code">🐛🔧</a></td>
  <td align="center"><a href="https://github.com/NoFr1ends"><img src="https://avatars.githubusercontent.com/u/6075580?v=4" width="100px;" alt=""/><br /><sub><b>Lynx</b></sub></a><br /><a href="https://github.com/anubra266/choc-autocomplete/commits?author=NoFr1ends" title="Code">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
