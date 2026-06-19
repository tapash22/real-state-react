import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  targetNumber?: number;
  suffix?: string;
  title?: string;
  subtitle?: string;
  duration?: number;
  locale?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  targetNumber = 50000,
  suffix = "+",
  title = "properties",
  subtitle = "rented out worldwide",
  duration = 2,
  locale = "de-DE",
}) => {
  const [count, setCount] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obj = { value: 0 };

    const tween = gsap.to(obj, {
      value: targetNumber,
      duration,
      ease: "power1.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        setCount(Math.floor(obj.value));
      },
    });

    return () => {
      tween.kill();

      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [targetNumber, duration]);

  const formattedCount = new Intl.NumberFormat(locale).format(count);

  return (
    <div
      ref={containerRef}
      className="flex flex-col justify-center items-center space-y-3 "
    >
      <h2 className="text-2xl lg:text-4xl font-bold tracking-wider text-[var(--text)]">
        {formattedCount}
        {suffix}
      </h2>

      <span className="text-xl lg:text-2xl font-semibold tracking-wider text-[var(--meted)]">
        {title}
      </span>

      <span className="text-sm font-medium tracking-wider text-[var(--text)]">
        {subtitle}
      </span>
    </div>
  );
};

export default StatCard;
