import FeatureCard from "../components/card/FeatureCard";
import StatCard from "../components/card/StatCard";
import { ClippedBottomCurveImage } from "../components/show-case/ClippedBottomCurveImage";
// import { ShowcaseSection } from "../components/show-case/ShowcaseSection";
import { FaUserCircle } from "react-icons/fa";
import { RentalStepsCards } from "../components/card/RentalStepsCards";
import { ClippedTopCurveImage } from "../components/show-case/ClippedTopCurveImage";
import { featuresData, premiumFeaturesList } from "../data";

export default function LandLord() {
  return (
    <section className="my-0 w-full  transition-colors duration-300">
      <div className="w-full h-full ">
        {/* <ShowcaseSection /> */}
        <ClippedBottomCurveImage />
      </div>
      <div className="flex flex-col justify-center items-center gap-5 w-full px-8 lg:px-16 ">
        {/* header */}
        <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
          <h2
            style={{ color: "var(--button-bg)" }}
            className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
          >
            List your property for free
          </h2>

          <h3
            style={{ color: "var(--text-heading)" }}
            className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
          >
            International tenants. No viewings. Online bookings.
          </h3>
          <button className=" text-sm font-medium tracking-wider px-10 py-3 rounded-full border-2 border-[var(--border)] bg-[var(--card)]">
            Get started
          </button>
        </div>

        {/* header end*/}

        {/* StatCard */}
        <div className="w-full lg:w-1/2 h-auto py-5 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <StatCard
            targetNumber={50000}
            suffix="+"
            title="properties"
            subtitle="rented out worldwide"
          />

          <StatCard
            targetNumber={190}
            suffix="+"
            title="countries"
            subtitle="available globally"
          />

          <StatCard
            targetNumber={260}
            suffix="+"
            title="tenants"
            subtitle="find homes every month"
          />
        </div>

        {/* StatCard end*/}

        {/* feature secction */}

        <div
          className="flex flex-col justify-center items-center px-5 py-10 space-y-5 "
          style={{
            background: `
              linear-gradient(
                to right,
                color-mix(in srgb, var(--bg) 20%, transparent),
                var(--border),
                color-mix(in srgb, var(--bg) 20%, transparent)
              )
            `,
          }}
        >
          <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
            <h2
              style={{ color: "var(--button-bg)" }}
              className="text-sm font-semibold lg:font-extrabold  tracking-wider lg:tracking-widest uppercase"
            >
              Not your user Real estate
            </h2>

            <h3
              style={{ color: "var(--text-heading)" }}
              className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
            >
              Everything you need to maximise your earnings
            </h3>
            <p
              style={{ color: "var(--text-paragraph)" }}
              className="text-sm font-light lg:font-medium tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed"
            >
              High ad visibility. Qualified tenants. Stress-free renting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full lg:w-2/3 h-auto">
            {featuresData.map((feature) => (
              <FeatureCard
                key={feature.id}
                Icon={feature.Icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>

        {/* feature secction */}
      </div>

      {/* image view */}

      <div className="w-full h-full ">
        {/* <ShowcaseSection /> */}
        <ClippedTopCurveImage />
      </div>

      {/* image view end*/}
      <div className="flex flex-col justify-center items-center gap-5 w-full px-8 py-10 lg:px-16 ">
        {/* bottom end */}

        {/* pricing */}

        <div className="w-full lg:w-2/3 h-auto flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
            <h2
              style={{ color: "var(--button-bg)" }}
              className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
            >
              pricing
            </h2>

            <h3
              style={{ color: "var(--text-heading)" }}
              className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
            >
              Simple pricing. No hidden costs.
            </h3>
            <p
              style={{ color: "var(--text-paragraph)" }}
              className="text-sm font-light lg:font-medium tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed"
            >
              Everything you need to grow your rental business.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-5 w-full  h-auto p-3  ">
            <div className="w-full h-auto p-2 space-y-3 lg:w-2/3">
              <h3
                style={{ color: "var(--text-heading)" }}
                className="text-xl font-semibold lg:text-2xl lg:font-bold  tracking-wide lg:tracking-wider lg:whitespace-nowrap text-[var(--text)]"
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
                  {
                    premiumFeaturesList &&
                      premiumFeaturesList.map((feature) => {
                        return (
                          <li
                            key={feature.id}
                            className="list-disc list-inside text-sm font-normal tracking-wider whitespace-nowrap text-[var(--muted)] pl-1"
                          >
                            <span>{feature.label}</span>
                          </li>
                        );
                      }) // Fixed: Removed the breaking () execution brackets from here
                  }
                </ul>
              </div>
            </div>

            {/* card section */}

            <div className=" w-full lg:w-1/3 h-auto flex justify-center items-center p-2 ">
              <div className="w-full h-auto px-8 py-10  border border[var(--border)] flex flex-col justify-center items-center space-y-3 rounded-xl ">
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
                <div className="py-2 w-full">
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

        {/* pricing end*/}

        {/* working flow */}

        <div className="w-full lg:w-2/3 h-auto flex flex-col justify-center items-center space-y-5">
          <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
            <h2
              style={{ color: "var(--button-bg)" }}
              className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
            >
              how it work
            </h2>

            <h3
              style={{ color: "var(--text-heading)" }}
              className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
            >
              All online. 100% secure.
            </h3>
          </div>

          <RentalStepsCards />
        </div>

        {/* working flow end*/}

        {/* bottom section */}
        <div className="w-full flex flex-col justify-center items-center text-center space-y-5 lg:max-w-6xl lg:mx-auto my-5 ">
          <h2
            style={{ color: "var(--button-bg)" }}
            className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
          >
            Get start for free
          </h2>

          <h3
            style={{ color: "var(--text-heading)" }}
            className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
          >
            Start earning with HousingAnywhere today
          </h3>
          <p
            style={{ color: "var(--text-paragraph)" }}
            className="text-sm font-light lg:font-medium tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed"
          >
            Create your first listing in minutes and enjoy safe, hassle-free
            renting from the comfort of your home.
          </p>
          <button className=" text-sm font-medium tracking-wider px-10 py-3 rounded-full border-2 border-[var(--border)] bg-[var(--card)]">
            Get started
          </button>
        </div>

        {/* bottom section end*/}
      </div>
    </section>
  );
}
