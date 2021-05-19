import { ActionMap, State } from '..';

export enum ItemAction {
  Set = 'SET_ACTIVE_ITEM',
  SetAll = 'SET_ITEMS',
}

type ItemPayload = {
  [ItemAction.Set]: number;
  [ItemAction.SetAll]: string[];
};

export type ItemActions = ActionMap<ItemPayload>[keyof ActionMap<ItemPayload>];

export const itemReducer = (state: State['item'], action: ItemActions) => {
  switch (action.type) {
    case ItemAction.Set:
      return { ...state, active: action.payload };

    case ItemAction.SetAll:
      return { ...state, list: action.payload };

    default:
      return state;
  }
};
