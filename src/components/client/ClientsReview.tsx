import { gsap } from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import house1 from "../../assets/house1.jpg";

type Review = {
  id: number;
  image: string;
  name: string;
  icon: IconType;
  speech: string;
};

export function ClientsReview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  const reviews: Review[] = [
    {
      id: 1,
      image: house1,
      name: "Tapash Paul",
      icon: FaUserCircle,

      speech:
        "Thikana made finding a rental super easy and stress-free. The process was smooth, and I quickly got a verified place that matched my needs perfectly.",
    },
    {
      id: 2,
      image: house1,
      name: "John Doe",
      icon: FaUserCircle,

      speech:
        "I used Thikana for a short-term stay and it was very convenient. Listings were accurate and communication with owners was fast and reliable.",
    },
    {
      id: 3,
      image: house1,
      name: "Alex Smith",
      icon: FaUserCircle,

      speech:
        "Great platform for flexible rentals. I found a clean, well-located home within hours. The entire experience felt safe and transparent.",
    },
    {
      id: 4,
      image: house1,
      name: "Sarah Khan",
      icon: FaUserCircle,
      speech:
        "Highly recommend Thikana for anyone looking for quick rental solutions. Everything was well organized and very user-friendly from start to finish.",
    },
  ];

  const getX = (e: MouseEvent | TouchEvent) => {
    if ("touches" in e && e.touches.length > 0) {
      return e.touches[0]?.clientX ?? 0;
    }
    if ("changedTouches" in e && e.changedTouches.length > 0) {
      return e.changedTouches[0]?.clientX ?? 0;
    }
    return (e as MouseEvent).clientX ?? 0;
  };

  const next = useCallback(() => {
    setCurrentIndex((p) => (p === reviews.length - 1 ? 0 : p + 1));
  }, [reviews.length]);

  const prev = useCallback(() => {
    setCurrentIndex((p) => (p === 0 ? reviews.length - 1 : p - 1));
  }, [reviews.length]);

  // ============================================
  // GSAP ENGINE (INFINITE MODULO WRAPPING)
  // ============================================
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>(".carousel-card");
    const total = reviews.length;

    const getSpacing = () => {
      const w = window.innerWidth;
      if (w < 640) return container.offsetWidth * 1.05;
      if (w < 1024) return container.offsetWidth * 0.75;
      return container.offsetWidth * 0.5;
    };

    const spacing = getSpacing();

    items.forEach((item, i) => {
      let offset = i - currentIndex;

      if (offset < -total / 2) offset += total;
      if (offset > total / 2) offset -= total;

      const isActive = offset === 0;

      gsap.to(item, {
        x: offset * spacing,
        scale: isActive ? 1 : 0.85,
        opacity: Math.abs(offset) > 1.5 ? 0 : 1,
        zIndex: isActive ? 10 : 1,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, [currentIndex, reviews.length]);

  // ============================================
  // CONDITIONAL AUTO LOOP (PAUSES ON HOVER)
  // ============================================
  useEffect(() => {
    // If user is hovering over the cards, do not start the interval
    if (isHovered) return;

    const interval = setInterval(() => next(), 3500);
    return () => clearInterval(interval);
  }, [next, isHovered]);

  // SWIPE ENGINE
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

  return (
    <section className="w-full overflow-hidden px-4 sm:px-6 md:px-16 bg-[var(--border)]">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)} // Pause auto loop
        onMouseLeave={() => setIsHovered(false)} // Resume auto loop
        className="
          relative
          flex
          items-center
          justify-center
          perspective-[1200px]
          cursor-grab
          active:cursor-grabbing
          h-[420px]
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
              w-[90%] sm:w-[65%] md:w-[45%] lg:w-[50%]
              h-[360px] sm:h-[350px]
              rounded-2xl sm:rounded-3xl
              overflow-hidden
              bg-[var(--bg)]
              border-2
              border-[var(--border)]
              shadow-lg
              shadow-[var(--shadow)]
              dark:border-slate-800
            "
          >
            {/* IMAGE */}
            <div className="w-full sm:w-1/2 lg:w-1/2 h-[55%] sm:h-full overflow-hidden">
              <img
                src={review.image}
                alt={review.name}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full sm:w-1/2 h-[45%] sm:h-full p-3 lg:p-6 flex flex-col justify-center items-center space-y-2 lg:space-y-5 ">
              {/* header */}
              <div className="flex flex-row lg:flex-col justify-center  items-center gap-2 w-full">
                <div className="w-10 h-10 lg:w-16 lg:h-16 ring-0 lg:ring-2 lg:ring-[var(--border)] flex justify-center items-center rounded-full shadow-none z-50 lg:shadow-xl lg:shadow-[var(--shadow)]">
                  <FaUserCircle
                    className="
                    w-10 h-10
                    lg:w-[50px] lg:h-[50px]
                    text-white
                    lg:drop-shadow-[0_6px_6px_rgba(255,255,255,0.43)]
                  "
                  />
                </div>
                <h2 className="text-lg md:text-3xl font-medium md:font-bold text-[var(--text)] text-center">
                  {review.name}
                </h2>
              </div>
              {/* header end*/}

              <p className="text-sm sm:text-base text-[var(--muted)]  border-b-2 border-t-2 text-center border-[var(--border)] py-2 lg:py-5">
                <span className="sm:hidden">
                  {review.speech.length > 100
                    ? `${review.speech.slice(0, 100)}...`
                    : review.speech}
                </span>

                <span className="hidden sm:inline ">{review.speech}</span>
              </p>
            </div>

            {/* CONTENT END*/}
          </div>
        ))}
      </div>
    </section>
  );
}
