import { useMemo } from "react";

interface CurveSvgPathProps {
  showTopCurve?: boolean;
  showBottomCurve?: boolean;
}

export function CurveSvgPath({
  showTopCurve = false,
  showBottomCurve = true,
}: CurveSvgPathProps) {
  const clipPathData = useMemo(() => {
    if (showTopCurve && showBottomCurve) {
      return "M0,0.22 C0.25,0 0.75,0 1,0.22 L1,0.78 C0.75,1 0.25,1 0,0.78 Z";
    }

    if (showTopCurve && !showBottomCurve) {
      return "M0,0.25 C0.25,0 0.75,0 1,0.25 L1,1 L0,1 Z";
    }

    return "M0,0 L1,0 L1,0.78 C0.75,1 0.25,1 0,0.78 Z";
  }, [showTopCurve, showBottomCurve]);

  return (
    <svg className="absolute w-0 h-0" width="0" height="0" aria-hidden="true">
      <defs>
        <clipPath id="dynamicCurveClip" clipPathUnits="objectBoundingBox">
          <path d={clipPathData} />
        </clipPath>
      </defs>
    </svg>
  );
}
