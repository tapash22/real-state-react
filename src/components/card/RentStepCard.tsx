import { RentStepData } from "../../data";

interface RentStepCardProps {
  step: RentStepData;
}

export function RentStepCard({ step }: RentStepCardProps) {
  return (
    <div className="flex flex-col items-start w-full space-y-2 lg:space-y-0 rounded-xl border border-[var(--border)] shadow-md shadow-[var(--primary)]">
      {/* Step Image Container */}
      <div
        style={{ borderColor: "var(--border)" }}
        className="w-full  aspect-[2/1] lg:aspect-square overflow-hidden rounded-tl-xl rounded-tr-xl  border border-[var(--border)]"
      >
        <img
          src={step.rentStepImage}
          alt={step.imageAlt}
          className="w-full h-full object-fill lg:object-cover "
        />
      </div>

      {/* Title block with bold number prefix */}
      <div className="flex items-start h-auto lg:h-auto gap-2 p-4  rounded-bl-xl rounded-br-xl">
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
