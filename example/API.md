
## AutoComplete

- onChange &mdash; function that provides current Input value and is called anytime, suggestion is selected- useful for uncontrolled Input, but wants to use Value
- highlightFirstOption &mdash; boolean - if first option should be highlighted by default -- false
- focusInputOnSelect &mdash; boolean - if Input should be focused after Select -- true
- onSelectOption &mdash; - Will be called every time suggestion is selected via mouse or keyboard. (optionValue, selectMethod:'click'|'keyboard')=>void

## AutoCompleteInput
    
- rollNavigation &mdash; if keyboardnavigation should roll after getting to either ends. default &mdash; false 
- onChange &mdash; in Controlled formit's a function that returns, the event and the value - required(no)