import { Input, InputProps } from '@chakra-ui/react';
import React from 'react';

type AutoCompleteInput = InputProps;

export const AutoCompleteInput = React.forwardRef<
  HTMLInputElement,
  AutoCompleteInput
>((props, ref) => {
  const { value, onChange, ...rest } = props;
  return <Input value={value} onChange={onChange} ref={ref} {...rest} />;
});
