import { useState } from "react";
import { RiMapPinLine } from "react-icons/ri";
import house1 from "../../assets/house1.jpg";

type AgentIcon = {
  id: number;
  title: string;
};

type Agent = {
  id: number;
  title: string;
  statuses: string;
  image: string;
  icons: AgentIcon[];
};

type SingleAgentProps = {
  agent: Agent;
};

export function SingleAgent({ agent }: SingleAgentProps) {
  const [showIcons, setShowIcons] = useState<boolean>(false);

  return (
    <div className="w-full h-full flex group">
      <div
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
        className="relative z-10 w-full overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
        <div className="relative w-full overflow-hidden aspect-[4/3] lg:aspect-[3/2] bg-black/5">
          {/* IMAGE */}
          <img
            src={agent.image || house1}
            alt={agent.title}
            className="w-full h-full object-cover object-center"

            // className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />

          {/* HOVER ACTION ICONS PANEL */}
          <div
            className={`absolute top-4 left-4 z-20 transition-all duration-300 ease-out ${
              showIcons
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none"
            }`}
          >
            <div
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
              }}
              className="border p-1.5 rounded-xl shadow-md backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
            >
              <ul className="flex flex-col gap-1 list-none p-0 m-0">
                {agent.icons.map((icon) => (
                  <li
                    key={icon.id}
                    title={icon.title}
                    style={{ backgroundColor: "rgba(20, 184, 166, 0.1)" }}
                    className="flex justify-center items-center p-2 rounded-lg transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <RiMapPinLine
                      style={{ color: "var(--button-bg)" }}
                      className="text-lg font-medium"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* METADATA OVERLAY FOOTER */}
        <div
          style={{
            borderColor: "var(--button-bg)",
          }}
          className="p-3 border-t-2 w-full transition-colors duration-300  "
        >
          <h4
            style={{ color: "var(--text-heading)" }}
            className="text-md lg:text-lg font-medium lg:font-bold tracking-wide line-clamp-1"
          >
            {agent.title}
          </h4>
          <p
            style={{ color: "var(--text-paragraph)" }}
            className="text-xs font-normal lg:font-semibold uppercase tracking-wider  opacity-80"
          >
            {agent.statuses}
          </p>
        </div>
      </div>
    </div>
  );
}
