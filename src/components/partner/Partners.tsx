import logo from "../../logo.svg";
import { Partner } from "./Partner";

type PartnerItem = {
  id: number;
  image: string;
};

// ✅ Move outside component (prevents re-creation on re-render)
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
    <section>
      <div className="container mx-auto my-10">
        {/* Header */}
        <div className="py-4 mx-auto text-center">
          <p className="text-sm font-normal text-violet-600">Our Partners</p>
          <h2 className="text-2xl font-bold py-2 text-black">
            Reliable Partners
          </h2>
        </div>

        {/* Grid */}
        <div className="py-2 mx-auto grid grid-cols-3 lg:grid-cols-6 gap-2">
          {partners.map((partner) => (
            <Partner key={partner.id} image={partner.image} />
          ))}
        </div>
      </div>
    </section>
  );
}
