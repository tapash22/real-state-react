import React from "react";

type CurveSectionProps = {
  backgroundColor?: string;
  showTopCurve?: boolean;
  showBottomCurve?: boolean;
  curveHeight?: number;
  children: React.ReactNode;
};

export function CurveSection({
  backgroundColor = "var(--bg)",
  showTopCurve = false,
  showBottomCurve = true,
  curveHeight = 80,
  children,
}: CurveSectionProps) {
  const CurveSvgPath = () => (
    <path
      d="M0,120 C360,0 1080,0 1440,120 L1440,120 L0,120 Z"
      fill={backgroundColor}
    />
  );

  return (
    /* We add bg-[var(--bg)] here so the canvas background behind the SVGs defaults to your site background */
    <section
      style={{ backgroundColor: "var(--bg)" }}
      className="w-full transition-colors duration-300"
    >
      {/* Top Curve */}
      {showTopCurve && (
        <svg
          className="block w-full"
          style={{ height: `${curveHeight}px` }}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <CurveSvgPath />
        </svg>
      )}

      {/* Content wrapper */}
      <div
        style={{ backgroundColor }}
        className="transition-colors duration-300"
      >
        {children}
      </div>

      {/* Bottom Curve */}
      {showBottomCurve && (
        <svg
          className="block w-full"
          style={{
            height: `${curveHeight}px`,
            transform: "rotate(180deg)",
            transformOrigin: "center",
          }}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <CurveSvgPath />
        </svg>
      )}
    </section>
  );
}
