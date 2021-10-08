import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/layout";
import React from "react";
import { useAutoCompleteContext } from "../autocomplete-context";

export const EmptyState = (props: BoxProps) => {
  const { getEmptyStateProps, emptyStateLabel } = useAutoCompleteContext();

  const emptyState = getEmptyStateProps(
    <Flex {...emptyStyles}>{emptyStateLabel}</Flex>
  );

  return <Box {...props}>{emptyState}</Box>;
};

const emptyStyles: FlexProps = {
  fontSize: "sm",
  align: "center",
  justify: "center",
  fontWeight: "bold",
  fontStyle: "italic",
};
