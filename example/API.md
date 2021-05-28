

## Autocomplete

children - Can be a function that provides `isOpen`,`onClose`, `inputIsEmpty`, `resetInput`

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
onSelectOption - Will be called every time suggestion is selected via mouse or keyboard. It returns the selectedValue, theselectionMethod and a boolean specifying if the input is a new one; useFul when combined creatable mode. Return false to prevent selecting the option.
suggestWhenEmpty -  If the suggestions shoud show when the input is Empty. - It is used when the input is focused.
closeOnBlur - If true, the menu will close when the AutoComplete Component loses focus.


closeOnselect - //TODO to be added when close on blur is working If true, the menu will close when an item is selected, by mouse or keyboard.

## Item

value:string;
_focus?:CSSObject - styles for focused Item

## Group

title?: string;
titleStyles?: TextProps;
showDivider?: boolean;
dividerColor?: string;
