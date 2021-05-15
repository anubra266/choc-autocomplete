import { action, Action } from 'easy-peasy';

export interface ListModel {
  rollNavigation: boolean | undefined;
  setRollNavigation: Action<ListModel, ListModel['rollNavigation']>;
}

export const listModel: ListModel = {
  rollNavigation: false,
  setRollNavigation: action((state, payload) => {
    state.rollNavigation = payload;
  }),
};
