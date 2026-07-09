import landlord_header from "../../assets/landlord_header.jpg";
import { CurveSection } from "./CurveSection";

export function PricingHeader() {
  return (
    <div className="w-full h-full  ">
      {/* <ShowcaseSection /> */}
      {/* <ClippedTopCurveImage /> */}
      <CurveSection
        isCurveSvgPath={false}
        isEllipsCurveSvgPath={true}
        backgroundColor="var(--primary)"
        showTopCurve={false} // <-- Turned to true to active the top half-circle curve
        showBottomCurve={true} // Keeps the bottom curve active simultaneously
        showShadow={true}
        curveHeight="60vh"
        imageUrl={landlord_header}
        imageAlt="land_lord and with confidence"
        imageScale={110}
        imageBlur={2}
        imageBrightness={80}
        imageContrast={100}
      >
        <div className="relative w-full h-[380px] sm:h-[420px] md:h-[650px] flex items-center justify-center max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg">
            Rent out quickly and with confidence
          </h1>
        </div>
      </CurveSection>
    </div>
  );
}
