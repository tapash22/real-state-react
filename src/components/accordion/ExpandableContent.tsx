import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { ReactNode, useRef } from "react";

interface ExpandableContentProps {
  /** Controls open/close state */
  isExpanded: boolean;
  /** Function to toggle the expanded state */
  onToggle: () => void;
  /** Content always visible before clicking Expand */
  previewContent: ReactNode;
  /** Content that expands/collapses */
  hiddenContent: ReactNode;
  /** Custom label for Expand button (Default: "Show more") */
  showMoreLabel?: string;
  /** Custom label for Collapse button (Default: "Show less") */
  showLessLabel?: string;
  /** Class name for custom button styling */
  buttonClassName?: string;
}

export const ExpandableContent: React.FC<ExpandableContentProps> = ({
  isExpanded,
  onToggle,
  previewContent,
  hiddenContent,
  showMoreLabel = "Show more",
  showLessLabel = "Show less",
  buttonClassName = "text-xs font-semibold text-slate-500 underline mt-3 hover:text-slate-800 block cursor-pointer transition-colors",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const expandableRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!expandableRef.current) return;

      if (isExpanded) {
        gsap.to(expandableRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
        });
      } else {
        gsap.to(expandableRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.inOut",
        });
      }
    },
    { dependencies: [isExpanded], scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* Always visible preview section */}
      <div>{previewContent}</div>

      {/* GSAP-animated hidden section */}
      <div
        ref={expandableRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        {hiddenContent}
      </div>

      {/* Toggle button */}
      <button onClick={onToggle} className={buttonClassName}>
        {isExpanded ? showLessLabel : showMoreLabel}
      </button>
    </div>
  );
};
