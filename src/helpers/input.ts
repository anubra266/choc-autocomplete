import React, { useContext, useEffect } from 'react';
import { State, StoreContext } from '../store';
import { ItemAction, ItemActions } from '../store/reducers/item';
import {
  AutoCompleteAction,
  AutoCompleteActions,
} from '../store/reducers/autocomplete';
import { InputAction, InputActions } from '../store/reducers/input';
import { returnT } from '../utils/operations';
import { ListAction, ListActions } from '../store/reducers/list';

export const useOptionsFilter = () => {
  const {
    state: {
      autocomplete: { creatable, freeSolo },
      input,
      item,
    },
    dispatch,
  } = useContext(StoreContext);
  const inputValue = input.value;
  const options = item.list;
  const filteredItems = options.filter(
    i => i.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
  const rawInputValue = input.ref?.current?.value;

  useEffect(() => {
    const filterPayload = creatable
      ? [...filteredItems, creatable && { key: 'newInput', value: inputValue }]
      : filteredItems;
    dispatch({ type: ItemAction.SetFiltered, payload: filterPayload });
    dispatch({ type: ItemAction.ResetActive, payload: false });
  }, [inputValue, options]);

  useEffect(() => {
    if (rawInputValue !== undefined) {
      dispatch({ type: InputAction.Set, payload: rawInputValue });
      if (freeSolo)
        dispatch({ type: AutoCompleteAction.Set, payload: rawInputValue });
    }
  }, [rawInputValue]);
};

export const handleNavigation = (
  e: React.KeyboardEvent<HTMLInputElement>,
  state: State,
  dispatch: React.Dispatch<
    AutoCompleteActions | InputActions | ItemActions | ListActions
  >,
  inputRef: React.RefObject<HTMLInputElement>
) => {
  const { autocomplete, item } = state;
  const activeItem = item.filtered[item.active];

  if (e.key === 'Enter') {
    dispatch({ type: InputAction.Set, payload: activeItem.value });
    dispatch({ type: AutoCompleteAction.Set, payload: activeItem.value });
    returnT(inputRef.current).value = activeItem.value;
    dispatch({ type: ListAction.Hide });
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
  } else if (e.key === 'Escape') {
    dispatch({ type: ListAction.Hide });
    e.preventDefault();
  }
};
