import { landlordFaqs, RENTAL_STEPS_DATA } from "../../data";
import { FaqAccordion } from "../accordion/FaqAccordion";
import { RentStepCard } from "../card/RentStepCard";
import { SectionHeader } from "../header-section/SectionHeader";

export function LandlordRentProcess() {
  return (
    <div className="flex flex-col justify-center items-center space-y-3 w-full h-full">
      {/* TOP HEADER TYPOGRAPHY */}
      <SectionHeader
        tagTitle="LIST YOUR PROPERTIES FOR FREE"
        headerTitle="Rent out your properties in 3 easy steps"
        subTitle="Find your ideal tenant and get your property booked in a matter of
          days. Renting out on HousingAnywhere is quick, easy and safe. Start
          generating revenue now!"
      />
      <div className="flex flex-col justify-center items-center w-full lg:max-w-7xl lg:mx-auto h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
          {RENTAL_STEPS_DATA.map((step) => (
            <RentStepCard key={step.id} step={step} />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center items-start lg:max-w-7xl lg:mx-auto h-auto w-full">
        <FaqAccordion
          heading="Frequently Asked Questions"
          items={landlordFaqs}
        />
      </div>
    </div>
  );
}
