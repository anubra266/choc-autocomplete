export const getMultipleWrapStyles = (themeInput: any, multiple?: boolean) => ({
  ...(multiple && {
    ...themeInput.field,
    _focusWithin: themeInput.field._focus,
    pos: "relative",
    minH: 9,
    // px: 3,
    py: 1.5,
    spacing: 3,
  }),
  cursor: "text",
  h: "fit-content",
  // w: "full",
});
