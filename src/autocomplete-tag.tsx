import { WrapItem } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel, TagProps } from "@chakra-ui/tag";
import { runIfFn } from "@chakra-ui/utils";
import React from "react";

type AutoCompleteTagProps = {
  label: string;
  onRemove?: () => void;
} & TagProps;

export function AutoCompleteTag(props: AutoCompleteTagProps) {
  const { label, onRemove, ...rest } = props;

  return (
    <WrapItem>
      <Tag borderRadius="md" fontWeight="normal" {...rest}>
        <TagLabel>{label}</TagLabel>
        <TagCloseButton onClick={() => runIfFn(onRemove)} cursor="pointer" />
      </Tag>
    </WrapItem>
  );
}
