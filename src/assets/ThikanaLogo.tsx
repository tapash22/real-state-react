type ThikanaLogoProps = {
  className?: string;
};

export default function ThikanaLogo({
  className = "",
}: ThikanaLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 450 120"
      fill="none"
      className={className}
      aria-label="Thikana"
      role="img"
    >
      <g transform="translate(10, 10)">
        <path
          d="M11 49.3L47.2 20.2c2.5-2 5.9-2 8.4 0l36.2 29.1c1.7 1.4 4.2 1.1 5.5-.6s1.1-4.2-.6-5.5L60.5 14.1c-5.3-4.3-12.9-4.3-18.2 0L6 43.2c-1.7 1.4-2 3.8-.6 5.5s3.9 2 5.6.6z"
          fill="currentColor"
        />

        <path
          d="M80 24h7v13l-7-5.6V24z"
          fill="currentColor"
        />

        <path
          d="M39 48h24v8h-8v36h-8V56h-8v-8z"
          fill="currentColor"
        />
      </g>

      <text
        x="135"
        y="74"
        fill="currentColor"
        fontFamily="Poppins, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="48px"
      >
        Thikana
      </text>
    </svg>
  );
}