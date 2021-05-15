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
  setActive: Action<OptionModel, number>;
  setActiveKey: Action<OptionModel, string>;
  resetActive: Action<OptionModel, true | void>;
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
  active: -1,
  setActive: action((state, payload) => {
    state.active = payload;
  }),
  setActiveKey: action((state, payload) => {
    state.active = state.filteredOptions.findIndex(
      ({ key }) => key === payload
    );
  }),
  resetActive: action((state, payload) => {
    state.active = payload ? state.filteredOptions.length - 1 : 0;
  }),
  activeKey: computed(state => state.filteredOptions[state.active]?.key),
};
