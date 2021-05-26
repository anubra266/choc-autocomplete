---

`Prop`
---**Description**

> Description

**Type**

```ts
boolean;
```

**Default**

`default`

**Required**

No

## Autocomplete

onChange - Callback for when the autocomplete value changes, and when input changes if in `freeSolo` mode - returns the value
emptyState - Component to display when no options are found. set to true to use default
rollNavigation - set to true to allow keyboard navigation to restart on both ends
focusInputOnSelect - Determines if Input should be focused after an option is selected
freeSolo - Set freeSolo to true so the textbox can contain any arbitrary value.
creatable - Allows creation of new Items
selectOnFocus - select the text in input when input is focused
openOnFocus - Open the suggestions once input is focused
emphasize - The parts of the option string that match the `AutoCompleteInput` value are emphasized. Pass boolean to bolden it, or a Chakra `CSSObject` for custom styling.
defaultIsOpen - The suggestions menu is open by default

## Item

value:string;
\_focus:CSSObject - styles for focused Item

## Group

title?: string;
titleStyles?: TextProps;
showDivider?: boolean;
dividerColor?: string;
