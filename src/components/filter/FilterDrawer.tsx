import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";
import { FilterBar } from "./FilterBar";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  localPrice: string;
  setLocalPrice: (value: string) => void;

  localProperty: string;
  setLocalProperty: (value: string) => void;

  priceList: string[];
  propertyList: string[];
}

export function FilterDrawer({
  isOpen,
  onClose,
  isMobile,
  activeTab,
  setActiveTab,
  localPrice,
  setLocalPrice,
  localProperty,
  setLocalProperty,
  priceList,
  propertyList,
}: FilterDrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // prevent body scrolling
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    gsap.set(overlayRef.current, {
      opacity: 0,
    });

    gsap.set(panelRef.current, {
      x: isMobile ? 0 : 500,
      y: isMobile ? 500 : 0,
    });

    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.25,
    });

    gsap.to(panelRef.current, {
      x: 0,
      y: 0,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [isOpen, isMobile]);

  const closeDrawer = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
    });

    gsap.to(panelRef.current, {
      x: isMobile ? 0 : 500,
      y: isMobile ? 500 : 0,
      duration: 0.35,
      ease: "power3.in",
      onComplete: onClose,
    });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 backdrop-blur-xs right-2 flex
      ${isMobile ? "items-end justify-end" : "justify-end items-end"}`}
    >
      <div className="absolute inset-0" onClick={closeDrawer} />

      <div
        ref={panelRef}
        className={`relative bg-[var(--bg)] shadow-2xl z-10 flex flex-col

        ${
          isMobile
            ? "w-full rounded-t-2xl max-h-[85vh]"
            : "w-full max-w-md h-[90vh] "
        }`}
      >
        {/* Header */}

        <div className="flex justify-between items-center border-b border-[var(--border)] p-5">
          <h2 className="font-bold text-xl text-[var(--text)]">
            Filter Search
          </h2>

          <button
            onClick={closeDrawer}
            className="text-[var(--text)] dark:hover:text-[var(--muted)] p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}

        <div
          className={`overflow-auto scrollbar-thin
          ${isMobile ? "h-[45vh]" : "flex-1"}`}
        >
          <FilterBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            localPrice={localPrice}
            setLocalPrice={setLocalPrice}
            localProperty={localProperty}
            setLocalProperty={setLocalProperty}
            propertyList={propertyList}
            priceList={priceList}
          />
        </div>

        {/* Footer */}

        <div className="border-t h-20 border-[var(--border)] p-4 flex gap-5 ">
          <button
            onClick={() => {
              setLocalPrice("All Prices");
              setLocalProperty("All Types");
              setActiveTab("Anyone");
            }}
            className="flex-1 w-full  px-5 lg:py-0  rounded-md  text-(--text) font-semibold transition-opacity hover:opacity-100 tracking-widest cursor-pointer border-2 border-[var(--border)] ]"
          >
            Clear
          </button>
          <button
            onClick={closeDrawer}
            className="flex-1 w-full h-full  px-5 lg:py-0  rounded-md  text-(--text) font-semibold transition-opacity hover:opacity-100 tracking-widest cursor-pointer shadow-sm shadow-[var(--primary)]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
