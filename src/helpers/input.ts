import React, { useContext, useEffect } from 'react';
import { State, StoreContext } from '../store';
import { ItemAction, ItemActions } from '../store/reducers/item';
import {
  AutoCompleteAction,
  AutoCompleteActions,
} from '../store/reducers/autocomplete';
import { InputAction, InputActions } from '../store/reducers/input';
import { returnT } from '../utils/operations';

export const useOptionsFilter = () => {
  const { state, dispatch } = useContext(StoreContext);
  const inputValue = state.input.value;
  const options = state.item.list;
  const filteredItems = options.filter(
    item => item.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

  useEffect(() => {
    dispatch({ type: ItemAction.SetFiltered, payload: filteredItems });
    dispatch({ type: ItemAction.ResetActive, payload: false });
  }, [inputValue, options]);
};

export const handleNavigation = (
  e: React.KeyboardEvent<HTMLInputElement>,
  state: State,
  dispatch: React.Dispatch<AutoCompleteActions | InputActions | ItemActions>,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  const { autocomplete, item } = state;
  const activeItem = item.filtered[item.active];

  if (e.key === 'Enter') {
    dispatch({ type: InputAction.Set, payload: activeItem.value });
    dispatch({ type: AutoCompleteAction.Set, payload: activeItem.value });
    returnT(inputRef.current).value = activeItem.value;
  } else if (e.key === 'ArrowUp') {
    if (item.active === 0) {
      if (autocomplete.rollNavigation)
        dispatch({ type: ItemAction.ResetActive, payload: true });
      e.preventDefault();
      return;
    }
    dispatch({ type: ItemAction.Set, payload: item.active - 1 });
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (item.active === item.filtered.length - 1) {
      if (autocomplete.rollNavigation)
        dispatch({ type: ItemAction.ResetActive, payload: false });
      return;
    }
    dispatch({ type: ItemAction.Set, payload: item.active + 1 });
  } else if (e.key === 'Home') {
    dispatch({ type: ItemAction.ResetActive, payload: false });
    e.preventDefault();
  } else if (e.key === 'End') {
    dispatch({ type: ItemAction.ResetActive, payload: true });
    e.preventDefault();
  }
};
