import React, { useContext, useEffect } from 'react';
import { State, StoreContext, StoreDispatch } from '../store';
import { InputAction } from '../store/reducers/input';
import { ItemAction } from '../store/reducers/item';
import { runOnSelect } from './autocomplete-props/onSelectOption';
import { closeList } from './list';

export const useOptionsFilter = () => {
  const {
    state: {
      autocomplete: { creatable },
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

  //? Update input state if there's a defaultValue for input
  useEffect(() => {
    if (input.ref?.current) {
      const rawInputValue = input.ref?.current?.value;
      if (inputValue.trim().length < 1 && rawInputValue.trim().length > 0) {
        dispatch({ type: InputAction.Set, payload: rawInputValue });
      }
    }
  }, [input.ref]);

  useEffect(() => {
    const filterPayload = creatable
      ? [...filteredItems, creatable && { key: 'newInput', value: inputValue }]
      : filteredItems;
    dispatch({ type: ItemAction.SetFiltered, payload: filterPayload });
    dispatch({ type: ItemAction.ResetActive, payload: false });
  }, [inputValue, options]);
};

export const handleNavigation = (
  e: React.KeyboardEvent<HTMLInputElement>,
  state: State,
  dispatch: StoreDispatch
) => {
  const {
    autocomplete: { rollNavigation },
    item,
  } = state;

  if (e.key === 'Enter') {
    runOnSelect(state, dispatch, 'keyboard');
  } else if (e.key === 'ArrowUp') {
    if (item.active === 0) {
      if (rollNavigation)
        dispatch({ type: ItemAction.ResetActive, payload: true });
      e.preventDefault();
      return;
    }
    dispatch({ type: ItemAction.Set, payload: item.active - 1 });
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (item.active === item.filtered.length - 1) {
      if (rollNavigation)
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
    closeList(state, dispatch);
    e.preventDefault();
  }
};
