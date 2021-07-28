export const getMultipleWrapStyles = (themeInput: any) => ({
  ...themeInput.field,
  _focusWithin: themeInput.field._focus,
  pos: "relative",
  minH: 9,
  h: "auto",
  w: 80,
  px: 3,
  py: 2,
  spacing: 3,
  cursor: "text",
});
