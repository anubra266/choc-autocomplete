import { useContext, useEffect } from 'react';
import { StoreContext } from '../store';
import { ItemAction } from '../store/reducers/item';

export const useOptionsFilter = () => {
  const { state, dispatch } = useContext(StoreContext);
  const inputValue = state.input.value;
  const options = state.item.list;
  const filteredItems = options.filter(
    item => item.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

  useEffect(() => {
    dispatch({ type: ItemAction.SetFiltered, payload: filteredItems });
    dispatch({ type: ItemAction.ResetActive });
  }, [inputValue, options]);
};
