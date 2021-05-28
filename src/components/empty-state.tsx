import { Box, BoxProps, Flex, FlexProps } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { StoreContext } from '../store';

export const EmptyState = (props: BoxProps) => {
  const {
    state: {
      item: { filtered },
      autocomplete: { emptyState },
    },
  } = useContext(StoreContext);

  return (
    <Box {...props}>
      {filtered.length < 1 &&
        emptyState &&
        (typeof emptyState === 'boolean' ? (
          <Flex {...emptyStyles}>No options found!</Flex>
        ) : (
          emptyState
        ))}
    </Box>
  );
};

const emptyStyles: FlexProps = {
  fontSize: 'sm',
  align: 'center',
  justify: 'center',
  fontWeight: 'bold',
  fontStyle: 'italic',
};
