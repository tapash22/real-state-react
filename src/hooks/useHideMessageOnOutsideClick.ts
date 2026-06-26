import { RefObject, useEffect } from "react";

type Props = {
  wrapperRef: RefObject<HTMLElement | null>;
  isVisible: boolean;
  onHide: () => void;
};

export function useHideMessageOnOutsideClick({
  wrapperRef,
  isVisible,
  onHide,
}: Props) {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isVisible) return;

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onHide();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [wrapperRef, isVisible, onHide]);
}
