
## AutoComplete - extends BoxProps

- onChange &mdash; function that provides current Input value and is called anytime, suggestion is selected- useful for uncontrolled Input, but wants to use Value  - (value:string)=>void gives array for tags, autocomplete
- highlightFirstOption &mdash; boolean - if first option should be highlighted by default -- false
- focusInputOnSelect &mdash; boolean - if Input should be focused after Select -- true
- onSelectOption &mdash; - Will be called every time suggestion is selected via mouse or keyboard. (optionValue, selectMethod:'click'|'keyboard')=>void
- onOptionHighlight &mdash; Will be called every time the highlighted option changes. (optionValue)=>void
- closeOnSelect - If true, the menu will close when an item is selected, by mouse or keyboard - default(true)
- shouldRenderSuggestions &mdash; By default, suggestions are rendered when the input isn't blank. Feel free to override this behaviour. This function gets the current value of the input. - (value:string)=>void

    ```js 
    function shouldRenderSuggestions(value) {
    return value.trim().length > 2;
    }
    ```
- suggestWhenEmpty &mdash; If the suggestions shoud show when the input is Empty. - It is used when the input is focused. default(false)

## AutoCompleteList

- rollNavigation &mdash; if keyboardnavigation should roll after getting to either ends. default &mdash; false 

## AutoCompleteInput
    
- onChange &mdash; in Controlled formit's a function that returns, the event and the value - required(no)

## AutoCompleteGroup

- showDivider &mdash; if divider should be shown
- dividerColor &mdash; color for divider

## AutoCompleteItem

- _focus prop overrides the styling for highlighted suggestions