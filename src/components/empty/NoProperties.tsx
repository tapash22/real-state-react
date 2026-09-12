import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { FiRefreshCcw } from "react-icons/fi";

type NoPropertiesProps = {
  onRetry?: () => void;
};

export function NoProperties({ onRetry }: NoPropertiesProps) {
  const emptyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!emptyRef.current) return;

    gsap.fromTo(
      emptyRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
      },
    );

    gsap.to(".floating-icon", {
      y: -12,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div
      ref={emptyRef}
      className="flex justify-center items-center min-h-[350px] lg:min-h-[450px] px-6"
    >
      <div
        style={{
          background: "var(--bg-secondary)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
        className="relative overflow-hidden border rounded-3xl px-10 py-6 lg:py-16 text-center max-w-xl w-full backdrop-blur-xl"
      >
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-500/10 blur-3xl rounded-full" />
        <div className="absolute  -right-20 -bottom-20 -left-20 w-40 h-40 bg-violet-500/30 blur-3xl rounded-full" />

        {/* Icon */}
        <div className="floating-icon flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-(--bg)/20 border border-(--border) flex items-center justify-center">
            <FiRefreshCcw className="text-2xl lg:text-4xl text-violet-400" />
          </div>
        </div>

        {/* Title */}
        <h2
          style={{ color: "var(--text-heading)" }}
          className="text-2xl md:text-3xl font-bold mb-2 md:mb-4"
        >
          No Properties Found
        </h2>

        {/* Text */}
        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm font-medium leading-relaxed mb-4 md:mb-8 tracking-wider"
        >
          We couldn't find any verified properties matching your search. Try
          changing filters or explore another location.
        </p>
      </div>
    </div>
  );
}
