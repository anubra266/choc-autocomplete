import { ActionMap, State } from '..';

export interface Item {
  key: string;
  value: string;
}

export enum ItemAction {
  Set = 'SET_ACTIVE_ITEM',
  SetAll = 'SET_ITEMS',
  SetWithKey = 'SET_ACTIVE_ITEM_WITH_KEY',
  SetFiltered = 'SET_FILTERED_ITEMS',
}

type ItemPayload = {
  [ItemAction.Set]: number;
  [ItemAction.SetAll]: Item[];
  [ItemAction.SetWithKey]: string;
  [ItemAction.SetFiltered]: Item[];
};

export type ItemActions = ActionMap<ItemPayload>[keyof ActionMap<ItemPayload>];

export const itemReducer = (state: State['item'], action: ItemActions) => {
  switch (action.type) {
    case ItemAction.Set:
      return { ...state, active: action.payload };

    case ItemAction.SetAll:
      return { ...state, list: action.payload };

    case ItemAction.SetWithKey:
      const itemIndex = state.filtered.findIndex(i => i.key === action.payload);
      return { ...state, active: itemIndex };

    case ItemAction.SetFiltered:
      return { ...state, filtered: action.payload };
    default:
      return state;
  }
};
