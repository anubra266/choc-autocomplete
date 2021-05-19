import { ActionMap, State } from '..';

export enum InputAction {
  Set = 'SET_INPUT_VALUE',
}

type InputPayload = {
  [InputAction.Set]: string;
};

export type InputActions = ActionMap<InputPayload>[keyof ActionMap<
  InputPayload
>];

export const inputReducer = (state: State['input'], action: InputActions) => {
  switch (action.type) {
    case InputAction.Set:
      return { ...state, value: action.payload };

    default:
      return state;
  }
};
