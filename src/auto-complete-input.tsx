import { Input, InputProps, useMergeRefs } from '@chakra-ui/react';
import React from 'react';

interface AutoCompleteInput extends InputProps {}

export const AutoCompleteInput = React.forwardRef<
  HTMLInputElement,
  AutoCompleteInput
>((props, ref) => {
  const { onChange = () => {}, ...rest } = props;

  const inputRef = useMergeRefs(ref);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return <Input onChange={handleChange} ref={inputRef} {...rest} />;
});
