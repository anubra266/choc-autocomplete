import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useStoreActions, useStoreState } from './store/hooks';

interface AutoCompleteItem extends FlexProps {
  value: string;
  _focus?: FlexProps;
  optionKey?: any;
}

export const AutoCompleteItem = (props: AutoCompleteItem) => {
  const { value, optionKey, _focus, ...rest } = props;

  const { setActiveKey } = useStoreActions(({ options }) => options);
  const { activeKey: activeOption } = useStoreState(({ options }) => options);
  const isActive = activeOption === optionKey;

  const activeStyles: FlexProps = _focus || {
    bg: useColorModeValue('gray.200', 'whiteAlpha.100'),
  };
  const { setValue } = useStoreActions(actions => actions.input);
  const { ref } = useStoreState(state => state.input);
  const { focusInputOnSelect, onSelectOption } = useStoreState(
    state => state.autocomplete
  );

  const setOption = (e: MouseEvent) => {
    setValue(value);
    ref.current.onChange({ ...e, target: { ...e.target, value: value } });
    if (focusInputOnSelect) ref.current.focus();
    onSelectOption(value, 'click');
  };

  return (
    <Flex
      mx="2"
      px="2"
      py="2"
      rounded="md"
      cursor="pointer"
      onMouseOver={() => setActiveKey(optionKey)}
      {...(isActive && activeStyles)}
      {...rest}
      onClick={setOption}
    />
  );
};

AutoCompleteItem.displayName = 'AutoCompleteItem';
