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
    <div className="my-10 w-full px-10">
      {/* top SIDE */}

      <div className="w-full flex-flex-col justify-center items-center h-auto py-2">
        <h2 className=" text-center text-sm font-bold ">Our Agents</h2>

        <h3 className="text-2xl text-center font-semibold py-2 w-full">
          Here Is Our Experts.
        </h3>

        <p className="text-sm font-medium text-center w-full">
          This is very beautiful house and it's south face view and use
          materials are imported from Italy. there have 4 room, 3 wash room and
          every room have 2 window with attach balcony.
        </p>
      </div>

      {/* bottom SIDE */}
      <div className="p-5 flex flex-row justify-center items-center gap-5">
        {agents.map((agent) => (
          <SingleAgent key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
