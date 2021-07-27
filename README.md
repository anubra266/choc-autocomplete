Changelog

- Input can Now be controlled
- Now built on hooks
- Automatic list scroll
- `_fixed` pseudo prop to style fixed items

```ts
export interface AutoComplete extends Omit<BoxProps, "onChange"> {
  //   children?: MaybeRenderProp<AutoCompleteChildProps>;
  onChange?: (value: string) => void;
  emptyState?: boolean | ReactNode;
  //   rollNavigation?: boolean;
  focusInputOnSelect?: boolean;
  freeSolo?: boolean;
  creatable?: boolean | ((props: CreatableProps) => ReactNode);
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
}
```
