import { ActionMap, State } from '..';

export enum AutoCompleteAction {
  Set = 'SET_AUTOCOMPLETE_VALUE',
}

type AutoCompletePayload = {
  [AutoCompleteAction.Set]: State['autocomplete']['value'];
};

export type AutoCompleteActions = ActionMap<
  AutoCompletePayload
>[keyof ActionMap<AutoCompletePayload>];

export const AutoCompleteReducer = (
  state: State['autocomplete'],
  action: AutoCompleteActions
) => {
  switch (action.type) {
    case AutoCompleteAction.Set:
      return { ...state, value: action.payload };

    default:
      return state;
  }
};
