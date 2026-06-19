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
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2
        style={{
          fontSize: "3rem",
          fontWeight: 800,
          color: "#032535",
          margin: "0 0 8px 0",
          letterSpacing: "-1px",
        }}
      >
        {formattedCount}
        {suffix}
      </h2>

      <span
        style={{
          fontSize: "1.5rem",
          fontWeight: 500,
          color: "#032535",
          marginBottom: "12px",
        }}
      >
        {title}
      </span>

      <span
        style={{
          fontSize: "1.1rem",
          color: "#8A99A6",
          fontWeight: 400,
        }}
      >
        {subtitle}
      </span>
    </div>
  );
};

export default StatCard;
