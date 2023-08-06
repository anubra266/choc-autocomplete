export const getMultipleWrapStyles = (themeInput: any, multiple?: boolean) => {
  const fieldStyles: any = {};
  const inputOverrides: any = {};

  const { field } = themeInput;

  if(field) {
    Object.keys(field)
    .forEach(key => {
      if(key.startsWith("--input") === false)
        fieldStyles[key] = field[key];
      else {
        let value = field[key];
        const cssPropName = key.replace("--input-", "");
        const javascriptCssPropName = cssPropName
          .replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

        if(value.indexOf('.') !== -1) {
          value = value.substring(value.indexOf('.') + 1);
        }

        inputOverrides[javascriptCssPropName] = value;
      }
    });
  }

    return {
    ...(multiple && {
      ...fieldStyles,
      ...inputOverrides, 
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
  };
};
