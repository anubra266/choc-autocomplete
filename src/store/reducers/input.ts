import { ActionMap, State } from '..';

export enum InputAction {
  Set = 'SET_INPUT_VALUE',
  SetRef = 'SET_INPUT_REF',
}

type InputPayload = {
  [InputAction.Set]: State['input']['value'];
  [InputAction.SetRef]: State['input']['ref'];
};

export type InputActions = ActionMap<InputPayload>[keyof ActionMap<
  InputPayload
>];

export const inputReducer = (state: State['input'], action: InputActions) => {
  switch (action.type) {
    case InputAction.Set:
      return { ...state, value: action.payload };

    case InputAction.SetRef:
      return { ...state, ref: action.payload };

    default:
      return state;
  }
};
