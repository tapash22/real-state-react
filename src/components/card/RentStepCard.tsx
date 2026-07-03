import { RentStepData } from "../../data";

interface RentStepCardProps {
  step: RentStepData;
}

export function RentStepCard({ step }: RentStepCardProps) {
  return (
    <div className="flex flex-col items-start w-full">
      {/* Step Image Container */}
      <div className="w-full aspect-video flex items-center justify-center mb-6 overflow-hidden  rounded-lg">
        {step.rentStepImage && (
          <img
            src={step.rentStepImage}
            alt={step.imageAlt}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Title block with bold number prefix */}
      <div className="flex items-baseline spece-x-2">
        <span className="text-2xl font-bold text-[var(--muted)] leading-none">
          {step.id}.
        </span>
        <h3 className="text-sm font-bold text-[var(--text)] tracking-wide">
          {step.title}
        </h3>
      </div>

      {/* Description Copy */}
      <p className="text-xs leading-relaxed text-[var(--muted)] font-light">
        {step.description}
      </p>
    </div>
  );
}
