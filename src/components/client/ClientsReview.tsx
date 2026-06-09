import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";

import house1 from "../../assets/house1.jpg";

type Review = {
  id: number;
  image: string;
  name: string;
};

export function ClientsReview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews: Review[] = [
    { id: 1, image: house1, name: "Tapash Paul" },
    { id: 2, image: house1, name: "John Doe" },
    { id: 3, image: house1, name: "Alex Smith" },
    { id: 4, image: house1, name: "Sarah Khan" },
  ];

  // =========================
  // SAFE TOUCH / MOUSE X
  // =========================
  const getX = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e && e.touches.length > 0) {
      return e.touches[0]?.clientX ?? 0;
    }

    if ("changedTouches" in e && e.changedTouches.length > 0) {
      return e.changedTouches[0]?.clientX ?? 0;
    }

    return (e as MouseEvent).clientX ?? 0;
  };

  // =========================
  // NEXT / PREV
  // =========================
  const next = useCallback(() => {
    setCurrentIndex((p) => (p === reviews.length - 1 ? 0 : p + 1));
  }, [reviews.length]);

  const prev = useCallback(() => {
    setCurrentIndex((p) => (p === 0 ? reviews.length - 1 : p - 1));
  }, [reviews.length]);

  // =========================
  // GSAP POSITION ENGINE (RESPONSIVE)
  // =========================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".carousel-card");

    const getSpacing = () => {
      const w = window.innerWidth;

      if (w < 640) return container.offsetWidth * 0.85; // mobile
      if (w < 1024) return container.offsetWidth * 0.55; // tablet
      return container.offsetWidth * 0.42; // desktop
    };

    const spacing = getSpacing();

    items.forEach((item, i) => {
      const offset = i - currentIndex;

      gsap.to(item, {
        x: offset * spacing,
        scale: offset === 0 ? 1 : 0.82,
        opacity: Math.abs(offset) > 2 ? 0 : 1,
        zIndex: offset === 0 ? 10 : 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [currentIndex]);

  // =========================
  // AUTO LOOP
  // =========================
  useEffect(() => {
    const interval = setInterval(() => next(), 3500);
    return () => clearInterval(interval);
  }, [next]);

  // =========================
  // SWIPE
  // =========================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;

    const onStart = (e: MouseEvent | TouchEvent) => {
      startX = getX(e);
    };

    const onEnd = (e: MouseEvent | TouchEvent) => {
      const diff = startX - getX(e);

      if (diff > 50) next();
      if (diff < -50) prev();
    };

    container.addEventListener("mousedown", onStart);
    container.addEventListener("mouseup", onEnd);
    container.addEventListener("touchstart", onStart);
    container.addEventListener("touchend", onEnd);

    return () => {
      container.removeEventListener("mousedown", onStart);
      container.removeEventListener("mouseup", onEnd);
      container.removeEventListener("touchstart", onStart);
      container.removeEventListener("touchend", onEnd);
    };
  }, [next, prev]);

  // =========================
  // UI
  // =========================
  return (
    <section className="w-full overflow-hidden px-4 sm:px-6 md:px-16 bg-[var(--border)]">
      <div
        ref={containerRef}
        className="
          relative
          flex
          items-center
          justify-center
          perspective-[1200px]
          cursor-grab
          active:cursor-grabbing
          h-[300px] sm:h-[360px] md:h-[400px]
          overflow-hidden
        "
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="
              carousel-card
              absolute
              flex
              flex-col sm:flex-row
              w-[85%] sm:w-[65%] md:w-[45%] lg:w-[40%]
              h-[260px] sm:h-[320px] md:h-[350px]
              rounded-2xl sm:rounded-3xl
              overflow-hidden
              bg-[var(--bg)]
              border-2
              border-[var(--border)]
              shadow-md
              dark:border-slate-800
            "
          >
            {/* IMAGE */}
            <div className="w-full sm:w-1/2 h-full overflow-hidden">
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text)]">
                {review.name}
              </h2>

              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-[var(--muted)] leading-relaxed">
                Premium client testimonial showcasing luxury real estate
                experience, trust, and satisfaction.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
