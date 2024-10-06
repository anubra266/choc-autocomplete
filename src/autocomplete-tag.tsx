import { WrapItem } from "@chakra-ui/layout";
import { Tag, TagCloseButton, TagLabel, TagProps } from "@chakra-ui/tag";
import { runIfFn } from "./utils";
import React, { memo } from "react";

type AutoCompleteTagProps = {
  disabled?: boolean;
  label: string;
  onRemove?: () => void;
} & TagProps;

export const AutoCompleteTag = memo((props: AutoCompleteTagProps) => {
  const { label, onRemove, disabled, ...rest } = props;

  return (
    <WrapItem>
      <Tag
        borderRadius="md"
        fontWeight="normal"
        {...(disabled && disabledStyles)}
        {...rest}
      >
        <TagLabel>{label}</TagLabel>
        <TagCloseButton
          onClick={() => !disabled && runIfFn(onRemove)}
          cursor="pointer"
          {...(disabled && disabledStyles)}
        />
      </Tag>
    </WrapItem>
  );
});

const disabledStyles: TagProps = {
  cursor: "text",
  userSelect: "none",
  opacity: 0.4,
  _focus: { boxShadow: "none" },
};
