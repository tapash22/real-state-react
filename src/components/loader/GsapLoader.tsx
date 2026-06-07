import { gsap } from "gsap";
import { useEffect, useRef } from "react";

type GsapLoaderProps = {
  searchType: string | null;
};

export function GsapLoader({ searchType }: GsapLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const dots = containerRef.current.querySelectorAll(".loader-dot");

    const tween = gsap.to(dots, {
      y: -15,
      stagger: 0.15,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center items-center min-h-[400px] w-full gap-4"
    >
      <div className="flex items-center gap-2 h-8">
        <div
          style={{ backgroundColor: "var(--button-bg)" }}
          className="loader-dot w-4 h-4 rounded-full"
        />
        <div
          style={{ backgroundColor: "var(--button-bg)" }}
          className="loader-dot w-4 h-4 rounded-full opacity-75"
        />
        <div
          style={{ backgroundColor: "var(--button-bg)" }}
          className="loader-dot w-4 h-4 rounded-full opacity-50"
        />
      </div>
      <p
        style={{ color: "var(--text-paragraph)" }}
        className="text-sm font-medium tracking-wide animate-pulse"
      >
        Searching {searchType ? `${searchType}s` : "sanctuaries"}...
      </p>
    </div>
  );
}
