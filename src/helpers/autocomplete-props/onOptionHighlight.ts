import { useEffect } from 'react';
import { runIfFn } from '@chakra-ui/utils';
import { useAutoCompleteContext } from '../../store';
import { Item } from '../../store/reducers/item';

export const useOnOptionHighlight = (activeItem: Item) => {
  const {
    state: {
      autocomplete: { onOptionHighlight },
    },
  } = useAutoCompleteContext();
  useEffect(() => {
    runIfFn(onOptionHighlight, activeItem?.value);
  }, [activeItem]);
};
