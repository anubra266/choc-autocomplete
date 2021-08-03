import { createContext } from "@chakra-ui/react-utils";
import { UseAutoCompleteReturn } from "./types";

export const [AutoCompleteProvider, useAutoCompleteContext] = createContext<
  UseAutoCompleteReturn
>({
  name: "AutoCompleteContext",
  errorMessage:
    "useAutoCompleteContext: `context` is undefined. Seems you forgot to wrap all autoomplete components within `<AutoComplete />`",
});
