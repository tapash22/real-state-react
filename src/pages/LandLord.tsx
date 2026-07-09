// import { ShowcaseSection } from "../components/show-case/ShowcaseSection";

import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RentalStepsCards } from "../components/card/RentalStepsCards";
import { SectionHeader } from "../components/header-section/SectionHeader";
import { PricingHeader } from "../components/house/PricingHeader";
import { ClippedTopCurveImage } from "../components/show-case/ClippedTopCurveImage";
import { premiumFeaturesList } from "../data";

export default function LandLord() {
  const navigate = useNavigate();

  return (
    <section className="my-0 w-full  transition-colors duration-300">
      <PricingHeader />
      {/* image view end*/}
      <div className="flex flex-col justify-center items-center gap-5 w-full px-8 lg:px-16 ">
        {/* bottom end */}

        {/* pricing */}

        <div className="w-full lg:w-2/3 h-auto flex flex-col justify-center items-center">
          <SectionHeader
            tagTitle="pricing"
            headerTitle="Simple pricing. No hidden costs."
            subTitle="Everything you need to grow your rental business."
          />

          <div className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full  h-auto p-0 lg:p-3  ">
            <div className="w-full h-auto py-3 px-0 lg:p-2 space-y-3 lg:w-2/3">
              <h3
                style={{ color: "var(--text-heading)" }}
                className="text-xl font-semibold lg:text-2xl lg:font-bold  tracking-wide lg:tracking-wider lg:whitespace-nowrap text-[var(--text)] border-b-2  lg:border-b-0 border-[var(--border)] leading-10"
              >
                What’s included
              </h3>
              <div className="flex justify-between items-start w-full space-x-2">
                <FaUserCircle
                  size={24}
                  className="text[var(--text)] font-bold"
                />
                <div className="-flex-col justify-start items-center space-y-1">
                  <span className="text-sm font-semibold lg:font-bold tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed flex text-[var(--text)]">
                    Unlimited bookings
                  </span>
                  <span className="text-sm font-light tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed flex text-[var(--muted)]">
                    Whether you manage one property or several, enjoy unlimited
                    possibilities to maximise your property’s earning potential.
                  </span>
                </div>
              </div>

              <div className="w-full h-auto flex items-center p-2">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {premiumFeaturesList &&
                    premiumFeaturesList.map((feature) => {
                      return (
                        <li
                          key={feature.id}
                          className="list-disc list-inside text-sm font-normal tracking-wider whitespace-nowrap text-[var(--muted)] pl-1"
                        >
                          <span>{feature.label}</span>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>

            {/* card section */}

            <div className=" w-full lg:w-1/3 h-auto flex justify-center items-center p-0 lg:p-2 ">
              <div className="w-full h-auto px-5 py-5 lg:px-8 lg:pt-10 border border[var(--border)] shadow-sm shadow-[var(--primary)] flex flex-col justify-center items-center space-y-3 rounded-xl ">
                <h2
                  style={{ color: "var(--text)" }}
                  className="text-2xl font-bold lg:font-semibold tracking-wider"
                >
                  Up to 8%
                </h2>

                <h3
                  style={{ color: "var(--text-muted)" }}
                  className="text-sm  font-semibold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
                >
                  of the total rent per booking
                </h3>
                <p
                  style={{ color: "var(--text-paragraph)" }}
                  className="text-sm font-light tracking-wide lg:tracking-wider leading-normal  text-center lg:leading-5"
                >
                  Our commission fee varies depending on the location of your
                  property.
                </p>
                <div className="py-0 lg:py-2 w-full">
                  <button className=" text-sm font-medium tracking-wider w-full rounded-full border-2 border-[var(--border)] bg-[var(--card)] py-3">
                    Get started
                  </button>
                </div>
                <p
                  style={{ color: "var(--text-paragraph)" }}
                  className="text-xs font-light tracking-wider leading-normal lg:leading-5 text-center"
                >
                  Commission is automatically deducted from your booking’s first
                  payout. For hassle-free renting.
                </p>
              </div>
            </div>

            {/* card section end*/}
          </div>
        </div>
      </div>
      <div className="w-full h-full  ">
        {/* <ShowcaseSection /> */}
        <ClippedTopCurveImage />
        {/* <CurveSection
          isCurveSvgPath={true}
          backgroundColor="var(--primary)"
          showTopCurve={true} // <-- Turned to true to active the top half-circle curve
          showBottomCurve={true} // Keeps the bottom curve active simultaneously
          showShadow={true}
          curveHeight="105vh"
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
        </CurveSection> */}
        <div className="flex flex-col justify-center items-center gap-5 w-full px-8 lg:px-16  ">
          {/* working flow */}

          <div className="w-full lg:w-2/3 h-auto flex flex-col justify-center items-center ">
            <SectionHeader
              tagTitle="how it work"
              headerTitle="All online. 100% secure."
            />

            <RentalStepsCards />
          </div>

          {/* working flow end*/}

          {/* bottom section */}

          <SectionHeader
            tagTitle="Get start for free"
            headerTitle="Start earning with HousingAnywhere today"
            subTitle="Create your first listing in minutes and enjoy safe, hassle-free
            renting from the comfort of your home."
          >
            <div className="flex justify-center items-center p-2">
              <button
                className=" text-sm font-medium tracking-wider px-10 py-3 rounded-full border-2 border-[var(--border)] bg-[var(--card)]"
                onClick={() => navigate("/auth/signup")}
              >
                Get started
              </button>
            </div>
          </SectionHeader>

          {/* bottom section end*/}
        </div>
      </div>
      {/* pricing end*/}
    </section>
  );
}
