# v4 Changelog

v4.0.0

- New multiple prop
- New AutoCompleteTag component
- Input can Now be controlled
- Now built on hooks
- Automatic list scroll
- Allow custom filter method
- onChangeProps new provides values array, when it's multiple
- onSelectOption params changed - `click` to `mouse`
- New onOptionFocus method
- New `AutoCompleteGroupTitle` component. `AutoCompleteGroup` no longer takes a title prop.
- `AutoCompleteFixedItem` is not exported, just add `fixed` prop to `AutoCompleteItem`
- `_fixed` pseudo prop to style fixed items
- `emptyState` can now be a function that is provided with the `inputValue`
- new `AutoCompleteCreatable` Component in place of `creatable` prop for easier user customization. It takes a function child that exposes the current value, or just normal children. And it's accepts flexProps
- use `_selected` pseudo prop to apply selected styles to items
- add `disabled` prop to Items which can be styled with `_disabled` pseudo prop 
- `onTagRemoved` method is called when a tag is removed in the `multiple` multi select mode.

v4.1.0
- ✨ Add `maxSelections` prop  9136eba