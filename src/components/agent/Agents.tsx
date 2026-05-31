import house1 from "../../assets/house1.jpg";
import { SingleAgent } from "./SingleAgent";

// 1. Type for icons
type AgentIcon = {
  id: number;
  title: string;
};

// 2. Type for agent
type Agent = {
  id: number;
  title: string;
  statuses: string;
  image: string;
  icons: AgentIcon[];
};

// 3. Props (currently unused but kept for scalability)
type AgentsProps = {
  // add later if needed
};

export function Agents(_props: AgentsProps) {
  const agents: Agent[] = [
    {
      id: 1,
      title: "Tapsh paul",
      statuses: "status",
      image: house1,
      icons: [
        { id: 1, title: "jjj" },
        { id: 2, title: "jjj" },
        { id: 3, title: "jjj" },
      ],
    },
    {
      id: 2,
      title: "Tapsh paul",
      statuses: "status",
      image: house1,
      icons: [
        { id: 1, title: "jjj" },
        { id: 2, title: "jjj" },
        { id: 3, title: "jjj" },
      ],
    },
    {
      id: 3,
      title: "Tapsh paul",
      statuses: "status",
      image: house1,
      icons: [
        { id: 1, title: "jjj" },
        { id: 2, title: "jjj" },
        { id: 3, title: "jjj" },
      ],
    },
  ];

  return (
    <section>
      <div className="container mx-auto my-10 flex flex-col lg:flex-row gap-x-2">
        {/* LEFT SIDE */}
        <div className="py-2 mx-auto w-full lg:w-1/4">
          <p className="text-sm font-normal text-start text-violet-600">
            Our Agents
          </p>

          <h2 className="text-start text-2xl font-bold py-2 text-black">
            Here Is Our Experts.
          </h2>

          <div className="flex justify-start">
            <p className="text-justify w-[250px]">
              This is very beautiful house and it's south face view and use
              materials are imported from Italy. there have 4 room, 3 wash room
              and every room have 2 window with attach balcony.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="py-2 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 w-full lg:w-3/4">
          {agents.map((agent) => (
            <SingleAgent key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </section>
  );
}
