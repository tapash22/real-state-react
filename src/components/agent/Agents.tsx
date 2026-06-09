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
    {
      id: 4,
      title: "Nadia Rahman 2",
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
    <section className="my-5 lg:my-16 w-full px-8 lg:px-16 transition-colors duration-300">
      {/* TOP SIDE / HEADER */}
      <div className="w-full flex flex-col justify-center items-center text-center space-y-2 lg:space-y-5 lg:max-w-6xl ">
        <h2
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-semibold lg:font-extrabold uppercase tracking-wider lg:tracking-widest"
        >
          Our Agents
        </h2>

        <h3
          style={{ color: "var(--text-heading)" }}
          className="text-lg md:text-3xl font-semibold lg:font-extrabold tracking-wide lg:tracking-wider lg:whitespace-nowrap"
        >
          Meet Our Experts
        </h3>

        <p
          style={{ color: "var(--text-paragraph)" }}
          className="text-sm font-light lg:font-medium tracking-wide lg:tracking-wider leading-normal lg:leading-relaxed"
        >
          Our certified experts are dedicated to guiding you through your
          property journey with unmatched market intelligence, transparent
          terms, and complete support.
        </p>
      </div>

      {/* BOTTOM SIDE / RESPONSIVE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8 justify-center items-stretch">
        {agents.map((agent) => (
          <SingleAgent key={agent.id} agent={agent} />
        ))}
      </div>
    </section>
  );
}
