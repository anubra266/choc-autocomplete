import {
  Box,
  BoxProps,
  Divider,
  DividerProps,
  Flex,
  FlexProps,
  forwardRef,
} from "@chakra-ui/react";
import { __DEV__ } from "@chakra-ui/utils";
import React from "react";
import { useAutoCompleteContext } from "./autocomplete-context";

export interface AutoCompleteGroupProps extends BoxProps {
  children?: React.ReactNode;
  showDivider?: boolean;
  dividerColor?: string;
}

// TODO show nothing when group is empty

export const AutoCompleteGroup = forwardRef<AutoCompleteGroupProps, "div">(
  (props, ref) => {
    const { children, showDivider, ...rest } = props;
    const { getGroupProps } = useAutoCompleteContext();

    const { group } = getGroupProps(props);

    const dividerStyles = useDividerStyles(props);

    return (
      <Box ref={ref} {...group} {...rest}>
        <Divider {...dividerStyles.top} />
        {children}
        <Divider {...dividerStyles.bottom} />
      </Box>
    );
  }
);

export const AutoCompleteGroupTitle = forwardRef<FlexProps, "div">(
  (props, ref) => {
    return <Flex {...props} {...baseTitleStyles} ref={ref} />;
  }
);

if (__DEV__) {
  AutoCompleteGroup.displayName = "AutoCompleteGroup";
  AutoCompleteGroupTitle.displayName = "AutoCompleteGroupTitle";
}

const baseTitleStyles: FlexProps = {
  ml: 5,
  my: 1,
  fontSize: "xs",
  letterSpacing: "wider",
  fontWeight: "extrabold",
  textTransform: "uppercase",
};

const useDividerStyles = (props: AutoCompleteGroupProps) => {
  const { getGroupProps } = useAutoCompleteContext();

  const {
    divider: { hasFirstChild, hasLastChild },
  } = getGroupProps(props);

  const baseStyles: DividerProps = {
    my: 2,
    borderColor: props.dividerColor,
  };

  const top = {
    ...baseStyles,
    mb: 4,
    display: !props.showDivider || hasFirstChild ? "none" : "",
  };
  const bottom = {
    ...baseStyles,
    display: !props.showDivider || hasLastChild ? "none" : "",
  };

  return { top, bottom };
};
