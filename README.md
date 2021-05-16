<div align="center">
  <h1>
    <br/>
    🥵
    <br />
    @choc-ui/autocomplete
    <br />
    <br />
  </h1>
  <sup>
    <br />
    <br />
    <a href="https://www.npmjs.com/package/@choc-ui/autocomplete?style=for-the-badge">
       <img src="https://img.shields.io/npm/v/@choc-ui/autocomplete.svg?style=for-the-badge" alt="npm package" />
    </a>
    <a href="https://www.npmjs.com/package/@choc-ui/autocomplete?style=for-the-badge">
      <img src="https://img.shields.io/npm/dw/@choc-ui/autocomplete.svg?style=for-the-badge" alt="npm  downloads" />
    </a>
<a>
    <img alt="NPM" src="https://img.shields.io/npm/l/@choc-ui/autocomplete?style=for-the-badge">
</a>

<a><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/anubra266/choc-autocomplete?logo=github&style=for-the-badge">

</a>
    <br />
    AutoComplete Component for the <a href="https://chakra-ui.com">Chakra UI</a> Library.</em>
    
  </sup>
  <br />
  <br />
  <br />
  <br />
  <pre>npm i <a href="https://www.npmjs.com/package/@choc-ui/autocomplete">@choc-ui/autocomplete</a></pre>
  <br />
  <br />
  <br />
  <br />
  <br />
</div>

## Install

```bash
npm i --save @choc-ui/autocomplete
#or
yarn add @choc-ui/autocomplete
```

## Usage

### Basic Usage

```js
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/autocomplete';

export default () => {
  const options = ['apple', 'appoint', 'zap', 'cap', 'japan'];

  return (
    <AutoComplete highlightFirstOption>
      <AutoCompleteInput
        variant="filled"
        placeholder="Search..."
        defaultValue="ap"
        autoFocus
      />
      <AutoCompleteList rollNavigation>
        {options.map((option, oid) => (
          <AutoCompleteItem
            key={`option-${oid}`}
            value={option}
            textTransform="capitalize"
          >
            {option}
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};
```

![](example/images/basic.jpg)

### Creating Groups

> You can create groups with the `AutoCompleteGroup` Component

```js
import {
  AutoComplete,
  AutoCompleteGroup,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/autocomplete';

export default () => {
  const fruits = ['Apple', 'Grape', 'Pawpaw'];
  const countries = ['Korea', 'Nigeria', 'India'];

  return (
    <AutoComplete highlightFirstOption>
      <AutoCompleteInput
        variant="filled"
        placeholder="Search..."
        pl="10"
        defaultValue="ap"
        autoFocus
      />
      <AutoCompleteList rollNavigation>
        <AutoCompleteGroup title="Fruits" showDivider>
          {fruits.map((option, oid) => (
            <AutoCompleteItem
              key={`fruits-${oid}`}
              value={option}
              textTransform="capitalize"
            >
              {option}
            </AutoCompleteItem>
          ))}
        </AutoCompleteGroup>
        <AutoCompleteGroup title="countries" showDivider>
          {countries.map((option, oid) => (
            <AutoCompleteItem
              key={`countries-${oid}`}
              value={option}
              textTransform="capitalize"
            >
              {option}
            </AutoCompleteItem>
          ))}
        </AutoCompleteGroup>
      </AutoCompleteList>
    </AutoComplete>
  );
};
```

![](example/images/group.jpg)

## Custom Rendering

> You can Render whatever you want. The `AutoComplete` Items are regular `Chakra` Boxes.

```js
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/autocomplete';
import { Avatar, Box, Text } from '@chakra-ui/react';

export default () => {
  const people = [
    { name: 'Dan Abramov', image: 'https://bit.ly/dan-abramov' },
    { name: 'Kent Dodds', image: 'https://bit.ly/kent-c-dodds' },
    { name: 'Segun Adebayo', image: 'https://bit.ly/sage-adebayo' },
    { name: 'Prosper Otemuyiwa', image: 'https://bit.ly/prosper-baba' },
    { name: 'Ryan Florence', image: 'https://bit.ly/ryan-florence' },
  ];

  return (
    <AutoComplete highlightFirstOption>
      <AutoCompleteInput
        variant="filled"
        placeholder="Search..."
        pl="10"
        defaultValue="ap"
        autoFocus
      />
      <AutoCompleteList rollNavigation>
        {people.map((person, oid) => (
          <AutoCompleteItem
            key={`option-${oid}`}
            value={person.name}
            textTransform="capitalize"
            align="center"
          >
            <Avatar size="sm" name={person.name} src={person.image} />
            <Text ml="4">{person.name}</Text>
          </AutoCompleteItem>
        ))}
      </AutoCompleteList>
    </AutoComplete>
  );
};
```

![](example/images/render.jpg)

## API Reference

### **AutoComplete**

Wrapper and Provider for `AutoCompleteInput` and `AutoCompleteList`

**AutoComplete** composes [**Box**](https://chakra-ui.com/docs/layout/box) so you can pass all Box props to change its style.

---

`onChange`

---

**Description**

> Function that provides current Input value and is called anytime, suggestion is selected- useful for uncontrolled Input, but wants to use Value

**Type**

```ts
(value: string) => void
```

**Default**

`null`

**Required**

No

---

`onSelectOption`

---

**Description**

> Will be called every time suggestion is selected via mouse or keyboard.

**Type**

```ts
(optionValue: string, selectMethod: 'click'|'keyboard') => void;
```

**Default**

`null`

**Required**

No

---

## `onOptionHighlight`

**Description**

> Will be called every time the highlighted option changes.

**Type**

```ts
(optionValue: string) => void
```

**Default**

`null`

**Required**

No

---

`shouldRenderSuggestions`

---

**Description**

> By default, suggestions are rendered when the input isn't blank. Feel free to override this behaviour. This function gets the current value of the input
> **e.g.**

```ts
function shouldRenderSuggestions(value) {
  return value.trim().length > 2;
}
```

**Type**

```ts
(value: string) => void
```

**Default**

`null`

**Required**

No

---

`highlightFirstOption`

---

**Description**

> Determines if the first option should be highlighted by default

**Type**

```ts
boolean;
```

**Default**

`false`

**Required**

No

---

`focusInputOnSelect`

---

**Description**

> Determines if Input should be focused after Select

**Type**

```ts
boolean;
```

**Default**

`true`

**Required**

No

---

`closeOnSelect`

---

**Description**

> If true, the menu will close when an item is selected, by mouse or keyboard.

**Type**

```ts
boolean;
```

**Default**

`true`

**Required**

No

---

`suggestWhenEmpty`

---

**Description**

> <td>
> If the suggestions shoud show when the input is Empty. - It is used when the input is focused.

**Type**

```ts
boolean;
```

**Default**

`false`

**Required**

No

---

`suggestWhenEmpty`

---

**Description**

> Component to render when no match is found. Pass null, to just close the menu.

**Type**

```ts
ReactNode;
```

**Default**

`null`

**Required**

No

## AutoCompleteInput

Input for `AutoComplete` value.

**AutoComplete** composes [**Input**](https://chakra-ui.com/docs/form/input) so you can pass all Input props to change its style.

-

### **AutoCompleteList**

Wrapper for `AutoCompleteGroup` and `AutoCompleteItem`

**AutoComplete** composes [**Box**](https://chakra-ui.com/docs/layout/box) so you can pass all Box props to change its style.
