import { ActionMap, State } from '..';

export enum ListAction {
  Show = 'SHOW_LIST',
  Hide = 'HIDE_LIST',
  SetRef = 'SET_LIST_REF',
}

type ListPayload = {
  [ListAction.Show]: undefined;
  [ListAction.Hide]: undefined;
  [ListAction.SetRef]: State['list']['ref'];
};

export type ListActions = ActionMap<ListPayload>[keyof ActionMap<ListPayload>];

export const listReducer = (state: State['list'], action: ListActions) => {
  switch (action.type) {
    case ListAction.Show:
      return { ...state, visible: true };

    case ListAction.Hide:
      return { ...state, visible: false };

    case ListAction.SetRef:
      return { ...state, ref: action.payload };

    default:
      return state;
  }
};
