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
  <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
    <svg class="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" 
            class="fill-[#030712]"></path> <!-- Matches tailwind bg-slate-950 -->
    </svg>
  </div>
  );
}
