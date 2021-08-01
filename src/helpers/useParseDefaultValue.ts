import { isArray } from "@chakra-ui/utils";

import { AutoCompleteProps } from "../autocomplete";

export const useParseDefaultValue = (
  defaultValue: AutoCompleteProps["defaultValue"],
  multiple: AutoCompleteProps["multiple"]
): any[] => {
  if (multiple) {
    if (isArray(defaultValue)) return defaultValue;
    else {
      console.warn(
        "`defaultValue` should be an array when `multiple` prop is applied"
      );
      return [];
    }
  }
  if (isArray(defaultValue)) {
    console.warn(
      "`defaultValue` cannot be an array when `multiple` prop is not applied"
    );
    return [];
  }
  return [defaultValue];
};
