import { action, Action } from 'easy-peasy';

export interface InputModel {
  value: string;
  set: Action<InputModel, InputModel['value']>;
}

export const inputModel: InputModel = {
  value: '',
  set: action((state, payload) => {
    state.value = payload;
  }),
};
