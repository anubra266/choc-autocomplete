import { Box, BoxProps, Flex, FlexProps } from "@chakra-ui/layout";
import React from "react";
import { useAutoCompleteContext } from "../autocomplete-context";

export const EmptyState = (props: BoxProps) => {
  const { getEmptyStateProps } = useAutoCompleteContext();

  const emptyState = getEmptyStateProps(
    <Flex {...emptyStyles}>No options found!</Flex>
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
