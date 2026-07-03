import { BOOKING_PROCESS_STEPS } from "../../data";
import { ProcessCard } from "../card/ProcessCard";

export default function TenantBookingProcess() {
  return (
    <div className="flex flex-col space-y-5 w-full h-full">
      {/* TOP HEADER TYPOGRAPHY */}
      <div className="w-full flex flex-col justify-center items-center text-center space-y-3 lg:max-w-6xl lg:mx-auto ">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
        >
          For tenants
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          What you’ll pay to book depends on where you’re moving to
        </h3>
      </div>
      <div className="flex flex-col">
        {BOOKING_PROCESS_STEPS.map((step, index) => (
          <ProcessCard
            key={step.id}
            step={step}
            isLast={index === BOOKING_PROCESS_STEPS.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
