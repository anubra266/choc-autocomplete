import { getChildrenDeep } from "react-nanny";
import { pick, isEmpty } from "@chakra-ui/utils";
import { ReactNode } from "react";
import { FlexProps } from "@chakra-ui/react";
import { Item } from "../autocomplete-item";
import { fuzzyScore } from "./fuzzySearch";

export const setEmphasis = (children: any, query: string) => {
  if (typeof children !== "string" || isEmpty(query)) {
    return children;
  }
  const newChildren = children
    .toString()
    .replace(new RegExp(query, "gi"), (match: any) => `<mark>${match}</mark>`);
  return newChildren;
};

export const getItemList = (children: ReactNode) => {
  const itemChildren = getChildrenDeep(
    children,
    (child: any) => child?.type?.displayName === "AutoCompleteItem"
  );

  return itemChildren.map(item => {
    return pick(item.props, ["value", "fixed", "disabled"]);
  });
};

export const getFocusedStyles = (): FlexProps => {
  return {
    bg: "whiteAlpha.100",
    _light: {
      bg: "gray.200",
    },
  };
};

export const defaultFilterMethod = (
  query: string,
  itemValue: Item["value"]
) => {
  return (
    itemValue?.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
    fuzzyScore(query, itemValue) >= 0.5
  );
};
