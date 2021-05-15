import { action, Action, Computed, computed } from 'easy-peasy';

export interface Item {
  key: string;
  value: string;
}

export interface OptionModel {
  items: Item[];
  filteredOptions: Item[];
  set: Action<OptionModel, Item[]>;
  setFilteredOptions: Action<OptionModel, Item[]>;
  active: number;
  setActive: Action<OptionModel, string>;
  resetActive: Action<OptionModel>;
  activeKey: Computed<OptionModel, string>;
}

export const optionModel: OptionModel = {
  items: [],
  filteredOptions: [],
  set: action((state, payload) => {
    state.items = payload;
  }),
  setFilteredOptions: action((state, payload) => {
    state.filteredOptions = payload;
  }),
  active: 0,
  setActive: action((state, payload) => {
    state.active = state.filteredOptions.findIndex(
      ({ key }) => key === payload
    );
  }),
  resetActive: action(state => {
    state.active = 0;
  }),
  activeKey: computed(state => state.filteredOptions[state.active]?.key),
};
