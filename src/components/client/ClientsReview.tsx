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
  // NEXT / PREV (STABLE)
  // =========================
  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  }, [reviews.length]);

  // =========================
  // GSAP POSITION ENGINE
  // =========================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".carousel-card");

    items.forEach((item, i) => {
      const offset = i - currentIndex;

      gsap.to(item, {
        x: offset * 380,
        scale: offset === 0 ? 1 : 0.78,
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
    const interval = setInterval(() => {
      next();
    }, 3500);

    return () => clearInterval(interval);
  }, [next]);

  // =========================
  // DRAG / SWIPE
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
    <section className="overflow-x-hidden w-full px-16 bg-[var(--border)] mx-auto">
      <div
        ref={containerRef}
        className="
          relative
          h-[400px]
          flex
          items-center
          justify-center
          perspective-[1200px]
          cursor-grab
          active:cursor-grabbing
          px-20
        "
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="
              carousel-card
              absolute
              flex
              w-[45%]
              h-[350px]
              rounded-3xl
              overflow-hidden
              bg-[var(--bg)]
              border-2
              border-[var(--border)]
              shadow-md
              shadow-[var(--shadow)]

              dark:border-slate-800
            "
          >
            {/* LEFT IMAGE */}
            <div className="w-1/2 h-full overflow-hidden">
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-[var(--text)]">
                {review.name}
              </h2>

              <p className="mt-4 text-[var(--muted)] leading-relaxed">
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
