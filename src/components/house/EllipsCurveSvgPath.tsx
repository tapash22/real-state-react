type EllipsCurveSvgPathProps = {
  showTopCurve: boolean;
  showBottomCurve: boolean;
};

export function EllipsCurveSvgPath({
  showTopCurve,
  showBottomCurve,
}: EllipsCurveSvgPathProps) {
  /**
   * FULL WIDTH CORRECTION:
   * To prevent the side edges from compressing inward, the paths must explicitly
   * start exactly at x=0 (leftmost edge) and terminate at x=1 (rightmost edge).
   */

  // Top Curve: Stays completely flush with the sides, only dipping down/arching in the center
  const topPath = showTopCurve
    ? "M 0 0 Q 0.5 0.3, 1 0" // Deep premium concave arch from left edge to right edge
    : "M 0 0 L 1 0"; // Dead straight flat line across top

  // Bottom Curve: Spans perfectly across the base without clipping the side corners inward
  const bottomPath = showBottomCurve
    ? "L 1 1 Q 0.5 0.7, 0 1 Z" // Clean full-width bottom cup arc matching your original landing goal
    : "L 1 1 L 0 1 Z"; // Dead straight flat line across bottom

  // Combines paths smoothly into the object canvas boundary matrix
  const dynamicPath = `${topPath} ${bottomPath}`;

  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        <clipPath id="dynamicCurveClip" clipPathUnits="objectBoundingBox">
          <path d={dynamicPath} />
        </clipPath>
      </defs>
    </svg>
  );
}
