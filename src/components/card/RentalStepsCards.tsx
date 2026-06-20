import React from "react";
import { rentalSteps } from "../../data";

// Placeholder mock preview components to match the screenshot visuals
const ListingPreview = () => (
  <div className="h-full w-full bg-gray-500/10 rounded-t-xl flex items-center justify-center text-xs text-[var(--text)]">
    [ Listing Image Carousel Placeholder ]
  </div>
);
const CalendarPreview = () => (
  <div className="h-full w-full bg-gray-500/10 rounded-t-xl flex items-center justify-center text-xs text-[var(--text)]">
    [ Calendar Picker Placeholder ]
  </div>
);
const ApplicationPreview = () => (
  <div className="h-full w-full bg-gray-500/10 rounded-t-xl flex items-center justify-center text-xs text-[var(--text)]">
    [ Tenant Profile Card Placeholder ]
  </div>
);
const PaymentPreview = () => (
  <div className="h-full w-full bg-gray-500/10 rounded-t-xl flex items-center justify-center text-xs text-[var(--text)]">
    [ Payment Timeline Tracker Placeholder ]
  </div>
);

// Map the custom components to their respective step IDs safely
const previewComponentsMap: Record<number, React.ReactNode> = {
  1: <ListingPreview />,
  2: <CalendarPreview />,
  3: <ApplicationPreview />,
  4: <PaymentPreview />,
};

export const RentalStepsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {rentalSteps.map((step) => {
        return (
          <div
            key={step.id}
            className="bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm shadow-[var(--primary)] overflow-hidden flex flex-col justify-between p-6 h-[500px]"
          >
            {/* Dynamic Top Content (Visual Previews) */}
            <div className="w-full flex-grow flex items-center justify-center overflow-hidden mb-6 border border-[var(--border)] rounded-xl">
              {previewComponentsMap[step.id] || (
                <div className="text-gray-300">No preview available</div>
              )}
            </div>

            {/* Bottom Content (Text & Step Numbering) */}
            <div className="mt-auto">
              <div className="flex items-start gap-4">
                {/* Step Badge */}
                <div className="flex items-center justify-center min-w-[40px] h-10 rounded-full border-2 border-[var(--border)]  font-semibold text-lg shadow-sm shadow-[var(--primary)]">
                  {step.id}
                </div>

                {/* Text Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[var(--text)] tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-sm font-light text-[var(--muted)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
