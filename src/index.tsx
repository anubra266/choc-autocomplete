export {
  AutoComplete,
  ChildrenProps as AutoCompleteChildProps,
} from './auto-complete-provider';
export * from './auto-complete-input';
export * from './auto-complete-list';
export * from './auto-complete-item';
export * from './auto-complete-fixed-item';
export * from './auto-complete-group';
// export { AutoCompleteTags } from './auto-complete-tags';

//TODO in-Input tags will be inserted by user as leftElement in AutoCompleteInputGroup. It will clone the input and pass a `tagPadding` prop that will be added in the component. Any further padding from user prop will be added to the `tagPadding`

//TODO add topOffset prop to the List, when it is not a number, greater than zero, the bottomBorderRadius of the Input should be zero, and the list's borderTOpRadius should be zero

//TODO for tag selection,the menu item can have a component named Item Select, it would expose the `selected` state for user to decide how it looks in that state. Default is Checkbox
//TODO from the above, the menuList can have an `all` and `selected` tab to view the respective options
