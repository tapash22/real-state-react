import FeatureCard from "../components/card/FeatureCard";
import StatCard from "../components/card/StatCard";
import { featuresData } from "../data";

export default function LandLord() {
  return (
    <section className="my-8 lg:my-16 w-full px-8 lg:px-16 transition-colors duration-300">
      <div className="flex flex-col justify-center items-center gap-10 w-full ">
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
          <button className="uppercase text-sm font-semibold tracking-wide p-2 rounded-lg border-2 border-violet-400 bg-white">
            Get Start
          </button>
        </div>
        <div className="w-full lg:w-1/2 h-auto py-5 grid grid-cols-3 gap-3">
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
        <div
          style={{
            padding: "100px 0",
            maxWidth: "900px",
            margin: "0 auto",
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
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
    </section>
  );
}
