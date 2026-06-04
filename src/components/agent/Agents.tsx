import house1 from "../../assets/house1.jpg";
import { SingleAgent } from "./SingleAgent";

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

type AgentsProps = {
  // add later if needed
};

export function Agents(_props: AgentsProps) {
  const agents: Agent[] = [
    {
      id: 1,
      title: "Tapash Paul",
      statuses: "Senior Property Consultant",
      image: house1,
      icons: [
        { id: 1, title: "Location" },
        { id: 2, title: "Contact" },
        { id: 3, title: "Verified" },
      ],
    },
    {
      id: 2,
      title: "Syed Alamin",
      statuses: "Real Estate Broker",
      image: house1,
      icons: [
        { id: 1, title: "Location" },
        { id: 2, title: "Contact" },
        { id: 3, title: "Verified" },
      ],
    },
    {
      id: 3,
      title: "Nadia Rahman",
      statuses: "Leasing Specialist",
      image: house1,
      icons: [
        { id: 1, title: "Location" },
        { id: 2, title: "Contact" },
        { id: 3, title: "Verified" },
      ],
    },
  ];

  return (
    <section className="my-16 w-full px-6 md:px-10 max-w-7xl mx-auto transition-colors duration-300">
      {/* TOP SIDE / HEADER */}
      <div className="w-full flex flex-col justify-center items-center text-center space-y-3 max-w-3xl mx-auto mb-10">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-extrabold uppercase tracking-widest"
        >
          Our Agents
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-2xl md:text-3xl font-extrabold tracking-tight w-full"
        >
          Meet Our Experts
        </h3>

        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm font-medium leading-relaxed w-full"
        >
          Our certified experts are dedicated to guiding you through your
          property journey with unmatched market intelligence, transparent
          terms, and complete support.
        </p>
      </div>

      {/* BOTTOM SIDE / RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch">
        {agents.map((agent) => (
          <SingleAgent key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}
