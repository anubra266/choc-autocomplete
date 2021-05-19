import {
  Box,
  Flex,
  FlexProps,
  Stack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/layout';
import React from 'react';

interface AutoCompleteGroup extends StackProps {
  children?: any;
  title?: string;
  titleStyles?: TextProps;
  showDivider?: boolean;
  dividerColor?: string;
}

export const AutoCompleteGroup = (props: AutoCompleteGroup) => {
  const {
    title,
    titleStyles: customTitleStyles,
    children,
    showDivider,
    dividerColor,
    ...rest
  } = props;

  return (
    <>
      {showDivider && (
        <Flex {...baseDividerStyles} borderColor={dividerColor || 'inherit'} />
      )}
      <Stack spacing="1" {...rest}>
        {title && (
          <Text {...baseTitleStyles} {...customTitleStyles}>
            {title}
          </Text>
        )}
        <Box>{children}</Box>
      </Stack>
    </>
  );
};

AutoCompleteGroup.displayName = 'AutoCompleteGroup';

const baseDividerStyles: FlexProps = {
  border: '0',
  my: '0.5rem',
  opacity: '0.6',
  borderBottom: 'solid 1px',
};

const baseTitleStyles: TextProps = {
  ml: '5',
  fontSize: 'xs',
  letterSpacing: 'wider',
  fontWeight: 'extrabold',
  textTransform: 'uppercase',
};
