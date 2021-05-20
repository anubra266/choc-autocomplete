import { ActionMap, State } from '..';

export enum ListAction {
  Show = 'SHOW_LIST',
  Hide = 'HIDE_LIST',
}

type ListPayload = {
  [ListAction.Show]: undefined;
  [ListAction.Hide]: undefined;
};

export type ListActions = ActionMap<ListPayload>[keyof ActionMap<ListPayload>];

export const listReducer = (state: State['list'], action: ListActions) => {
  switch (action.type) {
    case ListAction.Show:
      return { ...state, visible: true };

    case ListAction.Hide:
      return { ...state, visible: false };

    default:
      return state;
  }
};
