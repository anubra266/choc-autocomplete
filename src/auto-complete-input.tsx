import { Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { useStoreActions, useStoreState } from './store/hooks';

interface AutoCompleteInput extends InputProps {
  defaultValue: string;
  value: string;
}

export const AutoCompleteInput = React.forwardRef<
  HTMLInputElement,
  AutoCompleteInput
>((props, ref) => {
  const { value, onChange, defaultValue, onKeyDown, onFocus, ...rest } = props;

  const internalRef = useRef<any>();
  const focusRef = useRef<any>();
  const inputRef = useMergeRefs(internalRef, focusRef, ref);
  useImperativeHandle(internalRef, () => ({
    onChange,
    focus: () => {
      focusRef.current.focus();
    },
  }));

  const { setValue, setRef } = useStoreActions(({ input }) => input);
  const autoCompleteValue = useStoreState(state => state.input.value);
  const { resetActive, setActive } = useStoreActions(({ options }) => options);
  const { onSelectOption, suggestWhenEmpty, closeOnSelect } = useStoreState(
    state => state.autocomplete
  );
  const activeIndex = useStoreState(({ options }) => options.active);
  const activeOption = useStoreState(({ options }) => options.activeOption);
  const filteredOptions = useStoreState(
    ({ options }) => options.filteredOptions
  );
  const { setIsVisible } = useStoreActions(({ autocomplete }) => autocomplete);

  const isControlled = value !== undefined;

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
    if (isControlled && onChange === undefined)
      console.error('Controlled Input should have `onChange` prop.');
    setRef(internalRef);
  }, []);

  const inputValue = isControlled ? value : autoCompleteValue;

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    const isEmpty = newValue.trim().length < 1;
    setValue(newValue);
    isControlled && onChange && onChange(e);
    if (!isEmpty || (isEmpty && suggestWhenEmpty)) {
      setIsVisible(true);
    } else setIsVisible(false);
  };

  const handleFocus = (e: any) => {
    const isEmpty = inputValue.trim().length < 1;
    if (!isEmpty || (isEmpty && suggestWhenEmpty)) {
      setIsVisible(true);
    }
    onFocus && onFocus(e);
  };

  const { rollNavigation } = useStoreState(({ list }) => list);
  const handleKeyboardNavigation = (e: any) => {
    const activeValue = activeOption()?.value;
    if (e.key === 'Enter') {
      setValue(activeValue);
      isControlled &&
        onChange &&
        onChange({ ...e, target: { ...e.target, value: activeValue } });
      onSelectOption && onSelectOption(activeValue, 'keyboard');
      if (closeOnSelect) setIsVisible(false);
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
    onKeyDown && onKeyDown(e);
  };

  return (
    <Input
      value={inputValue}
      onChange={handleChange}
      ref={inputRef}
      onKeyDown={handleKeyboardNavigation}
      onFocus={handleFocus}
      {...rest}
    />
  );
});
