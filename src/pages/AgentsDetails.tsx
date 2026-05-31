import { useParams } from "react-router-dom";
import SingleAgencies from "../components/SingleAgencies";
import { placeList } from "../data";

export default function AgentsDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();

  const place = placeList.find((p) => p.id === Number(id));

  if (!place) {
    return <div className="p-5">No data found</div>;
  }

  return (
    <section>
      <div className="container mx-auto">
        <div className="w-full flex justify-center items-center">
          <div className="w-1/2 p-2">
            <h2 className="py-2 text-sm font-bold text-center">
              Why choose us
            </h2>

            <div className="text-2xl text-center font-bold py-2 tracking-wide">
              Our Agencies
            </div>
          </div>
        </div>

        <div className="w-full py-10">
          <SingleAgencies agen={place.agencies} />
        </div>
      </div>
    </section>
  );
}
