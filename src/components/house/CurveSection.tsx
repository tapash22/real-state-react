import React from "react";
import { CurveSvgPath } from "./CurveSvgPath";
import { EllipsCurveSvgPath } from "./EllipsCurveSvgPath";

type CurveSectionProps = {
  isEllipsCurveSvgPath?: boolean;
  isCurveSvgPath?: boolean;
  backgroundColor?: string;
  showTopCurve?: boolean;
  showBottomCurve?: boolean;
  showShadow?: boolean;
  curveHeight?: number | string;
  imageUrl?: string;
  imageAlt?: string;
  imageBlur?: number;
  imageBrightness?: number;
  imageContrast?: number;
  imageScale?: number;
  children?: React.ReactNode;
};

export function CurveSection({
  isEllipsCurveSvgPath = false,
  isCurveSvgPath = false,
  backgroundColor = "var(--bg)",
  showTopCurve = false,
  showBottomCurve = false,
  showShadow = false,
  curveHeight = "85vh",
  imageUrl,
  imageAlt = "Section background layout",
  imageBlur = 1,
  imageBrightness = 90,
  imageContrast = 110,
  imageScale = 105,
  children,
}: CurveSectionProps) {
  const shadowFilter = showShadow
    ? "drop-shadow(0px -10px 20px rgba(0, 0, 0, 0.35)) drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.35))"
    : undefined;

  return (
    <section className="relative w-full bg-[var(--bg)] px-0 overflow-visible z-10">
      {isEllipsCurveSvgPath && (
        <EllipsCurveSvgPath
          showTopCurve={showTopCurve}
          showBottomCurve={showBottomCurve}
        />
      )}

      {isCurveSvgPath && (
        <CurveSvgPath
          showTopCurve={showTopCurve}
          showBottomCurve={showBottomCurve}
        />
      )}

      <div
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[20/9] min-h-[450px]"
        style={{
          height: curveHeight,
        }}
      >
        {/* 1. ISOLATED BACKGROUND LAYER: Clip path ONLY applies to the background */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            clipPath: "url(#dynamicCurveClip)",
            backgroundColor: backgroundColor,
            filter: shadowFilter,
          }}
        >
          {imageUrl && (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div className="absolute inset-0 z-10 pointer-events-none bg-slate-950/45" />
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover transition-all duration-700 ease-out"
                style={{
                  transform: `scale(${imageScale / 100})`,
                  filter: `
                    blur(${imageBlur}px)
                    brightness(${imageBrightness}%)
                    contrast(${imageContrast}%)
                  `,
                }}
              />
            </div>
          )}
        </div>

        {/* 2. FOREGROUND CONTENT LAYER: Completely free of clipPath clipping */}
        <div className="relative z-20 w-full h-full flex items-center justify-center overflow-visible">
          {children}
        </div>
      </div>
    </section>
  );
}
