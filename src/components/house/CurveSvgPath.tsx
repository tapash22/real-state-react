interface CurveSvgPathProps {
  backgroundColor?: string;
  curveHeight?: number;
}

export const CurveSvgPath = ({
  backgroundColor,
  curveHeight = 100,
}: CurveSvgPathProps) => {
  return (
    <svg
      className="block w-full relative z-30 pointer-events-none"
      style={{ marginBottom: `-${curveHeight}px`, height: `${curveHeight}px` }}
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,120 C360,0 1080,0 1440,120 L1440,120 L0,120 Z"
        fill={backgroundColor}
      />
    </svg>
  );
};
