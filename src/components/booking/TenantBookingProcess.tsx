import { BOOKING_PROCESS_STEPS } from "../../data";
import { ProcessCard } from "../card/ProcessCard";
import { SectionHeader } from "../header-section/SectionHeader";

export default function TenantBookingProcess() {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
      {/* TOP HEADER TYPOGRAPHY */}

      <SectionHeader
        tagTitle="For tenants"
        headerTitle="What you’ll pay to book depends on where you’re moving to"
      />

      <div className="flex flex-col lg:max-w-7xl lg:mx-auto h-auto">
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
