import { action, Action } from 'easy-peasy';

type AutoCompletePropKey = keyof AutoCompleteProps;

type AutoCompleteProp = Partial<Record<AutoCompletePropKey, any>>;

interface AutoCompleteProps {
  focusInputOnSelect: boolean | undefined;
  onSelectOption: any;
  onOptionHighlight: any;
}

export interface AutoComplete extends AutoCompleteProps {
  setAutoCompleteState: Action<AutoComplete, AutoCompleteProp>;
}

export const autoCompleteModel: AutoComplete = {
  focusInputOnSelect: true,
  onSelectOption: null,
  onOptionHighlight: null,
  setAutoCompleteState: action((state, payload: any) => {
    const key = Object.keys(payload)[0];
    const value: any = payload[key];
    state[key as AutoCompletePropKey] = value;
  }),
};
