import { useEffect } from 'react';
import { AutoComplete } from '../auto-complete-provider';

export const useParseProps = (props: AutoComplete) => {
  const { freeSolo, creatable } = props;
  useEffect(() => {
    if (creatable && !freeSolo) {
      throw new Error(
        'AutoCOmplete: `creatable` can only be applied in freeSolo mode, please add the freeSolo Prop'
      );
    }
  }, []);
};
