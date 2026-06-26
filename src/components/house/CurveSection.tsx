import React from "react";
import { CurveSvgPath } from "./CurveSvgPath";

type CurveSectionProps = {
  backgroundColor?: string;
  showTopCurve?: boolean;
  showBottomCurve?: boolean;
  curveHeight?: number | string;
  imageUrl?: string; // Target background image asset pass-through
  imageAlt?: string;
  imageBlur?: number;
  imageBrightness?: number;
  imageContrast?: number;
  imageScale?: number;
  children?: React.ReactNode;
};

export function CurveSection({
  backgroundColor = "var(--bg)",
  showTopCurve = false,
  showBottomCurve = false,
  curveHeight = "50vh",
  imageUrl,
  imageAlt = "Section background layout",
  imageBlur = 1,
  imageBrightness = 90,
  imageContrast = 110,
  imageScale = 105,
  children,
}: CurveSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--bg)] px-0">
      <CurveSvgPath
        showTopCurve={showTopCurve}
        showBottomCurve={showBottomCurve}
      />
      {/* 2. Core Structural Canvas Area */}
      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[20/9] min-h-[400px]"
        style={{
          clipPath: !imageUrl ? "url(#dynamicCurveClip)" : undefined,
          backgroundColor: backgroundColor,
          height: curveHeight,
        }}
      >
        {imageUrl && (
          /* Wrapped background image layer */
          <div
            className="absolute w-full h-full overflow-hidden z-10 "
            style={{
              clipPath: "url(#dynamicCurveClip)",
              top: showTopCurve ? `-${curveHeight}px` : "0px",
              bottom: showBottomCurve ? `-${curveHeight}px` : "0px",
              height: `calc(100% + ${showTopCurve ? curveHeight : 0}px + ${showBottomCurve ? curveHeight : 0}px)`,
            }}
          >
            {/* Contrast tint layer */}
            <div className="absolute inset-0  z-10 pointer-events-none" />
            <img
              src={imageUrl}
              alt={imageAlt}
              className={`
              w-full
              h-full
              object-cover
              transition-all
              duration-700
              ease-out
            `}
              style={{
                transform: `scalc(${imageScale / 100})`,
                filter: `
              blur(${imageBlur}px)
              brightness(${imageBrightness}%)
              contrast(${imageContrast}%)
            `,
              }}
            />
          </div>
        )}

        {/* Foreground Content Interface */}
        <div className="relative z-20 w-full h-full">{children}</div>
      </div>
    </section>
  );
}
