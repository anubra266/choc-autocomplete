import { Flex, FlexProps, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useStoreActions, useStoreState } from './store/hooks';
// import ReactHtmlParser from 'react-html-parser';
interface AutoCompleteItem extends FlexProps {
  value: string;
  _focus?: FlexProps;
  optionKey?: any;
}

export const AutoCompleteItem = (props: AutoCompleteItem) => {
  const {
    value,
    optionKey,
    _focus,
    onMouseOver,
    onClick,
    children,
    sx,
    ...rest
  } = props;

  const { setActiveKey } = useStoreActions(({ options }) => options);
  const { activeKey: activeOption, filteredOptions } = useStoreState(
    ({ options }) => options
  );
  const isActive = activeOption() === optionKey;

  const activeStyles: FlexProps = _focus || {
    bg: useColorModeValue('gray.200', 'whiteAlpha.100'),
  };
  const { setValue } = useStoreActions(actions => actions.input);
  const { setIsVisible } = useStoreActions(actions => actions.autocomplete);
  const ref = useStoreState(state => state.input.ref);
  const inputValue = useStoreState(state => state.input.value);

  const {
    focusInputOnSelect,
    onSelectOption,
    closeOnSelect,
    emphasize,
  } = useStoreState(state => state.autocomplete);

  const setOption = (e: MouseEvent) => {
    setValue(value);
    ref.current.onChange &&
      ref.current.onChange({
        ...e,
        target: { ...e.target, value: value },
      });
    if (focusInputOnSelect) ref.current.focus();
    onSelectOption && onSelectOption(value, 'click');
    if (closeOnSelect) setIsVisible(false);
    onClick && onClick(e);
  };

  const handleMouseOver = (e: MouseEvent) => {
    setActiveKey(optionKey);
    onMouseOver && onMouseOver(e);
  };

  const isValidSuggestion =
    filteredOptions.findIndex(o => o.key === optionKey) > -1;

  const emphasizedChildString = value.replace(
    new RegExp(inputValue, 'gi'),
    (match: any) => `<a class="emphasizedResult">${match}</a>`
  );

  const emphasizedChild = (
    <span dangerouslySetInnerHTML={{ __html: emphasizedChildString }} />
  );

  const itemChild = emphasize ? emphasizedChild : children;

  const emphasizeStyles =
    typeof emphasize === 'object'
      ? emphasize
      : {
          fontWeight: 'extrabold',
        };

  return isValidSuggestion ? (
    <Flex
      mx="2"
      px="2"
      py="2"
      rounded="md"
      cursor="pointer"
      onMouseOver={handleMouseOver}
      {...(isActive && activeStyles)}
      children={itemChild}
      onClick={setOption}
      sx={{
        ...sx,
        '.emphasizedResult': emphasizeStyles,
      }}
      {...rest}
    />
  ) : null;
};

AutoCompleteItem.displayName = 'AutoCompleteItem';
