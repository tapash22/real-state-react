import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

// Register GSAP React plugin
gsap.registerPlugin(useGSAP);

interface PropertySliderProps {
  images: string[];
}

export function PropertySlider({ images }: PropertySliderProps) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 = Next, -1 = Prev

  // Animation Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalImgRef = useRef<HTMLImageElement>(null);

  // Maximum number of thumbnails to display inline below the main asset view
  const MAX_VISIBLE_THUMBS = 6;
  const extraImagesCount = images.length - MAX_VISIBLE_THUMBS;

  // 1. GSAP: Handles Main Inline Slider Slide Transitions & Progress Line
  useGSAP(
    () => {
      if (!images || images.length === 0) return;

      // Hardware-accelerated sliding transition
      gsap.fromTo(
        imgRef.current,
        {
          opacity: 0,
          xPercent: direction * 20,
          scale: 0.99,
        },
        {
          opacity: 1,
          xPercent: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        },
      );

      // Smoothly animate the line indicator width at the bottom of the active slide
      const progressPercent = ((currentIdx + 1) / images.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progressPercent}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    { dependencies: [currentIdx, images], scope: containerRef },
  );

  // 2. GSAP: Handles Fullscreen Modal Active Image Shifts
  useGSAP(
    () => {
      if (isFullscreen && modalImgRef.current) {
        gsap.fromTo(
          modalImgRef.current,
          { opacity: 0, scale: 0.95, xPercent: direction * 10 },
          {
            opacity: 1,
            scale: 1,
            xPercent: 0,
            duration: 0.35,
            ease: "power3.out",
          },
        );
      }
    },
    { dependencies: [currentIdx, isFullscreen] },
  );

  // 3. GSAP: Fullscreen Modal Fade and Blur Intro Pop-In
  useGSAP(
    () => {
      if (isFullscreen) {
        gsap.fromTo(
          modalRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: "power1.out" },
        );
      }
    },
    { dependencies: [isFullscreen] },
  );

  if (!images || images.length === 0) {
    return (
      <div className="h-96 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
        No images available
      </div>
    );
  }

  const nextSlide = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleThumbClick = (
    e: React.MouseEvent,
    index: number,
    isLastThumb: boolean,
  ) => {
    e.stopPropagation();
    setDirection(index > currentIdx ? 1 : -1);
    setCurrentIdx(index);
    if (isLastThumb) {
      setIsFullscreen(true);
    }
  };

  return (
    <div ref={containerRef} className="w-full space-y-2">
      {/* ========================================================= */}
      {/* --- INLINE MAIN HERO SLIDER STAGE ---                     */}
      {/* ========================================================= */}
      <div
        onClick={() => setIsFullscreen(true)}
        className="relative h-[450px] w-full bg-gray-950 rounded-t-xl overflow-hidden cursor-zoom-in group select-none"
      >
        {/* Status Tag */}
        <div className="absolute top-4 left-4 bg-white text-gray-900 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md z-10">
          <span className="text-orange-500">⚡</span> New
        </div>

        {/* Action Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md text-gray-700 text-xs transition">
            🔗
          </button>
          <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md text-gray-700 text-xs transition">
            ❤️
          </button>
        </div>

        {/* Main Image Viewport Wrapper */}
        <div className="w-full h-full overflow-hidden">
          <img
            ref={imgRef}
            src={images[currentIdx]}
            alt="Active property layout view"
            className="w-full h-full object-cover will-change-transform"
          />
        </div>

        {/* Navigation Chevron Paddles */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full shadow-lg font-bold z-10 opacity-0 group-hover:opacity-100 transition duration-200"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full shadow-lg font-bold z-10 opacity-0 group-hover:opacity-100 transition duration-200"
        >
          ❯
        </button>

        {/* Bottom Progress Tracker Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 z-10">
          <div ref={progressBarRef} className="bg-red-500 h-full w-0" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* --- INLINE LOWER THUMBNAIL TRACK LIST GRID ---            */}
      {/* ========================================================= */}
      <div className="grid grid-cols-6 gap-1.5 h-20 w-full select-none">
        {images.slice(0, MAX_VISIBLE_THUMBS).map((img, index) => {
          const isLastThumb = index === MAX_VISIBLE_THUMBS - 1;

          return (
            <div
              key={index}
              onClick={(e) => handleThumbClick(e, index, isLastThumb)}
              className={`relative h-full w-full overflow-hidden cursor-pointer bg-gray-200 transition ${
                index === currentIdx && !isLastThumb
                  ? "ring-2 ring-red-500 ring-offset-1"
                  : "opacity-80 hover:opacity-100"
              } ${index === 0 ? "rounded-bl-xl" : ""} ${index === MAX_VISIBLE_THUMBS - 1 ? "rounded-br-xl" : ""}`}
            >
              <img
                src={img}
                alt={`Preview thumbnail ${index}`}
                className="w-full h-full object-cover"
              />

              {/* Counter Mask Overlay Block */}
              {isLastThumb && extraImagesCount > 0 && (
                <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center text-white font-bold transition hover:bg-black/55">
                  <span className="text-lg">{images.length}</span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-200 text-center font-normal">
                    More photos
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* --- PREMIUM BLURRED FULLSCREEN MODAL PORTAL INTERFACE --- */}
      {/* ========================================================= */}
      {isFullscreen && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex flex-col justify-between p-6 select-none"
        >
          {/* Top Info Bar Layout Header */}
          <div className="flex justify-between items-center text-white w-full max-w-6xl mx-auto">
            <span className="font-semibold bg-white/10 border border-white/10 px-4 py-1.5 rounded-lg text-sm tracking-wide shadow-inner">
              {currentIdx + 1} / {images.length}
            </span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="text-white text-5xl font-light hover:text-red-400 transition transform hover:scale-105 active:scale-95 leading-none focus:outline-none"
            >
              &times;
            </button>
          </div>

          {/* Central Fullscreen Presentation Viewport */}
          <div className="relative flex justify-center items-center flex-1 max-w-5xl mx-auto w-full my-4 overflow-hidden">
            <button
              onClick={prevSlide}
              className="absolute left-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-light z-10 transition"
            >
              ❮
            </button>

            <img
              ref={modalImgRef}
              src={images[currentIdx]}
              alt="Fullscreen expanded preview view"
              className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/5 will-change-transform"
            />

            <button
              onClick={nextSlide}
              className="absolute right-2 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full w-14 h-14 flex items-center justify-center text-3xl font-light z-10 transition"
            >
              ❯
            </button>
          </div>

          {/* Fullscreen Bottom Horizontal Gallery Scroll-Track Strip */}
          <div className="w-full max-w-4xl mx-auto overflow-x-auto overflow-y-hidden py-4 select-none scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2 justify-start md:justify-center min-w-max px-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setDirection(idx > currentIdx ? 1 : -1);
                    setCurrentIdx(idx);
                  }}
                  className={`h-16 w-24 rounded-lg overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-200 transform ${
                    idx === currentIdx
                      ? "ring-2 ring-red-500 scale-105 opacity-100 shadow-lg shadow-black/50"
                      : "opacity-40 hover:opacity-80 scale-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Modal indicator track ${idx}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
