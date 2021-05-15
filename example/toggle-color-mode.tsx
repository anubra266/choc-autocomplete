import {
  FormControl,
  FormControlProps,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

const ToggleColorMode = (props: FormControlProps) => {
  const { colorMode: cm, toggleColorMode } = useColorMode();
  const modeTextColor = useColorModeValue('text.tertiary', 'gray.300');
  return (
    <FormControl
      display="flex"
      alignItems="center"
      color={modeTextColor}
      w="fit-content"
      {...props}
    >
      <FormLabel
        htmlFor="color-mode-switch"
        mb="0"
        fontWeight="semibold"
        textTransform="capitalize"
      >
        Dark Mode
      </FormLabel>
      <Switch
        id="color-mode-switch"
        colorScheme="brand"
        isChecked={cm === 'dark'}
        onChange={toggleColorMode}
      />
    </FormControl>
  );
};

export default ToggleColorMode;
