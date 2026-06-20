import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { CurveSection } from "./CurveSection";
import { Search } from "./Search";

export function Banner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleTextRef = useRef<HTMLSpanElement>(null); // Anchor element for the text loop
  const paraRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial Guard Clause
    if (
      !containerRef.current ||
      !titleRef.current ||
      !subtitleTextRef.current ||
      !paraRef.current ||
      !searchRef.current
    )
      return;

    // 2. Create stable, non-null local references for nested closures
    const subtitleEl = subtitleTextRef.current;
    const titleEl = titleRef.current;
    const paraEl = paraRef.current;
    const searchEl = searchRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Core Entrance Sequence using stable local variables
      tl.fromTo(
        titleEl,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "bounce.out" },
      )
        .fromTo(
          subtitleEl,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        .fromTo(
          paraEl,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          searchEl,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" },
          "-=0.4",
        );

      // 🔄 Infinite Text Loop Configuration Engine
      const words = ["Days.", "Months.", "Lifetime."];
      let currentIndex = 0;

      // Set initial word safely
      subtitleEl.textContent = words[currentIndex] ?? "";

      function playWordLoop() {
        const loopTl = gsap.timeline({
          onComplete: () => {
            playWordLoop();
          },
        });

        loopTl
          .to({}, { duration: 2 })
          // TypeScript is now 100% confident subtitleEl is an HTMLSpanElement
          .to(subtitleEl, {
            y: -28,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          })
          .call(() => {
            currentIndex = (currentIndex + 1) % words.length;
            subtitleEl.textContent = words[currentIndex] ?? "";
          })
          .set(subtitleEl, { y: 28 })
          .to(subtitleEl, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          });
      }

      // Fire off loop engine
      tl.add(() => playWordLoop(), "-=0.2");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <CurveSection
      backgroundColor="var(--card)"
      showTopCurve={false}
      showBottomCurve={true}
      curveHeight={150}
    >
      <div
        ref={containerRef}
        className="z-10 w-full min-h-[70vh] flex flex-col justify-center items-center py-10 space-y-5 px-4 relative"
      >
        {/* Soft atmospheric background glow nodes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-900/40 lg:bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-4xl flex flex-col items-center space-y-5 text-center z-10">
          {/* TITLE */}
          <h1
            ref={titleRef}
            style={{ color: "var(--text-heading)" }}
            className="text-2xl sm:text-2xl lg:text-6xl font-extrabold tracking-tight opacity-0 leading-none"
          >
            Your Home Anywhere.
          </h1>

          {/* DYNAMIC COUNTING SUBTITLE */}

          <h3 className="text-xl sm:text-2xl font-bold tracking-wider flex items-center justify-center gap-2">
            <span style={{ color: "var(--text-heading)" }}>Stay for</span>

            {/* MASK WINDOW */}
            <span className="relative overflow-hidden h-[36px] w-[120px] flex items-center">
              <span
                ref={subtitleTextRef}
                className="opacity-0 w-full text-center whitespace-nowrap leading-none bg-violet-900/80 px-2 py-3 rounded-lg "
                style={{ color: "var(--button-bg)" }}
              />
            </span>
          </h3>

          {/* PARAGRAPH */}
          <p
            ref={paraRef}
            style={{ color: "var(--text-paragraph)" }}
            className="text-base sm:text-lg max-w-xl font-medium opacity-0 leading-relaxed"
          >
            Connect directly with local homeowners across the globe. Secure your
            space, negotiate your terms, and live like a local.
          </p>
        </div>

        {/* FLOATING SEARCH CONTAINER BAR */}
        <div
          ref={searchRef}
          className="shadow-sm shadow-[var(--border)] rounded-xl  backdrop-blur-sm  items-center h-full p-0 lg:p-1 "
        >
          <Search />
        </div>
      </div>
    </CurveSection>
  );
}
