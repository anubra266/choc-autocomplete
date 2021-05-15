import { optionModel, OptionModel } from './option';

export interface StoreModel {
  options: OptionModel;
}

const model: StoreModel = {
  options: optionModel,
};

export default model;
