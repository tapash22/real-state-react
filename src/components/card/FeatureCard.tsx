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
    <div
      style={{
        gap: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
      className="flex flex-col items-center border-2 border-[var(--border)] rounded-lg p-4"
    >
      {/* Icon Wrapper Circle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "40px",
          maxWidth: "40px",
          minHeight: "40px",
          maxHeight: "40px",
          borderRadius: "50%",
          backgroundColor: "#F4F7F9",
          color: "#032535",
        }}
      >
        {Icon && <Icon size={28} />}
      </div>

      {/* Content Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#032535",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: "0.975rem",
            color: "#768796",
            margin: 0,
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
