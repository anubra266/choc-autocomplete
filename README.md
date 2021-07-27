Changelog

- New multiple prop
- Input can Now be controlled
- Now built on hooks
- Automatic list scroll
- `_fixed` pseudo prop to style fixed items
- Allow custom filter method

```ts
export interface AutoComplete extends Omit<BoxProps, "onChange"> {
  //   children?: MaybeRenderProp<AutoCompleteChildProps>;
  creatable?: boolean | ((props: CreatableProps) => ReactNode);
  // onChange?: (value: string) => void;
  emptyState?: boolean | ReactNode;
  //   rollNavigation?: boolean;
  focusInputOnSelect?: boolean;
  freeSolo?: boolean;
  selectOnFocus?: boolean;
  openOnFocus?: boolean;
  emphasize?: boolean | CSSObject;
  defaultIsOpen?: boolean;
  onSelectOption?: (params: OnSelectOptionParams) => boolean | void;
  onOptionHighlight?: (optionValue: string) => boolean;
  suggestWhenEmpty?: boolean;
  closeOnselect?: boolean;
  closeOnBlur?: boolean;
  shouldRenderSuggestions?: (value: string) => boolean;
  maxSuggestions?: number;
  // multiple: boolean;
}
```
