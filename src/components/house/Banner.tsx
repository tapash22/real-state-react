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
    if (
      !titleRef.current ||
      !subtitleTextRef.current ||
      !paraRef.current ||
      !searchRef.current
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      //  1. Title entrance bounce
      tl.fromTo(
        titleRef.current,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "bounce.out" },
      )
        //  2. Initial word placement reveal
        .fromTo(
          subtitleTextRef.current,
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
          "-=0.4",
        )
        //  3. Description paragraph animation
        .fromTo(
          paraRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        //  4. Search bar wrapper fade and pop
        .fromTo(
          searchRef.current,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" },
          "-=0.4",
        );

      // 🔄 Continuous Word Counting Switcher Mechanism
      const words = ["Days.", "Months.", "Lifetime."];
      let currentIndex = 0;

      // Set baseline state securely
      if (subtitleTextRef.current) {
        // If words[currentIndex] is undefined, it safely falls back to ""
        subtitleTextRef.current.textContent = words[currentIndex] ?? "";
      }

      function playWordLoop() {
        const loopTl = gsap.timeline({
          onComplete: () => {
            // Safely advance the index or reset it to 0
            currentIndex = (currentIndex + 1) % words.length;
            if (subtitleTextRef.current) {
              subtitleTextRef.current.textContent = words[currentIndex] ?? "";
            }
            // Trigger the next loop pass infinitely
            playWordLoop();
          },
        });

        loopTl
          // 1. Maintain readability delay
          .to({}, { duration: 2 })
          // 2. Roll current word UP and OUT
          .to(subtitleTextRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.35,
            ease: "power3.in",
          })
          // 3. Teleport word down instantly while invisible
          .set(subtitleTextRef.current, { y: 20 })
          // 4. Roll new count word UP and IN
          .to(subtitleTextRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power3.out",
          });
      }

      // Initialize the looping engine
      playWordLoop();
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
        className="z-10 w-full min-h-[70vh] flex flex-col justify-center items-center py-10 space-y-10 px-4 relative"
      >
        {/* Soft atmospheric background glow nodes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-4xl flex flex-col items-center space-y-6 text-center z-10">
          {/* TITLE */}
          <h1
            ref={titleRef}
            style={{ color: "var(--text-heading)" }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight opacity-0 leading-none"
          >
            Your Home Anywhere.
          </h1>

          {/* DYNAMIC COUNTING SUBTITLE */}
          <h3 className="text-xl sm:text-2xl font-bold tracking-wider flex items-center justify-center gap-2">
            <span style={{ color: "var(--text-heading)" }}>Stay for</span>

            {/* Structural vertical mask bounding window box */}
            <span className="inline-block overflow-hidden h-[36px] min-w-[110px] sm:min-w-[150px] text-left relative">
              <span
                ref={subtitleTextRef}
                style={{ color: "var(--button-bg)" }}
                className="opacity-0 inline-block absolute left-0 top-0 will-change-transform"
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
          className="m-5  shadow-md shadow-violet-100/10 dark:shadow-gray-200 backdrop-blur-xl rounded-2xl "
        >
          <Search />
        </div>
      </div>
    </CurveSection>
  );
}
