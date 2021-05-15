import { Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useStoreActions, useStoreState } from './store/hooks';

type AutoCompleteInput = InputProps;

export const AutoCompleteInput = React.forwardRef<
  HTMLInputElement,
  AutoCompleteInput
>((props, ref) => {
  const { value, onChange, defaultValue, ...rest } = props;

  const internalRef = useRef<any>();
  const focusRef = useRef<any>();
  const inputRef = useMergeRefs(internalRef, focusRef, ref);
  useImperativeHandle(internalRef, () => ({
    onChange,
    focus: () => {
      focusRef.current.focus();
    },
  }));

  const { setValue, setRef } = useStoreActions(actions => actions.input);
  const { value: autoCompleteValue } = useStoreState(({ input }) => input);
  const { resetActive, setActive } = useStoreActions(({ options }) => options);
  const { onSelectOption } = useStoreState(state => state.autocomplete);

  const isControlled = value !== undefined;

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
    if (isControlled && onChange === undefined)
      console.error('Controlled Input should have `onChange` prop.');
    setRef(internalRef);
  }, []);

  const inputValue = isControlled ? value : autoCompleteValue;

  useEffect(() => {
    resetActive();
  }, [inputValue]);

  const { active: activeIndex, activeOption, filteredOptions } = useStoreState(
    ({ options }) => options
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    isControlled && onChange(e);
  };

  const { rollNavigation } = useStoreState(({ list }) => list);
  const handleKeyboardNavigation = (e: KeyboardEvent) => {
    const activeValue = activeOption?.value;
    if (e.key === 'Enter') {
      setValue(activeValue);
      isControlled &&
        onChange({ ...e, target: { ...e.target, value: activeValue } });
      onSelectOption(activeValue, 'keyboard');
    } else if (e.key === 'ArrowUp') {
      if (activeIndex === 0) {
        if (rollNavigation) resetActive(true);
        e.preventDefault();
        return;
      }
      setActive(activeIndex - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowDown') {
      if (activeIndex === filteredOptions.length - 1) {
        if (rollNavigation) resetActive();
        return;
      }
      setActive(activeIndex + 1);
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      ref={inputRef}
      onKeyDown={handleKeyboardNavigation}
      {...rest}
    />
  );
});
