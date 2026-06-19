import FeatureCard from "../components/card/FeatureCard";
import StatCard from "../components/card/StatCard";
import { ClippedBottomCurveImage } from "../components/show-case/ClippedBottomCurveImage";
// import { ShowcaseSection } from "../components/show-case/ShowcaseSection";
import { ClippedTopCurveImage } from "../components/show-case/ClippedTopCurveImage";
import { featuresData } from "../data";

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-2/3">
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
      <div className="flex flex-col justify-center items-center gap-5 w-full px-8 lg:px-16 py-5 ">
        {/* bottom end */}

        {/* pricing */}
        <div className="w-full lg:w-1/2 h-auto flex flex-col justify-center items-center">
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
        </div>

        {/* pricing end*/}

        {/* working flow */}

        <div className="w-full lg:w-1/2 h-auto flex flex-col justify-center items-center">
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
        </div>

        {/* working flow end*/}

        <div className="w-full flex flex-col justify-center items-center text-center space-y-5 lg:max-w-6xl lg:mx-auto ">
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

        {/* bottom end */}
      </div>
    </section>
  );
}
