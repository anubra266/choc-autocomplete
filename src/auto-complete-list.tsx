import { Stack, StackProps, useColorModeValue } from '@chakra-ui/react';
import React, { FunctionComponent, useEffect } from 'react';
import { useStoreActions } from './store/hooks';

interface AutoCompleteList extends StackProps {}

export const AutoCompleteList: FunctionComponent<AutoCompleteList> = props => {
  const bg = useColorModeValue('#ffffff', '#232934');
  const { children, ...rest } = props;

  const { set: setOptions, setFilteredOptions } = useStoreActions(
    actions => actions.options
  );

  useEffect(() => {
    const optionValues: any[] = [];

    React.Children.map(children, (child: any) => {
      if (child.type.displayName === 'AutoCompleteItem') {
        optionValues.push(getChildProps(child));
      } else {
        return child.props.children?.map((option: any) => {
          if (option.type.displayName === 'AutoCompleteItem') {
            optionValues.push(getChildProps(option));
          } else {
            return;
          }
        });
      }
    });
    setOptions(optionValues);
    // TODO remove this after styling
    setFilteredOptions(optionValues);
  }, []);

  return (
    <Stack
      mt="4"
      py="4"
      bg={bg}
      shadow="base"
      rounded="md"
      spacing="1"
      {...rest}
    >
      {React.Children.map(children, (child: any) => {
        if (child.type.displayName === 'AutoCompleteItem') {
          return React.cloneElement(child, { optionKey: child.key });
        }
        return child;
      })}
    </Stack>
  );
};

const getChildProps = (child: any) => ({
  key: child.key,
  value: child.props.value,
});
