import { landlordFaqs, RENTAL_STEPS_DATA } from "../../data";
import { FaqAccordion } from "../accordion/FaqAccordion";
import { RentStepCard } from "../card/RentStepCard";

export function LandlordRentProcess() {
  return (
    <div className="flex flex-col space-y-5 w-full h-full">
      {/* TOP HEADER TYPOGRAPHY */}
      <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
        >
          LIST YOUR PROPERTIES FOR FREE
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          Rent out your properties in 3 easy steps
        </h3>

        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm font-light lg:font-medium tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed"
        >
          Find your ideal tenant and get your property booked in a matter of
          days. Renting out on HousingAnywhere is quick, easy and safe. Start
          generating revenue now!
        </p>
      </div>

      <div className="flex flex-col justify-center items-center lg:max-w-7xl lg:mx-auto h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          {RENTAL_STEPS_DATA.map((step) => (
            <RentStepCard key={step.id} step={step} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-start  lg:max-w-7xl lg:mx-auto h-auto w-full">
        <FaqAccordion
          heading="Frequently Asked Questions"
          items={landlordFaqs}
        />
      </div>
    </div>
  );
}
