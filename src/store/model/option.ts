import {
  action,
  Action,
  actionOn,
  ActionOn,
  Computed,
  computed,
} from 'easy-peasy';
import { StoreModel } from '.';

export interface Item {
  key: string;
  value: string;
}

export interface OptionModel {
  items: Item[];
  filteredOptions: Computed<OptionModel, Item[], StoreModel>;
  set: Action<OptionModel, Item[]>;
  active: number;
  setActive: Action<OptionModel, number>;
  activeOption: Computed<OptionModel, () => Item>;
  activeKey: Computed<OptionModel, () => string>;
  setActiveKey: Action<OptionModel, string>;
  resetActive: Action<OptionModel, true | void>;
  onValueChanged: ActionOn<OptionModel, StoreModel>;
}

export const optionModel: OptionModel = {
  items: [],
  filteredOptions: computed(
    [state => state.items, (_, storeState) => storeState.input.value],
    (options, inputValue) =>
      options.filter(
        item => item.value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
      )
  ),
  set: action((state, payload) => {
    state.items = payload;
  }),
  active: -1,
  setActive: action((state, payload) => {
    state.active = payload;
  }),
  activeOption: computed(state => () => state.filteredOptions[state.active]),
  activeKey: computed(state => () => state.activeOption()?.key),
  setActiveKey: action((state, payload) => {
    state.active = state.filteredOptions.findIndex(
      ({ key }) => key === payload
    );
  }),
  resetActive: action((state, payload) => {
    state.active = payload ? state.filteredOptions.length - 1 : 0;
  }),
  onValueChanged: actionOn(
    (_, storeActions) => storeActions.input.setValue,
    state => {
      state.active = 0;
    }
  ),
};
