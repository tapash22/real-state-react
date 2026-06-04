import image from "../../assets/house1.jpg";
import { CurveSection } from "./CurveSection";
import { Search } from "./Search";

type BannerProps = {
  // add props later if needed
};

export function Banner(_props: BannerProps) {
  return (
    <CurveSection
      backgroundColor="var(--bg)" // Hooks seamlessly to variable themes
      showTopCurve={false}
      showBottomCurve={true}
      curveHeight={100}
    >
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1
              style={{ color: "var(--text-heading)" }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl leading-tight transition-colors duration-300"
            >
              Your Home Anywhere. <br />
              <span style={{ color: "var(--button-bg)" }}>
                Stay for Days, Months, or Longer.
              </span>
            </h1>

            <p
              style={{ color: "var(--text-paragraph)" }}
              className="text-base font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-300"
            >
              Connect directly with local homeowners across the globe. Secure
              your space, negotiate your terms, and live like a local.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full lg:w-1/2">
            <div
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
              className="overflow-hidden rounded-2xl shadow-xl p-2 border transition-colors duration-300"
            >
              <img
                src={image}
                alt="Beautiful modern banner house"
                className="w-full h-[350px] sm:h-[450px] rounded-xl object-cover transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>

        {/* SEARCH SECTION (Overlapping above the curve perfectly) */}
        <div className="relative z-50 -mb-4 mt-12 max-w-full mx-auto">
          <Search />
        </div>
      </div>
    </CurveSection>
  );
}
