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
      curveHeight={120}
    >
      {/* We use relative positioning here so the absolute image targets this specific boundary */}
      <div className="z-10 w-full min-h-[50vh] max-h-[85vh] flex flex-col justify-center items-center">
        {/* Responsive Grid: Stacks on mobile, splits 50/50 on large screens */}
        <div className="w-1/2 h-auto flex flex-row py-5">
          <div className="space-y-5 w-full h-auto flex flex-col justify-center items-center p-16">
            <h1
              style={{ color: "var(--text-heading)" }}
              className="text-2xl font-extrabold tracking-wider lg:text-3xl leading-relaxed transition-colors duration-300 "
            >
              Your Home Anywhere.
            </h1>
            <h3
              style={{ color: "var(--button-bg)" }}
              className="text-xl font-extrabold tracking-widest lg:text-2xl leading-relaxed transition-colors duration-300"
            >
              Stay for Days, Months, or Longer.
            </h3>

            <p
              style={{ color: "var(--text-paragraph)" }}
              className="text-lg font-medium text-center tracking-wide leading-relaxed transition-colors duration-300"
            >
              Connect directly with local homeowners across the globe. Secure
              your space, negotiate your terms, and live like a local.
            </p>
            <div className="w-full h-auto p-3 flex justify-center items-center">
              <button
                // onClick={handleClick}
                style={{
                  // Uses a smooth linear gradient for depth and matches your custom color variable
                  background:
                    "linear-gradient(250deg, var(--button-bg) 0%, rgba(15, 118, 110, 0.7) 100%)",
                }}
                className="
                          w-fit py-3 px-10 rounded-md
                          text-white font-bold tracking-widest transition-all duration-300
                          cursor-pointer relative overflow-hidden shadow-md
                          
                          /* Glossy Edge Highlight */
                          border-t border-white/3 border-x border-(--border)
                          
                          /* Hover and Click Effects */
                          hover:opacity-95 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] hover:tracking-widest
                          
                          /* The Diagonal White Gloss/Shine Element */
                          before:absolute before:inset-0 
                          before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent 
                          before:-translate-x-full hover:before:animate-[shine_1s_ease-in-out]
                        "
                type="button"
              >
                Explore With Mine
              </button>
            </div>
          </div>
          {/* <div
            style={{
              backgroundColor: "var(--bg)",
              borderColor: "var(--border)",
            }}
            className="w-1/2 bg-red-600 h-full overflow-hidden rounded-l-xl shadow-xl border transition-colors duration-300"
          >
            <img
              src={image}
              alt="Beautiful modern banner house"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div> */}
        </div>

        <Search />
      </div>
    </CurveSection>
  );
}
