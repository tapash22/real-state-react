import logo from "../../logo.svg";
import { Partner } from "./Partner";

type PartnerItem = {
  id: number;
  image: string;
};

const partners: PartnerItem[] = [
  { id: 1, image: logo },
  { id: 2, image: logo },
  { id: 3, image: logo },
  { id: 4, image: logo },
  { id: 5, image: logo },
  { id: 6, image: logo },
];

export function Partners() {
  return (
    <section className="my-16 w-full px-6 md:px-10 max-w-7xl mx-auto transition-colors duration-300">
      {/* HEADER */}
      <div className="pb-8 text-center space-y-1">
        <p
          style={{ color: "var(--button-bg)" }}
          className="text-sm font-extrabold uppercase tracking-widest"
        >
          Our Partners
        </p>
        <h2
          style={{ color: "var(--text-heading)" }}
          className="text-2xl md:text-3xl font-extrabold tracking-tight"
        >
          Trusted by Industry Leaders
        </h2>
      </div>

      {/* RESPONSIVE GRID LAYOUT */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center p-2">
        {partners.map((partner) => (
          <Partner key={partner.id} image={partner.image} />
        ))}
      </div>
    </section>
  );
}
