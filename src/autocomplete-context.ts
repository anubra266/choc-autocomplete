import * as React from "react";
import { UseAutoCompleteReturn } from "./types";

export const [AutoCompleteProvider, useAutoCompleteContext] = createContext<
  UseAutoCompleteReturn
>();

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export function createContext<ContextType>() {
  const Context = React.createContext<ContextType | undefined>(undefined);

  Context.displayName = "AutoCompleteContext";

  function useContext() {
    const context = React.useContext(Context);
    const errorMessage =
      "useAutoCompleteContext: `context` is undefined. Seems you forgot to wrap all autoomplete components within `<AutoComplete />`";

    if (!context) {
      const error = new Error(errorMessage);
      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);
      throw error;
    }

    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<
    ContextType
  >;
}
