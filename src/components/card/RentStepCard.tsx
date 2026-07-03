import { RentStepData } from "../../data";

interface RentStepCardProps {
  step: RentStepData;
}

export function RentStepCard({ step }: RentStepCardProps) {
  return (
    <div className="flex flex-col items-start w-full space-y-2 lg:space-y-5 rounded-lg">
      {/* Step Image Container */}
      <div
        style={{ borderColor: "var(--border)" }}
        className="w-full  aspect-[3/2] lg:aspect-square overflow-hidden rounded-lg border bg-white/30"
      >
        <img
          src={step.rentStepImage}
          alt={step.imageAlt}
          className="w-full h-full object-fill lg:object-contain"
        />
      </div>

      {/* Title block with bold number prefix */}
      <div className="flex items-start h-auto lg:h-auto gap-2">
        <span className="text-2xl font-bold text-[var(--muted)] leading-none">
          {step.id}.
        </span>
        <div className="flex flex-col justify-start items-start space-y-1">
          <h3 className="text-lg font-semibold text-[var(--text)] tracking-wide">
            {step.title}
          </h3>
          {/* Description Copy */}
          <p className="text-sm leading-relaxed text-[var(--muted)] font-light text-wrap tracking-wide">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
}
