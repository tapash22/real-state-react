import image from "../../assets/house1.jpg";
import { CurveSection } from "./CurveSection";
import { Search } from "./Search";

type BannerProps = {
  // add props later if needed
};

export function Banner(_props: BannerProps) {
  return (
    <CurveSection
      backgroundColor="var(--card)"
      showTopCurve={false}
      showBottomCurve={true}
      curveHeight={180}
    >
      {/* We use relative positioning here so the absolute image targets this specific boundary */}
      <div className="relative ">
        {/* Responsive Grid: Stacks on mobile, splits 50/50 on large screens */}
        <div className="w-full h-full flex flex-row ">
          <div className="space-y-6 w-1/2 h-auto flex flex-col justify-center items-start p-10 ">
            <h1
              style={{ color: "var(--text-heading)" }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight transition-colors duration-300"
            >
              Your Home Anywhere. <br />
              <span style={{ color: "var(--button-bg)" }}>
                Stay for Days, Months, or Longer.
              </span>
            </h1>

            <p
              style={{ color: "var(--text-paragraph)" }}
              className="text-base sm:text-lg font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-300"
            >
              Connect directly with local homeowners across the globe. Secure
              your space, negotiate your terms, and live like a local.
            </p>
          </div>
          <div
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
            }}
            className="w-1/2 bg-red-600 h-full overflow-hidden rounded-l-xl shadow-xl border transition-colors duration-300"
          >
            <img
              src={image}
              alt="Beautiful modern banner house"
              className="w-full h-fit object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
        </div>
        <Search />
      </div>
    </CurveSection>
  );
}
