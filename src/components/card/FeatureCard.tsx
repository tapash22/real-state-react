import React from "react";
import { IconType } from "react-icons";

interface FeatureCardProps {
  Icon?: IconType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center border border-[var(--border)] shadow-sm shadow-[var(--primary)] rounded-lg p-5 gap-5">
      {/* Icon Wrapper Circle */}
      <div className="flex justify-center items-center w-auto h-auto p-3 rounded-full border border-[var(--border)] shadow-sm shadow-[var(--primary)] bg-[var(--card)]">
        {Icon && <Icon size={30} className="text-[var(--muted)] font-bold" />}
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col justify-start items-start space-y-2">
        <h3 className="text-lg font-bold tracking-wider text-[var(--text)] text-center lg:text-start ">
          {title}
        </h3>

        <p className="text-sm font-light tracking-wider text-[var(--muted)] leading-relaxed text-center lg:text-start">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
