import { AutoComplete, autoCompleteModel } from './autocomplete';
import { inputModel, InputModel } from './input';
import { listModel, ListModel } from './list';
import { optionModel, OptionModel } from './option';

export interface StoreModel {
  options: OptionModel;
  list: ListModel;
  input: InputModel;
  autocomplete: AutoComplete;
}

const model: StoreModel = {
  options: optionModel,
  list: listModel,
  input: inputModel,
  autocomplete: autoCompleteModel,
};

export default model;
