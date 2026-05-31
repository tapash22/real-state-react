import { useState } from "react";
import { RiMapPinLine } from "react-icons/ri";
import house1 from "../../assets/house1.jpg";

// 1. Types (match your Agents structure)
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

// 2. Props type
type SingleAgentProps = {
  agent: Agent;
};

export function SingleAgent({ agent }: SingleAgentProps) {
  const [list, setList] = useState<boolean>(false);

  return (
    <div>
      <div
        className="rounded-2xl opacity-90 hover:opacity-100 overflow-hidden"
        onMouseEnter={() => setList(true)}
        onMouseLeave={() => setList(false)}
      >
        <div className="relative">
          <img
            src={agent.image || house1}
            alt={agent.title}
            className="w-full relative min-h-[300px]"
          />

          <div className="shadow-1 bg-white border-b-4 my-2 border-violet-600 p-2">
            <h2 className="text-large font-semibold">{agent.title}</h2>
            <p className="text-sm font-normal mb-2">{agent.statuses}</p>
          </div>

          {/* Hover Icons */}
          {list && (
            <div className="absolute top-1 left-1 z-50">
              <div className="flex justify-start items-start border-2 mx-auto w-full rounded-lg bg-white/90">
                <ul>
                  {agent.icons.map((icon) => (
                    <li
                      key={icon.id}
                      className="flex justify-center items-center list-none my-3 px-2"
                    >
                      <RiMapPinLine className="text-violet-900 text-2xl font-medium" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
