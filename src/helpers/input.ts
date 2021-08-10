export const getMultipleWrapStyles = (themeInput: any, multiple?: boolean) => ({
  ...(multiple && {
    cursor: "text",
    ...themeInput.field,
    _focusWithin: themeInput.field._focus,
    pos: "relative",
    minH: 9,
    // px: 3,
    py: 1.5,
    spacing: 3,
  }),
  h: "fit-content",
  w: "fit-content",
});
