import {
  Box,
  Flex,
  Stack,
  StackProps,
  Text,
  TextProps,
} from '@chakra-ui/react';
import React from 'react';
import { useStoreState } from './store/hooks';

interface AutoCompleteGroup extends StackProps {
  title: string;
  titleStyles?: TextProps;
  showDivider?: boolean;
  dividerColor?: string;
}

export const AutoCompleteGroup = (props: AutoCompleteGroup) => {
  const {
    title,
    titleStyles,
    children,
    showDivider,
    dividerColor,
    ...rest
  } = props;
  const filteredOptions = useStoreState(state => state.options.filteredOptions);

  const containsFirstResult = React.Children.map(
    children,
    child => child.key === filteredOptions[0].key
  ).includes(true);

  return (
    <>
      {!containsFirstResult && (
        <Flex
          border="0"
          borderBottom="solid 1px"
          borderColor={dividerColor || 'inherit'}
          my="0.5rem"
          opacity="0.6"
        />
      )}
      <Stack spacing="1" {...rest}>
        <Text
          fontSize="xs"
          textTransform="uppercase"
          fontWeight="extrabold"
          letterSpacing="wider"
          ml="5"
          {...titleStyles}
        >
          {title}
        </Text>
        <Box spacing="1">
          {React.Children.map(children, (child: any) => {
            if (child.type.displayName === 'AutoCompleteItem') {
              return React.cloneElement(child, { optionKey: child.key });
            }
            return child;
          })}
        </Box>
      </Stack>
    </>
  );
};

AutoCompleteGroup.displayName = 'AutoCompleteGroup';
