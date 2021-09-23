import { isDefined } from "@chakra-ui/utils";
import { AutoCompleteGroupProps } from "../autocomplete-group";
import { Item } from "../types";

export const hasFirstItem = (
  props: AutoCompleteGroupProps,
  firstItem: Item
) => {
  return (
    isDefined(firstItem?.groupId) &&
    isDefined(props.id) &&
    firstItem?.groupId === props.id
  );
};
export const hasLastItem = (props: AutoCompleteGroupProps, lastItem: Item) => {
  return (
    isDefined(lastItem?.groupId) &&
    isDefined(props.id) &&
    lastItem?.groupId === props.id
  );
};

export const hasChildren = (
  props: AutoCompleteGroupProps,
  filteredList: Item[]
) => {
  return filteredList.some(item => {
    return (
      isDefined(item.groupId) &&
      isDefined(props.id) &&
      item.groupId === props.id
    );
  });
};
