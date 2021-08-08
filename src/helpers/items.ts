import { getChildrenDeep } from "react-nanny";
import { pick, isEmpty } from "@chakra-ui/utils";
import { ReactNode } from "react";
import { FlexProps } from "@chakra-ui/react";
import { fuzzyScore } from "./fuzzySearch";
import { Item } from "../types";

export const setEmphasis = (children: any, query: string) => {
  if (typeof children !== "string" || isEmpty(query)) {
    return children;
  }
  const newChildren = children
    .toString()
    .replace(
      new RegExp(escapeRegex(query), "gi"),
      (match: any) => `<mark>${match}</mark>`
    );
  return newChildren;
};

export const getItemList = (children: ReactNode) => {
  const itemChildren = getChildrenDeep(
    children,
    (child: any) => child?.type?.displayName === "AutoCompleteItem"
  );

  return itemChildren.map(item => {
    return pick(item.props, ["value", "label", "fixed", "disabled"]);
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
  itemValue: Item["value"],
  itemLabel: Item["label"]
) => {
  return (
    itemValue?.toLowerCase().indexOf(query?.toLowerCase()) >= 0 ||
    itemLabel?.toLowerCase().indexOf(query?.toLowerCase()) >= 0 ||
    fuzzyScore(query, itemValue) >= 0.5 ||
    fuzzyScore(query, itemLabel) >= 0.5
  );
};

function escapeRegex(string: string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
