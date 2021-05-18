export { AutoComplete } from './auto-complete-provider';
export { AutoCompleteInput } from './auto-complete-input';
export { AutoCompleteList } from './auto-complete-list';
export { AutoCompleteItem } from './auto-complete-item';
// export { AutoCompleteGroup } from './auto-complete-group';
// export { AutoCompleteTags } from './auto-complete-tags';

//TODO in-Input tags will be inserted by user as leftElement in AutoCompleteInputGroup. It will clone the input and pass a `tagPadding` prop that will be added in the component. Any further padding from user prop will be added to the `tagPadding`

//TODO add topOffset prop to the List, when it is not a number, greater than zero, the bottomBorderRadius of the Input should be zero, and the list's borderTOpRadius should be zero
