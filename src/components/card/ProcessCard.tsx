import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ProcessStep } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export const ProcessCard: React.FC<{ step: ProcessStep; isLast: boolean }> = ({
  step,
  isLast,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pulseElement = pulseRef.current;
    const rowElement = rowRef.current;

    if (!pulseElement || !rowElement) return;

    // 1. Setup the infinite pulsing/expanding animation timeline
    const pulseTl = gsap.timeline({ repeat: -1 });
    pulseTl.fromTo(
      pulseElement,
      { scale: 0.8, opacity: 0.8 },
      { scale: 2.2, opacity: 0, duration: 1.2, ease: "power1.out" },
    );

    // Pause it initially so it doesn't run offscreen
    pulseTl.pause();

    // 2. Attach ScrollTrigger to play/pause based on viewport scroll position
    ScrollTrigger.create({
      trigger: rowElement,
      start: "top 75%", // Triggers when the top of the row hits 75% from the top of viewport
      end: "bottom 25%", // Clears out when passing past 25% from top
      onEnter: () => pulseTl.play(),
      onLeave: () => pulseTl.pause(),
      onEnterBack: () => pulseTl.play(),
      onLeaveBack: () => pulseTl.pause(),
    });

    // Cleanup triggers on unmount
    return () => {
      pulseTl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={rowRef}
      className="flex flex-col md:flex-row justify-between mb-16 last:mb-0 group"
    >
      {/* Left Core Content Column */}
      <div className="flex flex-1 md:max-w-[62%]">
        {/* Animated Timeline Section */}
        <div className="flex flex-col items-center mr-6">
          <div className="relative flex items-center justify-center">
            {/* GSAP Target Pulse Ring */}
            <span
              ref={pulseRef}
              className="absolute inline-flex h-8 w-8 rounded-full bg-[var(--primary)] opacity-0 pointer-events-none"
            ></span>

            {/* Step Number Circle */}
            <div className="relative z-10 w-8 h-8 bg-[var(--card)] text-[var(--text)] rounded-full flex items-center justify-center text-sm font-bold border border-[var(--primary)] shadow-sm shadow-[var(--primary)] transition-transform duration-300 group-hover:scale-105">
              {step.id}
            </div>
          </div>

          {/* Vertical Timeline String Line Connector */}
          {!isLast && (
            <div className="w-1 bg-[var(--card)] flex-grow mt-3 -mb-20 min-h-[100px]" />
          )}
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[var(--text)] tracking-wide">
            {step.title}
          </h2>

          {step.description.map((paragraph, idx) => (
            <p
              key={idx}
              className="text-sm leading-relaxed text-[var(--muted)]  font-normal"
            >
              {paragraph}
            </p>
          ))}

          {step.footerLink && (
            <a
              href={step.footerLink.url}
              className="inline-block text-sm font-medium text-[var(--primary)] hover:underline "
            >
              {step.footerLink.text}
            </a>
          )}
        </div>
      </div>

      {/* Right Column / Pricing Sidebar Split */}
      <div className="w-full md:w-[32%] border-l-2 border-dashed border-[var(--border)] pl-0 md:pl-8 pt-4 md:pt-0.5 flex items-start">
        <div className="space-y-3">
          <h3 className="text-base font-bold text-[var(--text)] tracking-wide leading-relaxed whitespace-pre-line">
            {step.sidebar.title}
          </h3>
          <p className="text-xs text-[var(--muted)] mb-4">
            {step.sidebar.description}
          </p>
          {step.sidebar.link && (
            <a
              href={step.sidebar.link.url}
              className="inline-block text-xs font-bold text-[var(--primary)] tracking-wider hover:underline"
            >
              {step.sidebar.link.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
