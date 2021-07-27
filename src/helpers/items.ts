import { getChildrenDeep } from "react-nanny";
import { pick } from "@chakra-ui/utils";
import { ReactNode } from "react";
import { FlexProps } from "@chakra-ui/react";
import { Item } from "../autocomplete-item";
import { fuzzyScore } from "./fuzzySearch";

export const getItemList = (children: ReactNode) => {
  const itemChildren = getChildrenDeep(
    children,
    (child: any) => child?.type?.displayName === "AutoCompleteItem"
  );

  return itemChildren.map(item => {
    return pick(item.props, ["value", "fixed"]);
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
  return fuzzyScore(query, itemValue) >= 0.5 || itemValue.indexOf(query) >= 0;
};
