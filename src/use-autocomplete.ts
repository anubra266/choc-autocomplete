import { useDisclosure, useOutsideClick } from "@chakra-ui/react";
import { useRef } from "react";
import { useRefDimensions } from "./helpers/useRefDimensions";

export type UseAutoCompleteProps = {};

export type UseAutoCompleteReturn = {
  getInputProps: () => void;
  getListProps: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isOpen: boolean;
  listRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  onOpen: () => void;
};


export type InputReturnProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
  ref: React.RefObject<HTMLDivElement>;
};

export type ListReturnProps = {
  width: number;
};

export function useAutoComplete(
  props: UseAutoCompleteProps
): UseAutoCompleteReturn {
  const { isOpen, onClose, onOpen } = useDisclosure({});

  const inputRef = useRef<HTMLInputElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  console.log(props);

  useOutsideClick({
    ref: inputWrapperRef,
    handler: () => {
      if (!listRef?.current?.contains(document.activeElement)) onClose();
    },
  });

  const getInputProps = (): InputReturnProps => {
    return {
      onClick: (e) => {
        onOpen();
        inputRef?.current?.focus();
        e.stopPropagation();
      },
      ref: inputWrapperRef,
    };
  };

  const getListProps = (): ListReturnProps => {
    const { width } = useRefDimensions(inputWrapperRef);
    return {
      width,
    };
  };

  return {
    getInputProps,
    getListProps,
    inputRef,
    isOpen,
    listRef,
    onClose,
    onOpen,
  };
}
