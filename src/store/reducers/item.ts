import { ActionMap, State } from '..';

export interface Item {
  key: string;
  value: string;
  fixed?: boolean;
}

export enum ItemAction {
  Set = 'SET_ACTIVE_ITEM',
  SetAll = 'SET_ITEMS',
  SetWithKey = 'SET_ACTIVE_ITEM_WITH_KEY',
  SetFiltered = 'SET_FILTERED_ITEMS',
  ResetActive = 'RESET_ACTIVE_ITEM',
  AddFixedRef = 'ADD_FIXED_ITEM_REF',
}

type ItemPayload = {
  [ItemAction.Set]: State['item']['active'];
  [ItemAction.SetAll]: State['item']['list'];
  [ItemAction.SetWithKey]: string;
  [ItemAction.SetFiltered]: State['item']['filtered'];
  [ItemAction.ResetActive]: boolean;
  [ItemAction.AddFixedRef]: {
    key: string;
    ref: React.RefObject<HTMLDivElement>;
  };
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

    case ItemAction.ResetActive:
      return {
        ...state,
        active: action.payload ? state.filtered.length - 1 : 0,
      };

    case ItemAction.AddFixedRef:
      return {
        ...state,
        fixed: { ...state.fixed, [action.payload.key]: action.payload.ref },
      };

    default:
      return state;
  }
};
