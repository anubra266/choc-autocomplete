import { runIfFn } from "./utils";
import React, { memo } from "react";
import { Tag, TagProps } from "./components/ui/tag";

type AutoCompleteTagProps = {
  disabled?: boolean;
  label: string;
  onRemove?: () => void;
} & TagProps;

export const AutoCompleteTag = memo((props: AutoCompleteTagProps) => {
  const { label, onRemove, disabled, ...rest } = props;

  return (
      <Tag
        borderRadius="md"
        fontWeight="normal"
        closable
        onClose={() => !disabled && runIfFn(onRemove)}
        {...(disabled && disabledStyles)}
        {...rest}
      >
        {label}
      </Tag>
  );
});

const disabledStyles: TagProps = {
  cursor: "text",
  userSelect: "none",
  opacity: 0.4,
  _focus: { boxShadow: "none" },
};
