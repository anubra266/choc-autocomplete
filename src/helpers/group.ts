import { isDefined, runIfFn } from "@chakra-ui/utils";
import { getChildDeep } from "react-nanny";
import { ReactNode } from "react";
import { getDefItemValue } from "./items";

export const hasFirstItem = (children: ReactNode, firstItem: any) => {
  const result = getChildDeep(
    children,
    (child: any) =>
      child?.type?.displayName === "AutoCompleteItem" &&
      child.props.value === firstItem?.value
  );

  return result;
};
export const hasLastItem = (children: ReactNode, lastItem: any) => {
  const result = getChildDeep(
    children,
    (child: any) =>
      child?.type?.displayName === "AutoCompleteItem" &&
      child.props.value === lastItem?.value
  );
  return result;
};

export const hasChildren = (children: any, filteredList: any[]) => {
  return isDefined(
    getChildDeep(children, (child: any) => {
      const value = runIfFn(
        child.props?.getValue || getDefItemValue,
        child.props?.value || {}
      );
      return filteredList.some(i => i.value === value);
    })
  );
};
