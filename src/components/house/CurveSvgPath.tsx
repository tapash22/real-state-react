type CurveSvgPathProps = {
  showTopCurve: boolean;
  showBottomCurve: boolean;
};

export function CurveSvgPath({
  showTopCurve,
  showBottomCurve,
}: CurveSvgPathProps) {
  // 1. Calculate the dynamic path string based on parent props

  // Top Curve: If true, loops OUTWARD up past the top boundary (-0.12)
  const topPath = showTopCurve ? "M 0 0.12 Q 0.5 -0.12, 1 0.12" : "M 0 0 L 1 0";

  // Bottom Curve: If true, loops OUTWARD down past the bottom floor boundary (1.12)
  const bottomPath = showBottomCurve
    ? "L 1 0.88 Q 0.5 1.12, 0 0.88 Z"
    : "L 1 1 L 0 1 Z";

  const dynamicPath = `${topPath} ${bottomPath}`;

  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        {/* Uses a single dynamic clip path ID that changes with the props */}
        <clipPath id="dynamicCurveClip" clipPathUnits="objectBoundingBox">
          <path d={dynamicPath} />
        </clipPath>
      </defs>
    </svg>
  );
}
