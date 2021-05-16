import { action, Action } from 'easy-peasy';

type AutoCompletePropKey = keyof AutoCompleteProps;

type AutoCompleteProp = Partial<Record<AutoCompletePropKey, any>>;

interface AutoCompleteProps {
  focusInputOnSelect: boolean;
  onSelectOption: any;
  onOptionHighlight: any;
  shouldRenderSuggestions: any;
  suggestWhenEmpty: boolean;
  closeOnSelect: boolean;
  closeOnBlur: boolean;
}

export interface AutoComplete extends AutoCompleteProps {
  setAutoCompleteState: Action<AutoComplete, AutoCompleteProp>;
  isVisible: boolean;
  setIsVisible: Action<AutoComplete, boolean>;
}

export const autoCompleteModel: AutoComplete = {
  focusInputOnSelect: true,
  onSelectOption: null,
  onOptionHighlight: null,
  shouldRenderSuggestions: null,
  suggestWhenEmpty: false,
  closeOnSelect: true,
  closeOnBlur: true,
  setAutoCompleteState: action((state, payload: any) => {
    const key = Object.keys(payload)[0];
    const value: any = payload[key];
    if (value !== undefined) {
      state[key as AutoCompletePropKey] = value;
    }
  }),
  isVisible: false,
  setIsVisible: action((state, payload) => {
    state.isVisible = payload;
  }),
};
