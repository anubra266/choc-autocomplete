import { isDefined, runIfFn } from '@chakra-ui/utils';
import { State, StoreDispatch } from '../../store';
import { AutoCompleteAction } from '../../store/reducers/autocomplete';
import { InputAction } from '../../store/reducers/input';
import { returnT } from '../../utils/operations';
import { closeList } from '../list';

export type OnSelectOptionParams = {
  optionValue: string;
  selectMethod: 'click' | 'keyboard';
  isNewInput: boolean;
};

export const runOnSelect = (
  state: State,
  dispatch: StoreDispatch,
  selectMethod: OnSelectOptionParams['selectMethod'],
  cb?: Function
) => {
  const {
    autocomplete: { onSelectOption, focusInputOnSelect, closeOnselect },
    item,
    input: { ref: inputRef },
  } = state;
  const activeItem = item.filtered[item.active];

  const runOptionSelect = () =>
    runIfFn(onSelectOption, {
      optionValue: activeItem.value,
      selectMethod,
      isNewInput: activeItem.key === 'newInput',
    });

  if (
    (isDefined(onSelectOption) && runOptionSelect() !== false) ||
    !isDefined(onSelectOption)
  ) {
    returnT(inputRef?.current).value = activeItem.value;
    dispatch({ type: InputAction.Set, payload: activeItem.value });
    dispatch({ type: AutoCompleteAction.Set, payload: activeItem.value });
    if (closeOnselect) closeList(dispatch);
    runIfFn(cb);
  }
  if (inputRef?.current && focusInputOnSelect) inputRef.current.focus();
};
