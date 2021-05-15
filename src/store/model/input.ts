import { action, Action } from 'easy-peasy';

export interface InputModel {
  value: string;
  setValue: Action<InputModel, InputModel['value']>;
  ref: any;
  setRef: Action<InputModel, any>;
}

export const inputModel: InputModel = {
  value: '',
  setValue: action((state, payload) => {
    state.value = payload;
  }),
  ref: null,
  setRef: action((state, payload) => {
    state.ref = payload;
  }),
};
