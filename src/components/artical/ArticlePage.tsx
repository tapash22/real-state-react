import React, { useEffect, useRef, useState } from "react";
import { articleData, Section } from "../../data";

export const ArticlePage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("overview");
  const [indicatorStyle, setIndicatorStyle] = useState<{
    top: number;
    height: number;
  }>({
    top: 0,
    height: 0,
  });

  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentScrollRef = useRef<HTMLDivElement>(null);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element && contentScrollRef.current) {
      const container = contentScrollRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollTarget =
        container.scrollTop + (elementRect.top - containerRect.top) - 0;

      container.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
    }
  };

  // 1. Track scroll position of main content container for sidebar highlights
  // Track scroll position of main content container for sidebar highlights
  useEffect(() => {
    const container = contentScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const sections = articleData.sections;
      const containerTop = container.getBoundingClientRect().top;

      // Check if user reached bottom of scroll container
      const isAtBottom =
        Math.abs(
          container.scrollHeight - container.clientHeight - container.scrollTop,
        ) < 10;

      if (isAtBottom && sections.length > 0) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          setActiveId(lastSection.id);
        }
        return;
      }

      const offsetThreshold = 100;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const elRect = el.getBoundingClientRect();
          const relativeTop = elRect.top - containerTop;

          if (
            relativeTop <= offsetThreshold &&
            relativeTop + elRect.height > 0
          ) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Smoothly update sidebar active indicator position
  useEffect(() => {
    if (sidebarRef.current) {
      const activeElement = sidebarRef.current.querySelector(
        `[data-id="${activeId}"]`,
      ) as HTMLElement;

      if (activeElement) {
        // Correct position relative to sidebar inner container
        const containerTop = sidebarRef.current.getBoundingClientRect().top;
        const elementTop = activeElement.getBoundingClientRect().top;
        const currentScroll = sidebarRef.current.scrollTop;

        const calculatedTop = elementTop - containerTop + currentScroll;

        setIndicatorStyle({
          top: calculatedTop,
          height: activeElement.offsetHeight,
        });

        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeId]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 font-sans text-(--text) flex flex-col md:flex-row gap-8">
      {/* Scrollable Child Content Area */}
      <div
        ref={contentScrollRef}
        className="flex-1 max-w-2xl h-[calc(100vh-140px)] overflow-y-auto overscroll-contain pr-4 pb-32
                   [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <main>
          <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>

          <p className="text-gray-600 mb-6 flex items-start gap-2">
            <span>💡</span> {articleData.subtitle}
          </p>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-lg">
              P
            </div>
            <div className="text-sm">
              <p className="text-(--muted)">
                Written by{" "}
                <span className="font-medium text-gray-900">
                  {articleData.author.name}
                </span>
              </p>
              <p className="text-(--muted)">{articleData.author.date}</p>
            </div>
          </div>

          <p className="text-lg leading-relaxed text-(--muted) mb-10">
            {articleData.introParagraph}
          </p>

          <div className="space-y-12">
            {articleData.sections.map((section: Section) => (
              <section key={section.id} id={section.id} className="scroll-mt-6">
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>

                {section.id === "overview" && (
                  <ul className="list-disc pl-5 space-y-2 text-(--primary) font-medium">
                    {articleData.sections.slice(1).map((sec) => (
                      <li key={sec.id}>
                        <button
                          onClick={() => scrollToId(sec.id)}
                          className="hover:underline text-left cursor-pointer"
                        >
                          {sec.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {section.content?.map((paragraph, index) => (
                  <p key={index} className="text-(--muted) leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </main>
      </div>

      {/* Right Navigation Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-6 border-l border-(--border)">
          <div
            ref={sidebarRef}
            className="relative max-h-[calc(100vh-140px)] overflow-y-auto pl-4 space-y-3 scroll-smooth 
                       scrollbar-thin scrollbar-track-transparent"
          >
            {/* Sliding Active Indicator Bar (positioned exactly at container left edge) */}
            <div
              className="absolute -left-[1px] w-1 bg-gray-900 transition-all duration-300 ease-in-out z-10 rounded-t-lg"
              style={{
                top: `${indicatorStyle.top}px`,
                height: `${indicatorStyle.height}px`,
              }}
            />

            {articleData.sections.map((sec) => {
              const isActive = activeId === sec.id;
              return (
                <button
                  key={sec.id}
                  data-id={sec.id}
                  onClick={() => scrollToId(sec.id)}
                  className={`block text-left text-sm transition-colors duration-200 cursor-pointer w-full py-1 ${
                    isActive
                      ? "text-(--text) font-bold"
                      : "text-(--muted) hover:text-gray-800 font-normal"
                  }`}
                >
                  {sec.title}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
};
