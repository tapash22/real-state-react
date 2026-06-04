import { FaRegHandshake } from "react-icons/fa";

type AboutItem = {
  id: number;
  title: string;
  des: string;
};

type AboutPartProps = {
  about: AboutItem;
};

export function AboutPart({ about }: AboutPartProps) {
  return (
    <div
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
      className="p-5 w-full flex flex-col sm:flex-row justify-start items-center sm:items-start gap-4 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* ICON HOUSING */}
      <div
        style={{ backgroundColor: "rgba(20, 184, 166, 0.12)" }}
        className="flex justify-center items-center p-3.5 rounded-xl shrink-0"
      >
        <FaRegHandshake
          style={{ color: "var(--button-bg)" }}
          className="text-4xl font-bold"
        />
      </div>

      {/* TEXT CONTENT */}
      <div className="space-y-1 text-center sm:text-left">
        <h4
          style={{ color: "var(--text-heading)" }}
          className="text-lg font-bold tracking-wide transition-colors duration-300"
        >
          {about.title}
        </h4>

        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm leading-relaxed text-justify sm:text-left transition-colors duration-300"
        >
          {about.des}
        </p>
      </div>
    </div>
  );
}
