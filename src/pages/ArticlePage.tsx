import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { articleData, Section } from "../data";

type RouteParams = {
  id: string;
};

export const ArticlePage: React.FC = () => {
  const { id } = useParams<RouteParams>();

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
        container.scrollTop + (elementRect.top - containerRect.top) - 20;

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
    <div className="flex flex-col justify-center items-center gap-10 w-full px-5 py-5 lg:py-10 ">
      <p className="text-sm text-[var(--text)] mb-2">Article {id}</p>
      <div className="px-6 py-6 font-sans text-[var(--text)] flex flex-col md:flex-row gap-8 ">
        {/* Scrollable Child Content Area */}
        <div
          ref={contentScrollRef}
          className="
                    flex-1 max-w-4xl h-auto lg:h-[calc(100vh-140px)] overflow-y-visible lg:overflow-y-auto overscroll-contain
                    pr-0 lg:pr-4 pb-12 lg:pb-32
                    [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                    "
        >
          <div className="flex flex-col justify-start space-y-3">
            <div className="w-full h-auto p-2 flex flex-col items-start justify-start space-y-2">

            <h1 className="text-3xl font-bold text-start text-[var(--text)]">{articleData.title}</h1>

            <p className="text-[var(--muted)] flex items-start gap-2">
              <span>💡</span> {articleData.subtitle}
            </p>
            </div>

            <div className="flex items-center gap-3 ">
              <div className="w-14 h-14 rounded-full bg-[var(--card)] flex items-center justify-center border-[5px] border-[var(--border)]">
                <span className="text-[var(--text)] font-bold text-xl tracking-widest ">
                T
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-[var(--muted)] space-x-1">
                  Written by{" "}
                  <span className="font-bold tracking-widest text-[var(--text)]">
                    {articleData.author.name}
                  </span>
                </p>
                <p className="text-[var(--text)]">{articleData.author.date}</p>
              </div>
            </div>

            <div className="space-y-8">
              <p
                className="
                         text-md leading-relaxed tracking-wider text-[var(--muted)] 
                         "
              >
                {articleData.introParagraph}
              </p>
              {articleData.sections.map((section: Section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-6 space-y-2"
                >
                  <h2 className="text-2xl font-bold tracking-wider text-underline leading-10 border-b-2  border-[var(--border)] w-full lg:w-fit p-2 bg-[var(--card)] lg:bg-transparent rounded-tl-md rounded-tr-md text-center lg:text-start">{section.title}</h2>

                  {section.id === "overview" && (
                    <ul className="list-disc pl-5 space-y-2 text-[var(--muted)] font-medium">
                      {articleData.sections.slice(1).map((sec) => (
                        <li key={sec.id}>
                          <button
                            onClick={() => scrollToId(sec.id)}
                            className="hover:underline text-left cursor-pointer"
                          >
                            <span className="text-[var(--muted)] hover:text-[var(--text)] transition-colors duration-200 tracking-wider">
                              {sec.title}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.content?.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-[var(--muted)] text-sm  font-medium leading-relaxed text-justify tracking-wider"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Right Navigation Sidebar */}
        <aside className="hidden lg:block w-80 shrink-0">
          <div className="sticky top-6 border-l-2 border-[var(--border)]">
            <div
              ref={sidebarRef}
              className="relative max-h-[calc(100vh-140px)] overflow-y-auto pl-4 space-y-3 scroll-smooth 
                       scrollbar-thin scrollbar-thumb-[var(--primary)] scrollbar-track-[var(--border)]"
            >
              {/* Sliding Active Indicator Bar (positioned exactly at container left edge) */}
              <div
                className="absolute -left-[0px] w-[2px] bg-[var(--primary)] transition-all duration-300 ease-in-out z-10 rouded-xl"
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
                        ? "text-[var(--text)] font-bold"
                        : "text-[var(--muted)] hover:text-gray-800 font-normal"
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
    </div>
  );
};
