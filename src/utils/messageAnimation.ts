import gsap from "gsap";
import React from "react";

type MessageAnimationParams = {
  messageRef: React.RefObject<HTMLDivElement | null>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const showMessage = ({
  messageRef,
  setShow,
}: MessageAnimationParams) => {
  if (!messageRef.current) return;

  setShow(true);

  gsap.killTweensOf(messageRef.current);

  gsap.fromTo(
    messageRef.current,
    {
      height: 0,
      opacity: 0,
      y: -20,
      marginTop: 0,
      overflow: "hidden",
      pointerEvents: "none",
    },
    {
      height: "auto",
      opacity: 1,
      y: 0,
      marginTop: 12,
      pointerEvents: "auto",
      duration: 0.45,
      ease: "power3.out",
    },
  );
};

export const hideMessage = ({
  messageRef,
  setShow,
}: MessageAnimationParams) => {
  if (!messageRef.current) return;

  gsap.killTweensOf(messageRef.current);

  gsap.to(messageRef.current, {
    height: 0,
    opacity: 0,
    y: -20,
    marginTop: 0,
    pointerEvents: "none",
    duration: 0.35,
    ease: "power3.inOut",
    onComplete: () => {
      setShow(false);
    },
  });
};
