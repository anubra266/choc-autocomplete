import {
  Box,
  BoxProps,
  Flex,
  FlexProps,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { FunctionComponent, useEffect } from 'react';
import { useStoreActions, useStoreState } from './store/hooks';

interface AutoCompleteList extends BoxProps {
  rollNavigation?: boolean;
}

export const AutoCompleteList: FunctionComponent<AutoCompleteList> = props => {
  const bg = useColorModeValue('#ffffff', '#232934');

  const { children, rollNavigation, ...rest } = props;

  const filteredOptions = useStoreState(state => state.options.filteredOptions);
  const inputValue = useStoreState(state => state.input.value);
  const shouldRenderSuggestions = useStoreState(
    state => state.autocomplete.shouldRenderSuggestions
  );
  const isVisible = useStoreState(state => state.autocomplete.isVisible);
  const renderEmpty = useStoreState(state => state.autocomplete.renderEmpty);

  const visibleStyles: BoxProps = {
    opacity: 1,
    visibility: 'visible',
  };

  const { set: setOptions } = useStoreActions(actions => actions.options);
  const { setRollNavigation } = useStoreActions(({ list }) => list);

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
    setRollNavigation(rollNavigation);
  }, []);

  const isValidSuggestion = (child: any) =>
    filteredOptions.findIndex(i => i.key === child.key) > -1;

  const shouldRender = shouldRenderSuggestions
    ? shouldRenderSuggestions(inputValue) !== false
    : true;

  const emptyStyles: FlexProps = {
    justify: 'center',
    align: 'center',
    fontSize: 'sm',
    fontStyle: 'italic',
    fontWeight: 'bold',
  };

  return (
    <Box
      mt="4"
      py="4"
      bg={bg}
      shadow="base"
      rounded="md"
      spacing="1"
      maxH="400px"
      overflowY="auto"
      {...rest}
      pos="absolute"
      w="full"
      zIndex="popover"
      opacity="0"
      visibility="hidden"
      transition=".3s ease"
      {...(isVisible && shouldRender && visibleStyles)}
    >
      {React.Children.map(children, (child: any) => {
        if (child.type.displayName === 'AutoCompleteItem') {
          return React.cloneElement(child, { optionKey: child.key });
        }
        if (child.type.displayName === 'AutoCompleteGroup') {
          return child.props.children.every(
            (groupChild: any) => !isValidSuggestion(groupChild)
          )
            ? null
            : child;
        }
        return child;
      })}
      {filteredOptions.length < 1 && (
        <Flex {...renderEmpty} {...(renderEmpty === undefined && emptyStyles)}>
          No options found!
        </Flex>
      )}
    </Box>
  );
};

const getChildProps = (child: any) => ({
  key: child.key,
  value: child.props.value,
});
