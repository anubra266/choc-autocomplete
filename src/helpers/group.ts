import { isDefined } from "@chakra-ui/utils";
import { getChildDeep } from "react-nanny";
import { ReactNode } from "react";

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
    getChildDeep(
      children,
      (child: any) =>
        filteredList.findIndex(i => i.value === child.props?.value) >= 0
    )
  );
};
