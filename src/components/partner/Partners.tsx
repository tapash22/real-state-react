import logo from "../../logo.svg";
import { SectionHeader } from "../header-section/SectionHeader";
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
    <section className="w-full px-6 md:px-10 max-w-7xl mx-auto transition-colors duration-300">
      {/* HEADER */}
      <SectionHeader
        tagTitle="Our Partners"
        headerTitle="Trusted by Industry Leaders"
      />

      {/* RESPONSIVE GRID LAYOUT */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center p-2">
        {partners.map((partner) => (
          <Partner key={partner.id} image={partner.image} />
        ))}
      </div>
    </section>
  );
}
