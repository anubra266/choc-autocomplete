import { Stack, StackProps, Text } from '@chakra-ui/react';
import React from 'react';

interface AutoCompleteGroup extends StackProps {
  title: string;
}

export const AutoCompleteGroup = (props: AutoCompleteGroup) => {
  const { title, children, ...rest } = props;
  return (
    <Stack spacing="1" {...rest}>
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="extrabold"
        letterSpacing="wider"
        ml="5"
      >
        {title}
      </Text>
      <Stack spacing="1">
        {React.Children.map(children, (child: any) => {
          return React.cloneElement(child, { optionKey: child.key });
        })}
      </Stack>
    </Stack>
  );
};
