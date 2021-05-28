import { useContext, useEffect } from 'react';
import { runIfFn } from '@chakra-ui/utils';
import { StoreContext } from '../../store';
import { Item } from '../../store/reducers/item';

export const useOnOptionHighlight = (activeItem: Item) => {
  const {
    state: {
      autocomplete: { onOptionHighlight },
    },
  } = useContext(StoreContext);
  useEffect(() => {
    runIfFn(onOptionHighlight, activeItem?.value);
  }, [activeItem]);
};
